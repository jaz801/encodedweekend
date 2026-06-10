"use client";

// Added: rain-on-water canvas with 3D pulse ripples and frequency amplification toggle.
// Fixed: turning amplification ON no longer bursts drops — clears in-flight rain, caps at 8, ramps 1→8.
// Added: pulse ring size scales with droplet radius (larger drops → larger ripples).
// Added: Encoded Acceleration link on the left when Frequency Amplification is ON.
// Recurring bug: canvas must size to its container (not window) so surfaceY aligns with the air mask on the amplification page layout.
// Recurring bug: pulse z-index — water+pulses canvas must sit below air mask (z-2); rain canvas above mask (z-3).
// Fixed: mobile overlap — controls stack vertically; shorter toggle labels below 640px.
// Fixed: laggy animations — moved ripples from DOM/CSS to canvas, capped DPR, fewer spring passes, cached gradients, pause when tab hidden.

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const MAX_ACTIVE_DROPS_OFF = 14;
const MAX_ACTIVE_DROPS_ON = 8;
const MAX_VISUAL_PULSES = 28;
const AMP_RAMP_STEP_MS = 450;
const TENSION = 0.008;
const DAMPENING = 0.01;
const SPREAD = 0.25;
const RESOLUTION = 6;
const SPRING_PASSES = 5;
const MAX_DPR = 1.25;
const PULSE_SIZE_PER_DROPLET_RADIUS = 32;
const RIPPLE_BASE_RADIUS_FACTOR = 20;
const RIPPLE_EXPAND_FACTOR = 40;
const PULSE_RING_DELAYS_MS = [0, 600, 1200];
const PULSE_DURATION_MS = 2000;

class Spring {
  x: number;
  y: number;
  targetY: number;
  velocity: number;

  constructor(x: number, targetY: number) {
    this.x = x;
    this.y = targetY;
    this.targetY = targetY;
    this.velocity = 0;
  }

  update() {
    const displacement = this.targetY - this.y;
    this.velocity += TENSION * displacement - DAMPENING * this.velocity;
    this.y += this.velocity;
  }
}

class Droplet {
  radius: number;
  x: number;
  y: number;
  velocity: number;
  gravity: number;
  active: boolean;

  constructor(width: number, surfaceY: number) {
    this.radius = Math.random() * 3 + 4;
    this.x = Math.random() * (width - 40) + 20;
    this.y = surfaceY - 150 - Math.random() * 150;
    this.velocity = 1;
    this.gravity = 0.03 + Math.random() * 0.015;
    this.active = true;
  }

  update(surfaceY: number, springs: Spring[]) {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y + this.radius >= surfaceY && this.active) {
      this.active = false;

      const index = Math.floor(this.x / RESOLUTION);
      if (index >= 0 && index < springs.length) {
        springs[index].velocity = -2 * this.radius;
      }

      return { x: this.x, startTime: Date.now(), radius: this.radius };
    }

    return null;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.active) return;
    const stretch = 1 + this.velocity * 0.05;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radius * 0.8, this.radius * stretch, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.fill();
  }
}

type Ripple = {
  id: number;
  x: number;
  startTime: number;
  radius: number;
};

type VisualPulse = {
  x: number;
  startTime: number;
  radius: number;
  isBlue: boolean;
};

function pulseSizeFromDropletRadius(dropletRadius: number, amplified = false) {
  const size = dropletRadius * PULSE_SIZE_PER_DROPLET_RADIUS;
  return amplified ? size * 1.35 : size;
}

function rippleVisualRadius(ripple: Ripple, now: number) {
  const progress = (now - ripple.startTime) / PULSE_DURATION_MS;
  const base = ripple.radius * RIPPLE_BASE_RADIUS_FACTOR;
  const expand = ripple.radius * RIPPLE_EXPAND_FACTOR;
  return base + progress * expand;
}

function drawCanvasPulseRing(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dropletRadius: number,
  isBlue: boolean,
  elapsed: number,
) {
  if (elapsed < 0 || elapsed > PULSE_DURATION_MS) return;

  const progress = elapsed / PULSE_DURATION_MS;
  const opacity = 1 - progress;
  const base = pulseSizeFromDropletRadius(dropletRadius, isBlue);
  const radius = (base / 2) * (1 + progress * 2);

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(1, 0.71);

  const [r, g, b] = isBlue ? [0, 150, 255] : [255, 255, 255];

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.75})`;
  ctx.lineWidth = 1.25 + dropletRadius * 0.08;
  ctx.stroke();

  if (opacity > 0.25) {
    const glowRadius = radius * 0.55;
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity * 0.12})`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

