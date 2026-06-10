"use client";

// Added: white see-through 3D figure with OrbitControls on the encoded acceleration page.
// Fixed: figure was invisible — canvas did not fill the container, glass material needed thickness + env map.
// Fixed: swapped placeholder GLB for Maya woman body OBJ export from public/obj file/.
// Fixed: reduced Maya body scale to 50% of previous size (target height 0.9m).
// Fixed: increased glass transparency; reverted arm vertex repose to keep Maya's original pose.
// Added: slightly larger blue see-through body shell wrapped around the white inner body.
// Added: split animation — white physical body moves left, blue mental body moves right with labels.
// Fixed: body labels were hidden under the WebGL canvas — labels now live in a dedicated overlay layer.
// Fixed: framerate drop — shared glass materials and render-on-demand (kept separate meshes for sharp normals).
// Fixed: blurry figure after mesh merge — restored full pixel ratio and per-part geometry.
// Fixed: containerRef runtime error — canvas mount now uses canvasHostRef in JSX and effect.
// Added: 1s body split with 3D dust rivers flowing surface-to-surface between physical and mental bodies.
// Fixed: energy looked like disconnected light lines — particles now emit from body shells toward each other.
// Fixed: bidirectional flow — white dust physical→mental, blue dust mental→physical on separate offset paths.
// Fixed: energy stream floated beside blue body — particles now anchor to both shells via bridge-facing ellipsoid hits.
// Fixed: infinity (∞) loop paths between bodies so white and blue dust flow opposite ways and read from any orbit angle.
// Fixed: ∞ now touches blue/white fronts on a direct bridge line with lemniscate bulge faded at both body contacts.
// Fixed: energy floated left of blue body — foot anchors now raycast onto both avatar meshes each frame in world space.
// Fixed: animation lag — merged raycast proxies, 2 foot raycasts/frame, cached bounds, lighter particle count.
// Fixed: asymmetric flow — mirrored ∞ paths, matched speeds/sizes, symmetric foot spread from shared midpoint.
// Fixed: models vanish on Chrome zoom — tighter near plane, orbit limits, log depth buffer, viewport resize.
// Added: MEASURE button fades in center-bottom after energy flow; glass styling, scrolls to content on click.
// Fixed: MEASURE button click blocked by disabled attr; scroll handled in parent via window.scrollTo.
// Fixed: MEASURE button reveal no longer depends on dust system — shows after body split completes.
// Recurring bug: renderer must size to its container (not window) so the scene fits the amplification layout.
// Recurring bug: duplicating the full OBJ with per-mesh transmission materials tanks GPU performance.

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const MODEL_URL = "/obj file/obj file.obj";
const BLUE_AURA_SCALE = 1.07;
const SPLIT_DISTANCE = 0.55;
const HOLD_BEFORE_SPLIT_MS = 1200;
const SPLIT_DURATION_MS = 1000;
const DUST_PER_RIVER = 140;
const FLOW_SPEED = 0.42;
const FLOW_PARTICLE_SIZE = 0.02;
const FLOW_OPACITY = 0.8;
const INFINITY_LOOP_SCALE = 0.28;
const FOOT_SPREAD = 0.045;
const FOOT_BAND = 0.08;
const RAYCAST_PADDING = 0.65;
const MEASURE_REVEAL_DELAY_MS = 700;
const MEASURE_REVEAL_DURATION_MS = 900;

type FootAnchorScratch = {
  physicalBounds: THREE.Box3;
  mentalBounds: THREE.Box3;
  bridge: THREE.Vector3;
  perp: THREE.Vector3;
  vertical: THREE.Vector3;
  up: THREE.Vector3;
  basePhysicalFoot: THREE.Vector3;
  baseMentalFoot: THREE.Vector3;
  physicalFoot: THREE.Vector3;
  mentalFoot: THREE.Vector3;
  start: THREE.Vector3;
  end: THREE.Vector3;
  position: THREE.Vector3;
  rayOrigin: THREE.Vector3;
  intoMesh: THREE.Vector3;
  footBridge: THREE.Vector3;
  center: THREE.Vector3;
  midFoot: THREE.Vector3;
  halfBridge: THREE.Vector3;
};

