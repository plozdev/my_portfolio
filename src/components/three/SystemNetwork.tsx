import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';
import { SystemNetworkFallback } from './SystemNetworkFallback';

const NODE_COUNT = 24;
const MAX_DISTANCE = 3.5;
const PULSE_COUNT = 5;

function Scene() {
  const { mouse, camera } = useThree();
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const pulsesRef = useRef<THREE.Mesh[]>([]);
  
  const reducedMotion = useReducedMotion();

  // Generate nodes deterministically
  const { positions, edges } = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3);
    const pts: THREE.Vector3[] = [];
    
    let seed = 12345;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (random() - 0.5) * 10;
      const y = (random() - 0.5) * 8;
      const z = (random() - 0.5) * 4;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      pts.push(new THREE.Vector3(x, y, z));
    }

    const edg: number[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (pts[i].distanceTo(pts[j]) < MAX_DISTANCE) {
          edg.push(i, j);
        }
      }
    }
    
    return { positions: pos, edges: edg };
  }, []);

  const edgesGeometry = useMemo(() => {
    const points: number[] = [];
    for (let i = 0; i < edges.length; i++) {
      const idx = edges[i];
      points.push(
        positions[idx * 3],
        positions[idx * 3 + 1],
        positions[idx * 3 + 2]
      );
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, [positions, edges]);

  useEffect(() => {
    return () => {
      edgesGeometry.dispose();
    };
  }, [edgesGeometry]);

  useEffect(() => {
    if (nodesRef.current) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < NODE_COUNT; i++) {
        dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        dummy.scale.setScalar(Math.random() * 0.5 + 0.5);
        dummy.updateMatrix();
        nodesRef.current.setMatrixAt(i, dummy.matrix);
      }
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [positions]);

  const pulseData = useRef<{ edgeIdx: number; progress: number; speed: number }[]>([]);
  useEffect(() => {
    for (let i = 0; i < PULSE_COUNT; i++) {
      pulseData.current.push({
        edgeIdx: Math.floor(Math.random() * (edges.length / 2)),
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.002
      });
    }
  }, [edges.length]);

  const mouseOffset = useRef(new THREE.Vector2(0, 0));
  const isTouchDevice = useRef(typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches);

  useFrame(() => {
    if (reducedMotion) return;

    if (!isTouchDevice.current) {
      mouseOffset.current.lerp(mouse, 0.05);
      camera.position.x = mouseOffset.current.x * 0.5;
      camera.position.y = mouseOffset.current.y * 0.5;
      camera.lookAt(0, 0, 0);
    }

    pulseData.current.forEach((data, i) => {
      data.progress += data.speed;
      if (data.progress > 1) {
        data.progress = 0;
        data.edgeIdx = Math.floor(Math.random() * (edges.length / 2));
      }

      if (pulsesRef.current[i]) {
        const idx1 = edges[data.edgeIdx * 2];
        const idx2 = edges[data.edgeIdx * 2 + 1];
        
        const p1 = new THREE.Vector3(positions[idx1 * 3], positions[idx1 * 3 + 1], positions[idx1 * 3 + 2]);
        const p2 = new THREE.Vector3(positions[idx2 * 3], positions[idx2 * 3 + 1], positions[idx2 * 3 + 2]);
        
        pulsesRef.current[i].position.lerpVectors(p1, p2, data.progress);
      }
    });
  });

  return (
    <>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#3F6B2A" />
      </instancedMesh>
      
      <lineSegments ref={edgesRef} geometry={edgesGeometry}>
        <lineBasicMaterial color="#6DB33F" transparent opacity={0.15} />
      </lineSegments>

      {Array.from({ length: PULSE_COUNT }).map((_, i) => (
        <mesh key={i} ref={(el) => { if (el) pulsesRef.current[i] = el as THREE.Mesh; }}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#8EDB55" />
        </mesh>
      ))}
    </>
  );
}

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

  if (!webglAvailable) {
    return <SystemNetworkFallback />;
  }

  return (
    <div className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }} aria-hidden="true">
      <Canvas dpr={[1, 1.5]} frameloop={reducedMotion ? "demand" : "always"} camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
