"use client";

// Added: rain-on-water canvas with 3D pulse ripples and frequency amplification toggle.
// Fixed: turning amplification ON no longer bursts drops — clears in-flight rain, caps at 8, ramps 1→8.
// Added: pulse ring size scales with droplet radius (larger drops → larger ripples).
// Added: Encoded Acceleration link on the left when Frequency Amplification is ON.
// Recurring bug: canvas must size to its container (not window) so surfaceY aligns with the air mask on the amplification page layout.

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const MAX_ACTIVE_DROPS_OFF = 20;
const MAX_ACTIVE_DROPS_ON = 8;
const AMP_RAMP_STEP_MS = 450;
const TENSION = 0.008;
const DAMPENING = 0.01;
const SPREAD = 0.25;
const RESOLUTION = 4;
const PULSE_SIZE_PER_DROPLET_RADIUS = 32;
const RIPPLE_BASE_RADIUS_FACTOR = 20;
const RIPPLE_EXPAND_FACTOR = 40;

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
    ctx.closePath();
  }
}

type Ripple = {
  id: number;
  x: number;
  startTime: number;
  radius: number;
};

function pulseSizeFromDropletRadius(dropletRadius: number, amplified = false) {
  const size = dropletRadius * PULSE_SIZE_PER_DROPLET_RADIUS;
  return amplified ? size * 1.35 : size;
}

function rippleVisualRadius(ripple: Ripple, now: number) {
  const progress = (now - ripple.startTime) / 2000;
  const base = ripple.radius * RIPPLE_BASE_RADIUS_FACTOR;
  const expand = ripple.radius * RIPPLE_EXPAND_FACTOR;
  return base + progress * expand;
}