type DustRiverSystem = {
  group: THREE.Group;
  rivers: DustRiver[];
  raycaster: THREE.Raycaster;
  physicalProxy: THREE.Mesh;
  mentalProxy: THREE.Mesh;
  physicalLocalBounds: THREE.Box3;
  mentalLocalBounds: THREE.Box3;
  scratch: FootAnchorScratch;
};

type DustParticle = {
  spreadAngle: number;
  spreadRadius: number;
  progress: number;
  speed: number;
};

type DustRiver = {
  fromPhysical: boolean;
  particles: DustParticle[];
  points: THREE.Points;
  material: THREE.PointsMaterial;
};

type EncodedAccelerationAnimationProps = {
  onMeasureClick?: () => void;
};

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function buildRaycastProxy(root: THREE.Object3D): THREE.Mesh | null {
  const geometries: THREE.BufferGeometry[] = [];

  root.traverse((child) => {
    if (child instanceof THREE.Mesh && !child.userData.isRaycastProxy) {
      const geometry = child.geometry.clone();
      geometry.applyMatrix4(child.matrix);
      geometries.push(geometry);
    }
  });

  if (geometries.length === 0) {
    return null;
  }

  const merged = mergeGeometries(geometries, false);
  if (!merged) {
    return null;
  }

  const proxy = new THREE.Mesh(merged);
  proxy.visible = false;
  proxy.userData.isRaycastProxy = true;
  root.add(proxy);
  return proxy;
}

function createFootScratch(): FootAnchorScratch {
  return {
    physicalBounds: new THREE.Box3(),
    mentalBounds: new THREE.Box3(),
    bridge: new THREE.Vector3(),
    perp: new THREE.Vector3(),
    vertical: new THREE.Vector3(),
    up: new THREE.Vector3(0, 1, 0),
    basePhysicalFoot: new THREE.Vector3(),
    baseMentalFoot: new THREE.Vector3(),
    physicalFoot: new THREE.Vector3(),
    mentalFoot: new THREE.Vector3(),
    start: new THREE.Vector3(),
    end: new THREE.Vector3(),
    position: new THREE.Vector3(),
    rayOrigin: new THREE.Vector3(),
    intoMesh: new THREE.Vector3(),
    footBridge: new THREE.Vector3(),
    center: new THREE.Vector3(),
    midFoot: new THREE.Vector3(),
    halfBridge: new THREE.Vector3(),
  };
}

function getBridgeFrame(bridge: THREE.Vector3, perp: THREE.Vector3, vertical: THREE.Vector3) {
  const up = new THREE.Vector3(0, 1, 0);
  perp.crossVectors(bridge, up);
  if (perp.lengthSq() < 1e-4) {
    perp.crossVectors(bridge, new THREE.Vector3(1, 0, 0));
  }
  perp.normalize();
  vertical.crossVectors(bridge, perp).normalize();
}

function raycastMeshSurface(
  raycaster: THREE.Raycaster,
  mesh: THREE.Mesh,
  origin: THREE.Vector3,
  direction: THREE.Vector3,
  target: THREE.Vector3,
) {
  raycaster.set(origin, direction);
  const hits = raycaster.intersectObject(mesh, false);
  if (hits.length > 0) {
    target.copy(hits[0].point);
    return true;
  }
  return false;
}

