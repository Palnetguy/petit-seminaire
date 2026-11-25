"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { CanvasShell } from "./CanvasShell";

const COUNT = 5154; // names in the seminary register at the centenary
const HIGHLIGHT = 80; // index of Nº 81, Aloys Bigirumwami

const vert = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute vec3 aCloud;
  attribute vec3 aGrid;
  attribute vec3 aCross;
  attribute float aRand;
  attribute float aHi;
  varying float vHi;
  varying float vAlpha;

  float ease(float t){ return t < .5 ? 4.*t*t*t : 1. - pow(-2.*t + 2., 3.) / 2.; }

  void main(){
    float p1 = ease(clamp((uProgress - aRand * .35) / .65, 0., 1.));
    float p2 = ease(clamp((uProgress - 1. - aRand * .35) / .65, 0., 1.));
    vec3 pos = mix(aCloud, aGrid, p1);
    pos = mix(pos, aCross, p2);
    float drift = (1. - p1) + p2 * .25;
    pos.x += sin(uTime * .6 + aRand * 40.) * .04 * drift;
    pos.y += cos(uTime * .5 + aRand * 30.) * .04 * drift;
    pos.z += sin(uTime * .4 + aRand * 20.) * .06 * drift;
    vec4 mv = modelViewMatrix * vec4(pos, 1.);
    gl_Position = projectionMatrix * mv;
    float s = uSize * (0.6 + aRand * .8) * (1. + aHi * 5.);
    gl_PointSize = s * uPixelRatio * (1. / -mv.z);
    vHi = aHi;
    vAlpha = .55 + .45 * p1;
  }
`;

const frag = /* glsl */ `
  uniform float uTime;
  varying float vHi;
  varying float vAlpha;
  void main(){
    vec2 c = gl_PointCoord - .5;
    float d = length(c);
    float a = smoothstep(.5, .0, d);
    vec3 ivory = vec3(.965, .94, .894);
    vec3 gold = vec3(.95, .72, .02);
    vec3 col = mix(ivory, gold, vHi);
    float pulse = 1. + vHi * .35 * sin(uTime * 3.);
    gl_FragColor = vec4(col * pulse, a * vAlpha);
  }
`;

/** Deterministic Park–Miller generator so the field is identical on every load. */
function seededRandom(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function Field({ progress }: { progress: RefObject<number> }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const points = useRef<THREE.Points>(null);
  const { gl, size } = useThree();

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const cloud = new Float32Array(COUNT * 3);
    const grid = new Float32Array(COUNT * 3);
    const cross = new Float32Array(COUNT * 3);
    const rand = new Float32Array(COUNT);
    const hi = new Float32Array(COUNT);
    const cols = 98;
    const rows = Math.ceil(COUNT / cols);
    const sp = 0.056;
    // deterministic pseudo-random so SSR/CSR and reloads match
    const rnd = seededRandom(1912);

    for (let i = 0; i < COUNT; i++) {
      // cloud: a loose galaxy disc
      const r = Math.pow(rnd(), 0.6) * 4.2;
      const th = rnd() * Math.PI * 2 + r * 0.8;
      cloud.set([Math.cos(th) * r * 1.3, (rnd() - 0.5) * 2.6, Math.sin(th) * r - 1], i * 3);

      // grid: the ledger, page by page
      const cx = i % cols;
      const cy = Math.floor(i / cols);
      grid.set([(cx - cols / 2) * sp, (rows / 2 - cy) * sp, 0], i * 3);

      // cross: sample within the two bars (area-weighted)
      const vA = 0.55 * 3.4, hA = 2.4 * 0.55;
      let x: number, y: number;
      if (rnd() < vA / (vA + hA)) {
        x = (rnd() - 0.5) * 0.55;
        y = (rnd() - 0.5) * 3.4 - 0.15;
      } else {
        x = (rnd() - 0.5) * 2.4;
        y = (rnd() - 0.5) * 0.55 + 0.6;
      }
      cross.set([x, y, (rnd() - 0.5) * 0.25], i * 3);
      rand[i] = rnd();
      hi[i] = i === HIGHLIGHT ? 1 : 0;
    }
    g.setAttribute("position", new THREE.BufferAttribute(grid, 3));
    g.setAttribute("aCloud", new THREE.BufferAttribute(cloud, 3));
    g.setAttribute("aGrid", new THREE.BufferAttribute(grid, 3));
    g.setAttribute("aCross", new THREE.BufferAttribute(cross, 3));
    g.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    g.setAttribute("aHi", new THREE.BufferAttribute(hi, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 8);
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: 26 },
      uPixelRatio: { value: 1 },
    }),
    [],
  );

  useFrame((state, dt) => {
    if (!mat.current || !points.current) return;
    const u = mat.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uPixelRatio.value = gl.getPixelRatio();
    u.uSize.value = size.width < 700 ? 18 : 26;
    u.uProgress.value = THREE.MathUtils.damp(u.uProgress.value, progress.current ?? 0, 4, dt);
    const p = points.current;
    p.rotation.y = THREE.MathUtils.damp(p.rotation.y, state.pointer.x * 0.25, 2, dt);
    p.rotation.x = THREE.MathUtils.damp(p.rotation.x, -state.pointer.y * 0.12, 2, dt);
    const s = size.width < 700 ? 0.62 : 1;
    p.scale.setScalar(s);
  });

  return (
    <points ref={points} geometry={geometry}>
      <shaderMaterial
        ref={mat}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function RegisterField({ progress, className = "" }: { progress: RefObject<number>; className?: string }) {
  return (
    <CanvasShell className={className} camera={{ position: [0, 0, 5.2], fov: 45 }}>
      <Field progress={progress} />
    </CanvasShell>
  );
}