export function FrequencyAmplificationAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const waterCanvasRef = useRef<HTMLCanvasElement>(null);
  const skyCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isAmplificationOn, setIsAmplificationOn] = useState(false);
  const [isCompactControls, setIsCompactControls] = useState(false);

  const isAmplificationOnRef = useRef(false);
  const amplificationStartTimeRef = useRef<number | null>(null);
  const clearCollisionsRef = useRef<(() => void) | null>(null);
  const resetDropletsRef = useRef<(() => void) | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const rainTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const updateCompact = () => setIsCompactControls(media.matches);
    updateCompact();
    media.addEventListener("change", updateCompact);
    return () => media.removeEventListener("change", updateCompact);
  }, []);

  useEffect(() => {
    isAmplificationOnRef.current = isAmplificationOn;
    if (isAmplificationOn) {
      amplificationStartTimeRef.current = Date.now();
      resetDropletsRef.current?.();
    } else {
      amplificationStartTimeRef.current = null;
      clearCollisionsRef.current?.();
    }
  }, [isAmplificationOn]);

  useEffect(() => {
    const container = containerRef.current;
    const waterCanvas = waterCanvasRef.current;
    const skyCanvas = skyCanvasRef.current;
    if (!container || !waterCanvas || !skyCanvas) return;

    const waterCtx = waterCanvas.getContext("2d", { alpha: true });
    const skyCtx = skyCanvas.getContext("2d", { alpha: true });
    if (!waterCtx || !skyCtx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let surfaceY = 0;
    let dpr = 1;
    let springs: Spring[] = [];
    let droplets: Droplet[] = [];
    let startTime = Date.now();
    let activeRipples: Ripple[] = [];
    let visualPulses: VisualPulse[] = [];
    let leftDeltas: number[] = [];
    let rightDeltas: number[] = [];
    let gradBack: CanvasGradient | null = null;
    let gradMid: CanvasGradient | null = null;
    let gradFront: CanvasGradient | null = null;
    const collidedPairs = new Set<string>();
    clearCollisionsRef.current = () => collidedPairs.clear();
    resetDropletsRef.current = () => {
      droplets = [];
      activeRipples = [];
      visualPulses = [];
      collidedPairs.clear();
    };
    let rippleIdCounter = 0;
    let frameCount = 0;
    let disposed = false;
    let isVisible = document.visibilityState === "visible";

    const queueVisualPulse = (x: number, isBlue: boolean, dropletRadius: number) => {
      if (reducedMotion) return;
      if (visualPulses.length >= MAX_VISUAL_PULSES) {
        visualPulses.shift();
      }
      visualPulses.push({ x, startTime: Date.now(), radius: dropletRadius, isBlue });
    };

    const sizeCanvas = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rebuildGradients = () => {
      gradBack = waterCtx.createLinearGradient(0, surfaceY - 50, 0, height);
      gradBack.addColorStop(0, "rgba(255, 255, 255, 0.02)");
      gradBack.addColorStop(1, "rgba(255, 255, 255, 0)");

      gradMid = waterCtx.createLinearGradient(0, surfaceY - 50, 0, height);
      gradMid.addColorStop(0, "rgba(255, 255, 255, 0.04)");
      gradMid.addColorStop(1, "rgba(255, 255, 255, 0)");

      gradFront = waterCtx.createLinearGradient(0, surfaceY - 50, 0, height);
      gradFront.addColorStop(0, "rgba(255, 255, 255, 0.06)");
      gradFront.addColorStop(1, "rgba(255, 255, 255, 0)");
    };

    const init = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      surfaceY = height / 2;

      sizeCanvas(waterCanvas, waterCtx);
      sizeCanvas(skyCanvas, skyCtx);

      const numSprings = Math.ceil(width / RESOLUTION) + 1;
      springs = Array.from({ length: numSprings }, (_, i) => new Spring(i * RESOLUTION, surfaceY));
      leftDeltas = new Array(numSprings).fill(0);
      rightDeltas = new Array(numSprings).fill(0);
      rebuildGradients();
    };

    const checkRippleCollisions = (now: number) => {
      activeRipples = activeRipples.filter((r) => now - r.startTime < PULSE_DURATION_MS);

      if (activeRipples.length === 0) {
        collidedPairs.clear();
      }

      if (!isAmplificationOnRef.current) return;

      for (let i = 0; i < activeRipples.length; i++) {
        for (let j = i + 1; j < activeRipples.length; j++) {
          const r1 = activeRipples[i];
          const r2 = activeRipples[j];

          const pairId = r1.id < r2.id ? `${r1.id}-${r2.id}` : `${r2.id}-${r1.id}`;

          if (collidedPairs.has(pairId)) continue;

          const distance = Math.abs(r1.x - r2.x);
          const radius1 = rippleVisualRadius(r1, now);
          const radius2 = rippleVisualRadius(r2, now);

          if (radius1 + radius2 >= distance) {
            collidedPairs.add(pairId);

            const midX = (r1.x + r2.x) / 2;
            const combinedRadius = (r1.radius + r2.radius) / 2;
            queueVisualPulse(midX, true, combinedRadius);

            const index = Math.floor(midX / RESOLUTION);
            if (index >= 0 && index < springs.length) {
              springs[index].velocity = -12;
            }
          }
        }
      }
    };

    const updateWaterWaves = () => {
      const springCount = springs.length;
      for (let i = 0; i < springCount; i++) {
        springs[i].update();
      }

      leftDeltas.fill(0);
      rightDeltas.fill(0);

      for (let pass = 0; pass < SPRING_PASSES; pass++) {
        for (let i = 0; i < springCount; i++) {
          if (i > 0) {
            leftDeltas[i] = SPREAD * (springs[i].y - springs[i - 1].y);
            springs[i - 1].velocity += leftDeltas[i];
          }
          if (i < springCount - 1) {
            rightDeltas[i] = SPREAD * (springs[i].y - springs[i + 1].y);
            springs[i + 1].velocity += rightDeltas[i];
          }
        }
        for (let i = 0; i < springCount; i++) {
          if (i > 0) springs[i - 1].y += leftDeltas[i];
          if (i < springCount - 1) springs[i + 1].y += rightDeltas[i];
        }
      }
    };

    const drawWaterLayer = (
      offsetX: number,
      waveScale: number,
      gradient: CanvasGradient | null,
      strokeFront = false,
    ) => {
      if (!gradient) return;

      waterCtx.beginPath();
      waterCtx.moveTo(0, height);

      const firstY = surfaceY + (springs[0].y - surfaceY) * waveScale;
      waterCtx.lineTo(0, firstY);

      for (let i = 0; i < springs.length; i++) {
        const spring = springs[i];
        const x = spring.x + offsetX;
        const y = surfaceY + (spring.y - surfaceY) * waveScale;
        waterCtx.lineTo(x, y);
      }

      const lastSpring = springs[springs.length - 1];
      const lastY = surfaceY + (lastSpring.y - surfaceY) * waveScale;
      waterCtx.lineTo(width, lastY);
      waterCtx.lineTo(width, height);
      waterCtx.closePath();

      waterCtx.fillStyle = gradient;
      waterCtx.fill();

      if (strokeFront) {
        waterCtx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        waterCtx.lineWidth = 1.5;
        waterCtx.stroke();
      }
    };

    const drawWater = () => {
      drawWaterLayer(-60, 0.4, gradBack);
      drawWaterLayer(40, 0.7, gradMid);
      drawWaterLayer(0, 1.0, gradFront, true);
    };

    const drawVisualPulses = (now: number) => {
      visualPulses = visualPulses.filter((pulse) => now - pulse.startTime < 3200);

      waterCtx.save();
      waterCtx.beginPath();
      waterCtx.rect(0, surfaceY, width, height - surfaceY);
      waterCtx.clip();

      for (const pulse of visualPulses) {
        for (const delay of PULSE_RING_DELAYS_MS) {
          drawCanvasPulseRing(
            waterCtx,
            pulse.x,
            surfaceY,
            pulse.radius,
            pulse.isBlue,
            now - pulse.startTime - delay,
          );
        }
      }

      waterCtx.restore();
    };

    const animate = () => {
      if (disposed) return;

      animationFrameRef.current = requestAnimationFrame(animate);

      if (!isVisible) return;

      const now = Date.now();
      frameCount += 1;

      waterCtx.clearRect(0, 0, width, height);
      skyCtx.clearRect(0, 0, width, height);

      updateWaterWaves();
      drawWater();

      if (frameCount % 2 === 0) {
        checkRippleCollisions(now);
      }

      drawVisualPulses(now);

      for (let i = droplets.length - 1; i >= 0; i--) {
        const ripple = droplets[i].update(surfaceY, springs);
        if (ripple) {
          activeRipples.push({ ...ripple, id: rippleIdCounter++ });
          queueVisualPulse(ripple.x, false, ripple.radius);
        }
        droplets[i].draw(skyCtx);
        if (!droplets[i].active) {
          droplets.splice(i, 1);
        }
      }
    };

    const rainLoop = () => {
      if (disposed) return;

      if (isAmplificationOnRef.current) {
        const ampStart = amplificationStartTimeRef.current ?? Date.now();
        const ampElapsed = Date.now() - ampStart;
        const maxDrops = Math.min(
          MAX_ACTIVE_DROPS_ON,
          Math.floor(ampElapsed / AMP_RAMP_STEP_MS) + 1,
        );
        const availableSlots = maxDrops - droplets.length;

        if (availableSlots > 0) {
          droplets.push(new Droplet(width, surfaceY));
        }

        rainTimeoutRef.current = setTimeout(rainLoop, 220 + Math.random() * 120);
        return;
      }

      const elapsed = Date.now() - startTime;
      const intensity = Math.min(elapsed / 3000, 1);
      const availableSlots = MAX_ACTIVE_DROPS_OFF - droplets.length;

      if (availableSlots > 0) {
        const desiredDrops = Math.floor(1 + 4 * intensity);
        const dropsToSpawn = Math.min(desiredDrops, availableSlots);
        for (let i = 0; i < dropsToSpawn; i++) {
          droplets.push(new Droplet(width, surfaceY));
        }
      }

      const slowDelay = 800;
      const fastDelay = 120;
      const baseDelay = slowDelay - (slowDelay - fastDelay) * intensity;
      const randomDelay = baseDelay + Math.random() * (150 * (1 - intensity + 0.1));

      rainTimeoutRef.current = setTimeout(rainLoop, randomDelay);
    };

    const handleResize = () => {
      init();
    };

    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };

    init();
    startTime = Date.now();
    animate();
    rainLoop();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rainTimeoutRef.current !== null) {
        clearTimeout(rainTimeoutRef.current);
      }
      clearCollisionsRef.current = null;
      resetDropletsRef.current = null;
    };
  }, []);

  const toggleAmplification = () => {
    setIsAmplificationOn((prev) => !prev);
  };

  return (
    <div ref={containerRef} className="freq-amp-scene">
      <canvas
        ref={waterCanvasRef}
        className="freq-amp-canvas freq-amp-canvas-water"
        aria-hidden="true"
      />
      <div className="freq-amp-air-mask" aria-hidden="true" />
      <canvas ref={skyCanvasRef} className="freq-amp-canvas freq-amp-canvas-sky" aria-hidden="true" />
      <div
        className={`freq-amp-controls${isAmplificationOn ? " freq-amp-controls-dual" : ""}`}
      >
        {isAmplificationOn ? (
          <Link href="/encoded-acceleration" className="freq-amp-btn freq-amp-btn-link">
            {isCompactControls ? "Acceleration" : "Encoded Acceleration"}
          </Link>
        ) : null}
        <button
          type="button"
          id="ampBtn"
          className={`freq-amp-btn freq-amp-btn-toggle${isAmplificationOn ? " on" : ""}`}
          onClick={toggleAmplification}
        >
          {isAmplificationOn
            ? isCompactControls
              ? "Amplification ON"
              : "Frequency Amplification ON"
            : isCompactControls
              ? "Amplification OFF"
              : "Frequency Amplification OFF"}
        </button>
      </div>
    </div>
  );
}