function getFootSurfacePoint(
  raycaster: THREE.Raycaster,
  mesh: THREE.Mesh,
  bounds: THREE.Box3,
  bridge: THREE.Vector3,
  perp: THREE.Vector3,
  up: THREE.Vector3,
  center: THREE.Vector3,
  towardMental: boolean,
  spreadAngle: number,
  spreadRadius: number,
  rayOrigin: THREE.Vector3,
  intoMesh: THREE.Vector3,
  surfacePoint: THREE.Vector3,
) {
  const bodyHeight = bounds.max.y - bounds.min.y;
  const footY = bounds.min.y + bodyHeight * FOOT_BAND;
  bounds.getCenter(center);
  const innerInset = Math.min(bounds.max.x - bounds.min.x, bounds.max.z - bounds.min.z) * 0.22;

  rayOrigin
    .copy(center)
    .addScaledVector(bridge, towardMental ? innerInset : -innerInset)
    .addScaledVector(perp, Math.cos(spreadAngle) * spreadRadius)
    .addScaledVector(up, Math.sin(spreadAngle) * spreadRadius * 0.35)
    .setY(footY);

  intoMesh.copy(bridge);
  if (!towardMental) {
    intoMesh.multiplyScalar(-1);
  }
  intoMesh.normalize();

  rayOrigin.addScaledVector(intoMesh, -RAYCAST_PADDING);

  if (raycastMeshSurface(raycaster, mesh, rayOrigin, intoMesh, surfacePoint)) {
    return;
  }

  surfacePoint.copy(rayOrigin).addScaledVector(intoMesh, RAYCAST_PADDING * 0.85);
}

function spreadSymmetricFeet(
  basePhysicalFoot: THREE.Vector3,
  baseMentalFoot: THREE.Vector3,
  perp: THREE.Vector3,
  up: THREE.Vector3,
  spreadAngle: number,
  spreadRadius: number,
  midFoot: THREE.Vector3,
  halfBridge: THREE.Vector3,
  physicalFoot: THREE.Vector3,
  mentalFoot: THREE.Vector3,
) {
  midFoot.lerpVectors(basePhysicalFoot, baseMentalFoot, 0.5);
  halfBridge.subVectors(baseMentalFoot, basePhysicalFoot).multiplyScalar(0.5);

  const spreadX = Math.cos(spreadAngle) * spreadRadius;
  const spreadY = Math.sin(spreadAngle) * spreadRadius * 0.35;

  physicalFoot
    .copy(midFoot)
    .sub(halfBridge)
    .addScaledVector(perp, spreadX)
    .addScaledVector(up, spreadY);
  mentalFoot
    .copy(midFoot)
    .add(halfBridge)
    .addScaledVector(perp, spreadX)
    .addScaledVector(up, spreadY);
}

function sampleSymmetricInfinity(
  physicalFoot: THREE.Vector3,
  mentalFoot: THREE.Vector3,
  perp: THREE.Vector3,
  vertical: THREE.Vector3,
  progress: number,
  fromPhysical: boolean,
  target: THREE.Vector3,
) {
  const start = fromPhysical ? physicalFoot : mentalFoot;
  const end = fromPhysical ? mentalFoot : physicalFoot;

  target.lerpVectors(start, end, progress);

  const touchFade = Math.sin(Math.PI * progress);
  if (touchFade <= 0) {
    return target;
  }

  const halfSpan = start.distanceTo(end) * 0.5;
  const loopScale = halfSpan * INFINITY_LOOP_SCALE * touchFade;
  const u = progress * Math.PI;
  const loopPhase = fromPhysical ? u : Math.PI - u;
  const sinU = Math.sin(loopPhase);
  const cosU = Math.cos(loopPhase);
  const denom = 1 + sinU * sinU;

  target.addScaledVector(vertical, (loopScale * sinU * cosU) / denom);
  target.addScaledVector(perp, (loopScale * 0.12 * Math.sin(2 * loopPhase)) / denom);
  return target;
}

