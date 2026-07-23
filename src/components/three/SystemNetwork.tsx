import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';
import { SystemNetworkFallback } from './SystemNetworkFallback';

/* ─── Tunables ─────────────────────────────────────────────────── */
const NODE_COUNT    = 18;          // fewer nodes — more spacious
const SPREAD_X      = 20;          // how wide nodes scatter (world units)
const SPREAD_Y      = 13;          // how tall
const SPREAD_Z      = 3;           // slight depth variation
const CENTER_VOID   = 3.8;         // exclusion radius around origin
const MAX_DISTANCE  = 6;           // max edge length (kept large for sparse edges)
const MAX_EDGES_PER_NODE = 2;      // limit connections per node → sparse graph
const PULSE_COUNT   = 3;           // travelling signal dots
const DRIFT_SPEED   = 0.06;        // gentle idle drift multiplier
const PULSE_SPEED   = 0.0007;      // how fast signals travel

/* ─── Deterministic PRNG ────────────────────────────────────────── */
function makePRNG(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/* ─── Scene ─────────────────────────────────────────────────────── */
function Scene() {
  const { mouse, camera } = useThree();
  const nodesRef  = useRef<THREE.InstancedMesh>(null);
  const edgesRef  = useRef<THREE.LineSegments>(null);
  const pulsesRef = useRef<THREE.Mesh[]>([]);
  const reducedMotion = useReducedMotion();

  /* Generate node positions — reject anything inside the center void */
  const { positions, basePositions, edges } = useMemo(() => {
    const rng = makePRNG(42);
    const pts: THREE.Vector3[] = [];

    let attempts = 0;
    while (pts.length < NODE_COUNT && attempts < 2000) {
      attempts++;
      const x = (rng() - 0.5) * SPREAD_X;
      const y = (rng() - 0.5) * SPREAD_Y;
      const z = (rng() - 0.5) * SPREAD_Z;

      // Skip nodes too close to origin (center void)
      if (Math.sqrt(x * x + y * y) < CENTER_VOID) continue;
      pts.push(new THREE.Vector3(x, y, z));
    }

    const pos = new Float32Array(pts.length * 3);
    const base = new Float32Array(pts.length * 3);
    pts.forEach((p, i) => {
      pos[i * 3]     = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;
      base[i * 3]     = p.x;
      base[i * 3 + 1] = p.y;
      base[i * 3 + 2] = p.z;
    });

    /* Build sparse edge list: each node connects to at most MAX_EDGES_PER_NODE
       nearest neighbours that are within MAX_DISTANCE */
    const edg: number[] = [];
    const connected = new Set<string>();
    for (let i = 0; i < pts.length; i++) {
      // Gather neighbours sorted by distance
      const neighbours: { j: number; d: number }[] = [];
      for (let j = 0; j < pts.length; j++) {
        if (j === i) continue;
        const d = pts[i].distanceTo(pts[j]);
        if (d < MAX_DISTANCE) neighbours.push({ j, d });
      }
      neighbours.sort((a, b) => a.d - b.d);

      let count = 0;
      for (const { j } of neighbours) {
        if (count >= MAX_EDGES_PER_NODE) break;
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!connected.has(key)) {
          connected.add(key);
          edg.push(i, j);
          count++;
        }
      }
    }

    return { positions: pos, basePositions: base, edges: edg };
  }, []);

  /* Edges geometry — updated in useFrame as nodes drift */
  const edgesGeometry = useMemo(() => {
    const pts: number[] = [];
    for (let k = 0; k < edges.length; k++) {
      const idx = edges[k];
      pts.push(positions[idx * 3], positions[idx * 3 + 1], positions[idx * 3 + 2]);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return geo;
  }, [positions, edges]);

  useEffect(() => () => { edgesGeometry.dispose(); }, [edgesGeometry]);

  /* Place instanced nodes */
  useEffect(() => {
    if (!nodesRef.current) return;
    const dummy = new THREE.Object3D();
    const rng = makePRNG(99);
    const n = positions.length / 3;
    for (let i = 0; i < n; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.scale.setScalar(rng() * 0.5 + 0.6);
      dummy.updateMatrix();
      nodesRef.current.setMatrixAt(i, dummy.matrix);
    }
    nodesRef.current.instanceMatrix.needsUpdate = true;
  }, [positions]);

  /* Pulse state */
  const pulseData = useRef<{ edgeIdx: number; progress: number }[]>([]);
  useEffect(() => {
    const rng = makePRNG(7);
    const total = edges.length / 2;
    for (let i = 0; i < PULSE_COUNT; i++) {
      pulseData.current.push({
        edgeIdx: Math.floor(rng() * total),
        progress: rng(),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edges.length]);

  /* Per-node drift phase offsets */
  const driftPhases = useMemo(() => {
    const rng = makePRNG(55);
    const n = positions.length / 3;
    return Array.from({ length: n }, () => ({
      px: rng() * Math.PI * 2,
      py: rng() * Math.PI * 2,
      fx: 0.3 + rng() * 0.3,  // frequency (slow)
      fy: 0.2 + rng() * 0.3,
      ax: 0.12 + rng() * 0.1, // amplitude
      ay: 0.08 + rng() * 0.1,
    }));
  }, [positions.length]);

  const mouseOffset = useRef(new THREE.Vector2(0, 0));
  const isTouchDevice = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: none) and (pointer: coarse)').matches
  );
  const clockRef = useRef(0);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    clockRef.current += delta;
    const t = clockRef.current;

    /* Subtle camera parallax on mouse */
    if (!isTouchDevice.current) {
      mouseOffset.current.lerp(mouse, 0.02);
      camera.position.x = mouseOffset.current.x * 0.4;
      camera.position.y = mouseOffset.current.y * 0.3;
      camera.lookAt(0, 0, 0);
    }

    const n = positions.length / 3;

    /* Drift nodes */
    if (nodesRef.current) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < n; i++) {
        const d = driftPhases[i];
        const nx = basePositions[i * 3]     + Math.sin(t * d.fx * DRIFT_SPEED * 10 + d.px) * d.ax;
        const ny = basePositions[i * 3 + 1] + Math.cos(t * d.fy * DRIFT_SPEED * 10 + d.py) * d.ay;
        const nz = basePositions[i * 3 + 2];
        positions[i * 3]     = nx;
        positions[i * 3 + 1] = ny;
        positions[i * 3 + 2] = nz;
        dummy.position.set(nx, ny, nz);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        nodesRef.current.setMatrixAt(i, dummy.matrix);
      }
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }

    /* Update edge geometry to follow drifting nodes */
    if (edgesRef.current) {
      const posAttr = edgesRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
      for (let k = 0; k < edges.length; k++) {
        const idx = edges[k];
        posAttr.setXYZ(k, positions[idx * 3], positions[idx * 3 + 1], positions[idx * 3 + 2]);
      }
      posAttr.needsUpdate = true;
    }

    /* Animate travelling pulses */
    const totalEdges = edges.length / 2;
    pulseData.current.forEach((data, i) => {
      data.progress += PULSE_SPEED;
      if (data.progress > 1) {
        data.progress = 0;
        data.edgeIdx = Math.floor(Math.random() * totalEdges);
      }
      const mesh = pulsesRef.current[i];
      if (!mesh) return;
      const idx1 = edges[data.edgeIdx * 2];
      const idx2 = edges[data.edgeIdx * 2 + 1];
      if (idx1 === undefined || idx2 === undefined) return;
      const p1 = new THREE.Vector3(positions[idx1 * 3], positions[idx1 * 3 + 1], positions[idx1 * 3 + 2]);
      const p2 = new THREE.Vector3(positions[idx2 * 3], positions[idx2 * 3 + 1], positions[idx2 * 3 + 2]);
      mesh.position.lerpVectors(p1, p2, data.progress);
    });
  });

  const nodeCount = positions.length / 3;

  return (
    <>
      {/* Nodes */}
      <instancedMesh ref={nodesRef} args={[undefined, undefined, nodeCount]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color="#3a6b24" transparent opacity={0.7} />
      </instancedMesh>

      {/* Edges */}
      <lineSegments ref={edgesRef} geometry={edgesGeometry}>
        <lineBasicMaterial color="#6DB33F" transparent opacity={0.10} />
      </lineSegments>

      {/* Travelling signal pulses */}
      {Array.from({ length: PULSE_COUNT }).map((_, i) => (
        <mesh key={i} ref={(el) => { if (el) pulsesRef.current[i] = el as THREE.Mesh; }}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color="#9bd857" transparent opacity={0.8} />
        </mesh>
      ))}
    </>
  );
}

/* ─── Export ────────────────────────────────────────────────────── */
export default function SystemNetwork() {
  const reducedMotion = useReducedMotion();
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglAvailable(false);
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  if (!webglAvailable) return <SystemNetworkFallback />;

  return (
    <div className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        camera={{ position: [0, 0, 10], fov: 70 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
