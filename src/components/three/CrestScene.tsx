"use client";

import { useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { CanvasShell } from "./CanvasShell";

/* Crest drawn in the same 100×120 space as the SVG crest, centred on (50, 58). */
const v2 = (x: number, y: number) => new THREE.Vector2((x - 50) / 50, -(y - 58) / 50);
const v3 = (x: number, y: number, z = 0) => new THREE.Vector3((x - 50) / 50, -(y - 58) / 50, z);

function shieldShape(scale = 1) {
  const s = new THREE.Shape();
  const p = (x: number, y: number) => {
    const c = v2(50 + (x - 50) * scale, 58 + (y - 58) * scale);
    return [c.x, c.y] as const;
  };
  s.moveTo(...p(10, 14));
  s.quadraticCurveTo(...p(50, 4), ...p(90, 14));
  s.lineTo(...p(90, 58));
  s.quadraticCurveTo(...p(90, 92), ...p(50, 112));
  s.quadraticCurveTo(...p(10, 92), ...p(10, 58));
  s.closePath();
  return s;
}

function rect(x0: number, y0: number, x1: number, y1: number) {
  const s = new THREE.Shape();
  const a = v2(x0, y0), b = v2(x1, y1);
  s.moveTo(a.x, a.y);
  s.lineTo(b.x, a.y);
  s.lineTo(b.x, b.y);
  s.lineTo(a.x, b.y);
  s.closePath();
  return s;
}

function Crest3D() {
  const group = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Group>(null);

  const geo = useMemo(() => {
    const body = new THREE.ExtrudeGeometry(shieldShape(1), {
      depth: 0.22, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.05, bevelSegments: 6, curveSegments: 48,
    });
    body.center();
    const field = new THREE.ExtrudeGeometry(shieldShape(0.86), {
      depth: 0.04, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.012, bevelSegments: 3, curveSegments: 48,
    });
    const cross = new THREE.ExtrudeGeometry([rect(45.5, 20, 54.5, 101), rect(17, 38.5, 83, 47.5)], {
      depth: 0.07, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.018, bevelSegments: 4,
    });
    const sCurve = new THREE.CatmullRomCurve3([
      v3(36.5, 63.5), v3(31, 60.5), v3(25, 62.5), v3(24.6, 67.5), v3(30, 71.5),
      v3(35.6, 75.5), v3(36, 80.5), v3(30.5, 83.5), v3(24, 81),
    ]);
    const S = new THREE.TubeGeometry(sCurve, 120, 0.045, 14, false);
    const lPath = new THREE.CurvePath<THREE.Vector3>();
    lPath.add(new THREE.LineCurve3(v3(65, 60.5), v3(65, 82.5)));
    lPath.add(new THREE.LineCurve3(v3(65, 82.5), v3(76.5, 82.5)));
    const L = new THREE.TubeGeometry(lPath, 60, 0.045, 14, false);
    return { body, field, cross, S, L };
  }, []);

  const mats = useMemo(
    () => ({
      gold: new THREE.MeshPhysicalMaterial({ color: "#d9a20a", metalness: 1, roughness: 0.24, clearcoat: 0.6, clearcoatRoughness: 0.2 }),
      enamel: new THREE.MeshPhysicalMaterial({ color: "#f2b705", metalness: 0.35, roughness: 0.38, clearcoat: 1, clearcoatRoughness: 0.08 }),
      lapis: new THREE.MeshPhysicalMaterial({ color: "#1f4fa3", metalness: 0.2, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.05, sheen: 0.4 }),
      ring: new THREE.MeshStandardMaterial({ color: "#f2b705", metalness: 1, roughness: 0.3 }),
    }),
    [],
  );

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const tx = state.pointer.y * -0.25;
    const ty = state.pointer.x * 0.45 + Math.sin(state.clock.elapsedTime * 0.35) * 0.12;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, tx, 3, dt);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, ty, 3, dt);
    if (halo.current) {
      halo.current.rotation.z += dt * 0.08;
      halo.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        <mesh geometry={geo.body} material={mats.gold} />
        <group position={[0, 0, 0.12]}>
          <mesh geometry={geo.field} material={mats.enamel} position={[0, 0, 0.06]} />
          <mesh geometry={geo.cross} material={mats.lapis} position={[0, 0, 0.1]} />
          <mesh geometry={geo.S} material={mats.lapis} position={[0, 0, 0.13]} scale={[1, 1, 0.6]} />
          <mesh geometry={geo.L} material={mats.lapis} position={[0, 0, 0.13]} scale={[1, 1, 0.6]} />
        </group>
      </Float>
      <group ref={halo} position={[0, 0, -0.4]}>
        <mesh material={mats.ring}>
          <torusGeometry args={[1.62, 0.006, 8, 200]} />
        </mesh>
        <mesh material={mats.ring} rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[1.9, 0.003, 8, 200]} />
        </mesh>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 1.62, Math.sin(a) * 1.62, 0]} material={mats.ring}>
              <octahedronGeometry args={[i % 3 === 0 ? 0.04 : 0.022]} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export default function CrestScene({ className = "" }: { className?: string }) {
  return (
    <CanvasShell className={className} camera={{ position: [0, 0, 4.4], fov: 40 }}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color="#fff4dc" />
      <directionalLight position={[-4, -2, 2]} intensity={1.2} color="#4f7bd1" />
      <Crest3D />
      <Sparkles count={70} scale={[6, 4, 3]} size={2.2} speed={0.25} opacity={0.7} color="#f2b705" />
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={3} position={[0, 4, 3]} scale={[8, 2, 1]} color="#fff2d6" />
        <Lightformer intensity={1.6} position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} color="#7aa2ff" />
        <Lightformer intensity={2} position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} color="#ffcf6b" />
        <Lightformer form="ring" intensity={2} position={[0, 0, -6]} scale={4} color="#ffffff" />
      </Environment>
    </CanvasShell>
  );
}