function computeFootAnchors(
  system: DustRiverSystem,
  physicalGroup: THREE.Group,
  mentalGroup: THREE.Group,
) {
  const s = system.scratch;

  physicalGroup.updateWorldMatrix(true, true);
  mentalGroup.updateWorldMatrix(true, true);

  s.physicalBounds.copy(system.physicalLocalBounds).applyMatrix4(physicalGroup.matrixWorld);
  s.mentalBounds.copy(system.mentalLocalBounds).applyMatrix4(mentalGroup.matrixWorld);

  s.physicalBounds.getCenter(s.center);
  const mentalCenterX = (s.mentalBounds.min.x + s.mentalBounds.max.x) * 0.5;
  const mentalCenterY = (s.mentalBounds.min.y + s.mentalBounds.max.y) * 0.5;
  const mentalCenterZ = (s.mentalBounds.min.z + s.mentalBounds.max.z) * 0.5;

  s.bridge.set(mentalCenterX - s.center.x, mentalCenterY - s.center.y, mentalCenterZ - s.center.z);
  const bridgeLength = Math.max(s.bridge.length(), 0.001);
  s.bridge.divideScalar(bridgeLength);

  getBridgeFrame(s.bridge, s.perp, s.vertical);

  getFootSurfacePoint(
    system.raycaster,
    system.physicalProxy,
    s.physicalBounds,
    s.bridge,
    s.perp,
    s.up,
    s.center,
    true,
    0,
    0,
    s.rayOrigin,
    s.intoMesh,
    s.basePhysicalFoot,
  );
  getFootSurfacePoint(
    system.raycaster,
    system.mentalProxy,
    s.mentalBounds,
    s.bridge,
    s.perp,
    s.up,
    s.center,
    false,
    0,
    0,
    s.rayOrigin,
    s.intoMesh,
    s.baseMentalFoot,
  );

  s.midFoot.lerpVectors(s.basePhysicalFoot, s.baseMentalFoot, 0.5);
}

function createDustRiver(
  fromPhysical: boolean,
  color: number,
  particleSize: number,
  baseSpeed: number,
  materials: THREE.Material[],
): DustRiver {
  const particles: DustParticle[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < DUST_PER_RIVER; i += 1) {
    particles.push({
      spreadAngle: i * goldenAngle,
      spreadRadius: FOOT_SPREAD * Math.sqrt((i + 0.5) / DUST_PER_RIVER),
      progress: Math.random(),
      speed: FLOW_SPEED * (0.9 + Math.random() * 0.25),
    });
  }

  const material = new THREE.PointsMaterial({
    color,
    size: particleSize,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });
  materials.push(material);

  const points = new THREE.Points(
    new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(DUST_PER_RIVER * 3), 3),
    ),
    material,
  );

  return { fromPhysical, particles, points, material };
}

function createDustRiverSystem(
  physicalGroup: THREE.Group,
  mentalGroup: THREE.Group,
  physicalBody: THREE.Object3D,
  mentalBody: THREE.Object3D,
  materials: THREE.Material[],
): DustRiverSystem | null {
  const physicalProxy = buildRaycastProxy(physicalGroup);
  const mentalProxy = buildRaycastProxy(mentalGroup);
  if (!physicalProxy || !mentalProxy) {
    return null;
  }

  const physicalLocalBounds = new THREE.Box3().setFromObject(physicalBody);
  const mentalLocalBounds = new THREE.Box3().setFromObject(mentalBody);
  const group = new THREE.Group();
  const rivers = [
    createDustRiver(true, 0xffffff, FLOW_PARTICLE_SIZE, FLOW_SPEED, materials),
    createDustRiver(false, 0x6ec2ff, FLOW_PARTICLE_SIZE, FLOW_SPEED, materials),
  ];

  for (const river of rivers) {
    group.add(river.points);
  }

  const raycaster = new THREE.Raycaster();

  return {
    group,
    rivers,
    raycaster,
    physicalProxy,
    mentalProxy,
    physicalLocalBounds,
    mentalLocalBounds,
    scratch: createFootScratch(),
  };
}