export function FrequencyAmplificationAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pulseContainerRef = useRef<HTMLDivElement>(null);

  const [isAmplificationOn, setIsAmplificationOn] = useState(false);

  const isAmplificationOnRef = useRef(false);
  const amplificationStartTimeRef = useRef<number | null>(null);
  const clearCollisionsRef = useRef<(() => void) | null>(null);
  const resetDropletsRef = useRef<(() => void) | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const rainTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const spawnPulse = useCallback(
    (x: number, y: number, isBlue: boolean, dropletRadius: number) => {
      const container = pulseContainerRef.current;
      if (!container) return;

      const pulseSize = pulseSizeFromDropletRadius(dropletRadius, isBlue);
      const glowSize = Math.round(dropletRadius * (isBlue ? 8 : 5));

      const box = document.createElement("div");
      box.className = isBlue ? "freq-amp-pulse-box freq-amp-blue-pulse" : "freq-amp-pulse-box";
      box.style.left = `${x}px`;
      box.style.top = `${y}px`;
      box.style.width = `${pulseSize}px`;
      box.style.height = `${pulseSize}px`;
      box.style.setProperty("--pulse-glow", `${glowSize}px`);

      for (const pulseClass of ["freq-amp-pulse-one", "freq-amp-pulse-two", "freq-amp-pulse-three"]) {
        const pulse = document.createElement("div");
        pulse.className = `freq-amp-pulse ${pulseClass}`;
        box.appendChild(pulse);
      }

      container.appendChild(box);

      setTimeout(() => {
        box.remove();
      }, 3500);
    },
    [],
  );

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
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let surfaceY = 0;
    let springs: Spring[] = [];
    let droplets: Droplet[] = [];
    let startTime = Date.now();
    let activeRipples: Ripple[] = [];
    const collidedPairs = new Set<string>();
    clearCollisionsRef.current = () => collidedPairs.clear();
    resetDropletsRef.current = () => {
      droplets = [];
      activeRipples = [];
      collidedPairs.clear();
    };
    let rippleIdCounter = 0;
    let disposed = false;

    const init = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      surfaceY = height / 2;

      const numSprings = Math.ceil(width / RESOLUTION) + 1;
      springs = Array.from({ length: numSprings }, (_, i) => new Spring(i * RESOLUTION, surfaceY));
    };

    const checkRippleCollisions = () => {
      const now = Date.now();

      activeRipples = activeRipples.filter((r) => now - r.startTime < 2000);

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
            spawnPulse(midX, surfaceY, true, combinedRadius);

            const index = Math.floor(midX / RESOLUTION);
            if (index >= 0 && index < springs.length) {
              springs[index].velocity = -12;
            }
          }
        }
      }
    };

    const updateWaterWaves = () => {
      for (const spring of springs) {
        spring.update();
      }

      const leftDeltas = new Array(springs.length).fill(0);
      const rightDeltas = new Array(springs.length).fill(0);

      for (let pass = 0; pass < 8; pass++) {
        for (let i = 0; i < springs.length; i++) {
          if (i > 0) {
            leftDeltas[i] = SPREAD * (springs[i].y - springs[i - 1].y);
            springs[i - 1].velocity += leftDeltas[i];
          }
          if (i < springs.length - 1) {
            rightDeltas[i] = SPREAD * (springs[i].y - springs[i + 1].y);
            springs[i + 1].velocity += rightDeltas[i];
          }
        }
        for (let i = 0; i < springs.length; i++) {
          if (i > 0) springs[i - 1].y += leftDeltas[i];
          if (i < springs.length - 1) springs[i + 1].y += rightDeltas[i];
        }
      }
    };

    const drawWaterLayer = (
      offsetX: number,
      waveScale: number,
      opacity: number,
      isFront: boolean,
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, height);

      const firstY = surfaceY + (springs[0].y - surfaceY) * waveScale;
      ctx.lineTo(0, firstY);

      for (const spring of springs) {
        const x = spring.x + offsetX;
        const y = surfaceY + (spring.y - surfaceY) * waveScale;
        ctx.lineTo(x, y);
      }

      const lastY = surfaceY + (springs[springs.length - 1].y - surfaceY) * waveScale;
      ctx.lineTo(width, lastY);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);

      const gradient = ctx.createLinearGradient(0, surfaceY - 50, 0, height);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.0)");

      ctx.fillStyle = gradient;
      ctx.fill();

      if (isFront) {
        ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
        ctx.shadowBlur = 10;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      ctx.closePath();
    };

    const drawWater = () => {
      drawWaterLayer(-60, 0.4, 0.02, false);
      drawWaterLayer(40, 0.7, 0.04, false);
      drawWaterLayer(0, 1.0, 0.06, true);
    };

    const animate = () => {
      if (disposed) return;

      ctx.clearRect(0, 0, width, height);

      updateWaterWaves();
      drawWater();
      checkRippleCollisions();

      for (let i = droplets.length - 1; i >= 0; i--) {
        const ripple = droplets[i].update(surfaceY, springs);
        if (ripple) {
          activeRipples.push({ ...ripple, id: rippleIdCounter++ });
          spawnPulse(ripple.x, surfaceY, false, ripple.radius);
        }
        droplets[i].draw(ctx);
        if (!droplets[i].active) {
          droplets.splice(i, 1);
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
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
        const desiredDrops = Math.floor(1 + 5 * intensity);
        const dropsToSpawn = Math.min(desiredDrops, availableSlots);
        for (let i = 0; i < dropsToSpawn; i++) {
          droplets.push(new Droplet(width, surfaceY));
        }
      }

      const slowDelay = 800;
      const fastDelay = 100;
      const baseDelay = slowDelay - (slowDelay - fastDelay) * intensity;
      const randomDelay = baseDelay + Math.random() * (150 * (1 - intensity + 0.1));

      rainTimeoutRef.current = setTimeout(rainLoop, randomDelay);
    };

    const handleResize = () => {
      init();
    };

    init();
    startTime = Date.now();
    animate();
    rainLoop();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rainTimeoutRef.current !== null) {
        clearTimeout(rainTimeoutRef.current);
      }
      clearCollisionsRef.current = null;
      resetDropletsRef.current = null;
      if (pulseContainerRef.current) {
        pulseContainerRef.current.innerHTML = "";
      }
    };
  }, [spawnPulse]);

  const toggleAmplification = () => {
    setIsAmplificationOn((prev) => !prev);
  };

  return (
    <div ref={containerRef} className="freq-amp-scene">
      <div ref={pulseContainerRef} className="freq-amp-pulse-container" aria-hidden="true" />
      <div className="freq-amp-air-mask" aria-hidden="true" />
      <canvas ref={canvasRef} className="freq-amp-canvas" aria-hidden="true" />
      {isAmplificationOn ? (
        <Link href="/encoded-acceleration" className="freq-amp-btn freq-amp-btn-left">
          Encoded Acceleration
        </Link>
      ) : null}
      <button
        type="button"
        id="ampBtn"
        className={`freq-amp-btn freq-amp-btn-right${isAmplificationOn ? " on" : ""}`}
        onClick={toggleAmplification}
      >
        {isAmplificationOn ? "Frequency Amplification ON" : "Frequency Amplification OFF"}
      </button>
    </div>
  );
}
