"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { CanvasShell } from "./CanvasShell";

/**
 * A living Imigongo panel: a grid of raised pyramids coloured in the
 * traditional black / red-earth / white bands of concentric diamonds,
 * rippling outward from the cursor.
 */
const COLS = 44;
const ROWS = 22;

const PALETTE = ["#121212", "#8f2a1f", "#f1e8d6", "#121212", "#c98a5d", "#f1e8d6"].map((c) => new THREE.Color(c));

function Wall() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const pointer = useRef(new THREE.Vector2(999, 999));
  const target = useMemo(() => new THREE.Vector2(), []);

  const cells = useMemo(() => {
    const arr: { x: number; z: number; band: number; base: number }[] = [];
    const cx = (COLS - 1) / 2;
    const cz = (ROWS - 1) / 2;
    for (let j = 0; j < ROWS; j++)
      for (let i = 0; i < COLS; i++) {
        // two interlocking diamond centres, as on a classic panel
        const offset = i < COLS / 2 ? -COLS / 4 : COLS / 4;
        const d = Math.abs(i - cx - offset) + Math.abs(j - cz);
        const band = Math.floor(d) % PALETTE.length;
        arr.push({ x: i - cx, z: j - cz, band, base: 0.35 + (band % 3) * 0.18 });
      }
    return arr;
  }, []);

  const geometry = useMemo(() => {
    const g = new THREE.ConeGeometry(0.71, 1, 4, 1);
    g.rotateY(Math.PI / 4);
    g.translate(0, 0.5, 0);
    return g;
  }, []);

  const colors = useMemo(() => {
    const arr = new Float32Array(cells.length * 3);
    cells.forEach((c, i) => PALETTE[c.band].toArray(arr, i * 3));
    return arr;
  }, [cells]);

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    // pointer projected roughly onto the panel plane
    const px = state.pointer.x * (COLS / 2);
    const pz = -state.pointer.y * (ROWS / 2) * 1.2;
    pointer.current.lerp(target.set(px, pz), 0.08);
    cells.forEach((c, i) => {
      const dx = c.x - pointer.current.x;
      const dz = c.z - pointer.current.y;
      const dist = Math.sqrt(dx * dx + dz * dz);
      const ripple = Math.sin(dist * 0.7 - t * 2.4) * Math.exp(-dist * 0.12) * 0.9;
      const breathe = Math.sin(t * 0.6 + (c.x + c.z) * 0.25) * 0.08;
      const h = Math.max(0.05, c.base + ripple * 0.6 + breathe);
      dummy.position.set(c.x, 0, c.z);
      dummy.scale.set(1, h, 1);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[geometry, undefined, COLS * ROWS]}>
      <instancedBufferAttribute attach="instanceColor" args={[colors, 3]} />
      <meshStandardMaterial flatShading roughness={0.85} metalness={0.05} />
    </instancedMesh>
  );
}

function LookAt() {
  const camera = useThree((s) => s.camera);
  useEffect(() => camera.lookAt(0, -2, 0), [camera]);
  return null;
}

export default function ImigongoWall({ className = "" }: { className?: string }) {
  return (
    <CanvasShell className={className} camera={{ position: [0, 17, 13], fov: 42 }}>
      <color attach="background" args={["#07142b"]} />
      <fog attach="fog" args={["#07142b", 18, 36]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[-12, 8, 4]} intensity={2.6} color="#ffe2b0" />
      <directionalLight position={[10, 4, -6]} intensity={0.8} color="#6e8fd8" />
      <LookAt />
      <Wall />
    </CanvasShell>
  );
}