function updateDustRivers(
  system: DustRiverSystem,
  physicalGroup: THREE.Group,
  mentalGroup: THREE.Group,
  intensity: number,
) {
  computeFootAnchors(system, physicalGroup, mentalGroup);
  const s = system.scratch;

  for (const river of system.rivers) {
    const positions = river.points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const coords = positions.array as Float32Array;

    for (let i = 0; i < river.particles.length; i += 1) {
      const particle = river.particles[i];
      particle.progress += particle.speed * 0.007;
      if (particle.progress > 1) {
        particle.progress = 0;
      }

      spreadSymmetricFeet(
        s.basePhysicalFoot,
        s.baseMentalFoot,
        s.perp,
        s.up,
        particle.spreadAngle,
        particle.spreadRadius,
        s.midFoot,
        s.halfBridge,
        s.physicalFoot,
        s.mentalFoot,
      );

      sampleSymmetricInfinity(
        s.physicalFoot,
        s.mentalFoot,
        s.perp,
        s.vertical,
        particle.progress,
        river.fromPhysical,
        s.position,
      );

      const index = i * 3;
      coords[index] = s.position.x;
      coords[index + 1] = s.position.y;
      coords[index + 2] = s.position.z;
    }

    positions.needsUpdate = true;
    river.material.opacity = FLOW_OPACITY * intensity;
  }
}

function createGlassMaterial(color: number, envMap: THREE.Texture) {
  return new THREE.MeshPhysicalMaterial({
    color,
    transmission: 0.98,
    thickness: 0.35,
    opacity: 0.5,
    metalness: 0.02,
    roughness: 0.05,
    ior: 1.45,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    envMap,
    envMapIntensity: 0.9,
  });
}

function applySharedGlassMaterial(root: THREE.Object3D, material: THREE.MeshPhysicalMaterial) {
  root.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = material;
      child.frustumCulled = false;
    }
  });
}

function buildSeparatedBodies(
  model: THREE.Object3D,
  envMap: THREE.Texture,
  materials: THREE.Material[],
) {
  const whiteMaterial = createGlassMaterial(0xffffff, envMap);
  const blueMaterial = createGlassMaterial(0x3d8bfd, envMap);
  blueMaterial.opacity = 0;
  materials.push(whiteMaterial, blueMaterial);

  const physicalBody = model;
  applySharedGlassMaterial(physicalBody, whiteMaterial);

  const mentalBody = model.clone(true);
  applySharedGlassMaterial(mentalBody, blueMaterial);

  const bounds = new THREE.Box3().setFromObject(physicalBody);
  const bodyCenterY = (bounds.min.y + bounds.max.y) / 2;

  const physicalGroup = new THREE.Group();
  physicalGroup.add(physicalBody);

  const mentalGroup = new THREE.Group();
  mentalGroup.position.set(0, bodyCenterY, 0);
  mentalGroup.scale.setScalar(BLUE_AURA_SCALE);
  mentalBody.position.set(0, -bodyCenterY, 0);
  mentalGroup.add(mentalBody);

  const figureGroup = new THREE.Group();
  figureGroup.add(physicalGroup);
  figureGroup.add(mentalGroup);

  return { figureGroup, physicalGroup, mentalGroup, physicalBody, mentalBody, blueMaterial, bodyCenterY };
}

function fitModelToScene(
  model: THREE.Group,
  controls: OrbitControls,
  camera: THREE.PerspectiveCamera,
) {
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());

  model.position.sub(center);
  model.position.y += size.y / 2;

  const targetHeight = 0.9;
  const scale = targetHeight / Math.max(size.y, 0.001);
  model.scale.setScalar(scale);

  const focusY = (size.y * scale) / 2;
  controls.target.set(0, focusY, 0);
  camera.position.set(0, focusY, 3.2);
  camera.near = 0.001;
  camera.far = 100;
  camera.updateProjectionMatrix();
  controls.minDistance = 0.85;
  controls.maxDistance = 14;
  controls.update();
}

function revealMeasureButton(
  button: HTMLButtonElement | null,
  readyRef: { current: boolean },
  progress = 1,
) {
  if (!button) {
    return;
  }

  readyRef.current = progress >= 0.95;
  button.style.opacity = String(progress);
  button.style.pointerEvents = readyRef.current ? "auto" : "none";
  button.setAttribute("aria-disabled", readyRef.current ? "false" : "true");
  button.classList.toggle("encoded-accel-hero-btn-ready", readyRef.current);
}

export function EncodedAccelerationAnimation({ onMeasureClick }: EncodedAccelerationAnimationProps = {}) {
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const labelsOverlayRef = useRef<HTMLDivElement>(null);
  const measureButtonRef = useRef<HTMLButtonElement>(null);
  const measureButtonReadyRef = useRef(false);
  const onMeasureClickRef = useRef(onMeasureClick);
  onMeasureClickRef.current = onMeasureClick;

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => {
      revealMeasureButton(measureButtonRef.current, measureButtonReadyRef);
    }, 4500);

    return () => window.clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    const container = canvasHostRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.001, 100);
    camera.position.set(0, 1, 3.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
      logarithmicDepthBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.domElement.className = "encoded-accel-canvas";
    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = environment;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.set(0, 1, 0);
    controls.minDistance = 0.85;
    controls.maxDistance = 14;

    let renderScene = true;
    let isUserInteracting = false;
    const requestRender = () => {
      renderScene = true;
    };
    controls.addEventListener("change", requestRender);
    const handleControlStart = () => {
      isUserInteracting = true;
      requestRender();
    };
    const handleControlEnd = () => {
      isUserInteracting = false;
      requestRender();
    };
    controls.addEventListener("start", handleControlStart);
    controls.addEventListener("end", handleControlEnd);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1.5);
    backLight.position.set(-5, 5, -5);
    scene.add(backLight);

    const disposedMaterials: THREE.Material[] = [];

    const loader = new OBJLoader();
    let loadedModel: THREE.Group | null = null;
    let physicalGroup: THREE.Group | null = null;
    let mentalGroup: THREE.Group | null = null;
    let blueMaterial: THREE.MeshPhysicalMaterial | null = null;
    let dustSystem: DustRiverSystem | null = null;
    let bodyCenterY = 0.45;
    let splitStartTime = 0;
    let splitFinished = false;
    let energyActive = false;
    let energyIntensity = 0;
    let measureRevealStart = 0;
    let measureRevealProgress = 0;
    const cameraStartZ = 3.2;
    const cameraSplitZ = 4.4;

    loader.load(
      encodeURI(MODEL_URL),
      (model) => {
        fitModelToScene(model, controls, camera);
        const built = buildSeparatedBodies(model, environment, disposedMaterials);
        physicalGroup = built.physicalGroup;
        mentalGroup = built.mentalGroup;
        blueMaterial = built.blueMaterial;
        bodyCenterY = built.bodyCenterY;
        splitStartTime = performance.now() + HOLD_BEFORE_SPLIT_MS;

        dustSystem = createDustRiverSystem(
          built.physicalGroup,
          built.mentalGroup,
          built.physicalBody,
          built.mentalBody,
          disposedMaterials,
        );

        scene.add(built.figureGroup);
        if (dustSystem) {
          scene.add(dustSystem.group);
        }

        loadedModel = built.figureGroup;
        requestRender();
      },
      undefined,
      (error) => {
        console.error("Error loading Maya model:", error);
      },
    );

    let animationFrameId = 0;

    const getEffectivePixelRatio = () => Math.min(window.devicePixelRatio, 1.5);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(getEffectivePixelRatio());
      renderer.setSize(width, height, false);
      requestRender();
    };

    const handleWindowResize = () => {
      resize();
    };
    window.addEventListener("resize", handleWindowResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleWindowResize);
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        requestRender();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      let animatingSplit = false;
      let splitProgress = splitFinished ? 1 : 0;

      if (physicalGroup && mentalGroup && splitStartTime > 0 && !splitFinished) {
        const elapsed = performance.now() - splitStartTime;
        splitProgress = elapsed <= 0 ? 0 : easeOutCubic(Math.min(1, elapsed / SPLIT_DURATION_MS));

        physicalGroup.position.x = -SPLIT_DISTANCE * splitProgress;
        mentalGroup.position.x = SPLIT_DISTANCE * splitProgress;

        if (blueMaterial) {
          blueMaterial.opacity = 0.5 * splitProgress;
        }

        camera.position.z = cameraStartZ + (cameraSplitZ - cameraStartZ) * splitProgress;

        const labelOpacity = splitProgress <= 0 ? 0 : Math.min(1, splitProgress * 1.4);
        if (labelsOverlayRef.current) {
          labelsOverlayRef.current.style.opacity = String(labelOpacity);
        }

        animatingSplit = splitProgress < 1;
        if (!animatingSplit) {
          splitFinished = true;
          controls.enableDamping = false;
        }

        renderScene = true;
      }

      if (splitProgress > 0.05) {
        energyActive = true;
        energyIntensity = Math.min(1, splitProgress * 1.2);
      }

      if (energyActive && physicalGroup && mentalGroup && dustSystem) {
        updateDustRivers(dustSystem, physicalGroup, mentalGroup, energyIntensity);
        renderScene = true;
      }

      if (splitFinished) {
        if (measureRevealStart === 0) {
          measureRevealStart = performance.now() + MEASURE_REVEAL_DELAY_MS;
        }

        const revealElapsed = performance.now() - measureRevealStart;
        if (revealElapsed > 0) {
          measureRevealProgress = easeOutCubic(Math.min(1, revealElapsed / MEASURE_REVEAL_DURATION_MS));
          renderScene = true;
        }
      }

      revealMeasureButton(
        measureButtonRef.current,
        measureButtonReadyRef,
        measureRevealProgress,
      );

      if (controls.enableDamping) {
        controls.update();
      }

      const shouldRender =
        renderScene || animatingSplit || isUserInteracting || energyActive || measureRevealProgress > 0;

      if (shouldRender && document.visibilityState === "visible") {
        renderer.render(scene, camera);
        if (!animatingSplit && !isUserInteracting && !energyActive) {
          renderScene = false;
        }
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    requestAnimationFrame(resize);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleWindowResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleWindowResize);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      controls.removeEventListener("change", requestRender);
      controls.removeEventListener("start", handleControlStart);
      controls.removeEventListener("end", handleControlEnd);
      resizeObserver.disconnect();
      controls.dispose();
      pmremGenerator.dispose();
      environment.dispose();

      const disposedGeometries = new Set<THREE.BufferGeometry>();
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && !disposedGeometries.has(child.geometry)) {
          disposedGeometries.add(child.geometry);
          child.geometry.dispose();
        }
      });

      for (const material of disposedMaterials) {
        material.dispose();
      }

      renderer.dispose();

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }

      if (loadedModel) {
        scene.remove(loadedModel);
      }

      if (dustSystem) {
        scene.remove(dustSystem.group);
        for (const river of dustSystem.rivers) {
          river.points.geometry.dispose();
        }
      }
    };
  }, []);

  return (
    <div className="encoded-accel-scene" aria-label="Encoded Acceleration 3D figure">
      <div ref={canvasHostRef} className="encoded-accel-canvas-host" />
      <div ref={labelsOverlayRef} className="encoded-accel-labels" style={{ opacity: 0 }}>
        <span className="encoded-accel-label encoded-accel-label-left">Physical body</span>
        <span className="encoded-accel-label encoded-accel-label-right">Mental body</span>
      </div>
      <button
        ref={measureButtonRef}
        type="button"
        className="encoded-accel-hero-btn encoded-accel-hero-btn-measure encoded-accel-measure-btn"
        style={{ opacity: 0, pointerEvents: "none" }}
        aria-disabled="true"
        onClick={(event) => {
          event.stopPropagation();
          if (!measureButtonReadyRef.current) {
            return;
          }
          onMeasureClickRef.current?.();
        }}
      >
        Measure
      </button>
    </div>
  );
}
