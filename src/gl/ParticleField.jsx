import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { buildShapes, SHAPE_COUNT } from './shapes.js'
import { glStore } from './store.js'

const vertex = /* glsl */ `
  uniform float uShape;
  uniform float uTime;
  uniform float uPixel;
  uniform float uIntro;
  uniform float uPulse;
  uniform vec2 uMouse;
  attribute vec3 p1;
  attribute vec3 p2;
  attribute vec3 p3;
  attribute vec3 p4;
  attribute vec3 p5;
  attribute vec3 p6;
  attribute vec4 aRnd;
  varying vec3 vColor;
  varying float vAlpha;

  vec3 pick(int i) {
    if (i == 0) return position;
    if (i == 1) return p1;
    if (i == 2) return p2;
    if (i == 3) return p3;
    if (i == 4) return p4;
    if (i == 5) return p5;
    return p6;
  }

  void main() {
    float s = clamp(uShape, 0.0, ${SHAPE_COUNT - 1}.0);
    int i0 = int(floor(s));
    int i1 = min(i0 + 1, ${SHAPE_COUNT - 1});
    float t = s - float(i0);
    float tt = smoothstep(0.0, 1.0, clamp((t - aRnd.x * 0.35) / 0.65, 0.0, 1.0));

    vec3 pos = mix(pick(i0), pick(i1), tt);
    float bulge = sin(tt * 3.14159);
    pos += (aRnd.yzw - 0.5) * bulge * 1.8;

    // living drift
    pos += 0.045 * vec3(
      sin(uTime * 0.7 + aRnd.x * 40.0 + pos.y * 2.0),
      cos(uTime * 0.6 + aRnd.y * 40.0 + pos.x * 2.0),
      sin(uTime * 0.5 + aRnd.z * 40.0));

    // intro: fly in from deep space
    vec3 far = (aRnd.yzw - 0.5) * vec3(40.0, 26.0, 30.0);
    pos = mix(far, pos, smoothstep(0.0, 1.0, clamp(uIntro * 1.4 - aRnd.x * 0.4, 0.0, 1.0)));
    pos *= 1.0 + uPulse * (0.15 + aRnd.w * 0.5);

    vec4 world = modelMatrix * vec4(pos, 1.0);
    vec2 d = world.xy - uMouse;
    float dist = length(d);
    world.xy += normalize(d + 0.0001) * smoothstep(1.4, 0.0, dist) * 0.55;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uPixel * (0.5 + aRnd.w * 1.5) * (9.0 / -mv.z);

    vec3 ivory = vec3(0.95, 0.93, 0.88);
    vec3 gold = vec3(0.98, 0.70, 0.30);
    vec3 ember = vec3(1.0, 0.45, 0.22);
    vec3 violet = vec3(0.6, 0.55, 1.0);
    vColor = aRnd.y > 0.62 ? gold : (aRnd.y > 0.56 ? ember : (aRnd.y < 0.06 ? violet : ivory));
    vAlpha = 0.35 + aRnd.z * 0.65;
    vAlpha *= 0.75 + 0.25 * sin(uTime * 2.0 + aRnd.x * 60.0);
  }
`

const fragment = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = pow(smoothstep(0.5, 0.0, d), 1.6);
    gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);
  }
`

function readMarkers(isDesktop) {
  const els = document.querySelectorAll('[data-gl]')
  const vh = window.innerHeight
  const mid = vh / 2
  const list = []
  els.forEach((el) => {
    const r = el.getBoundingClientRect()
    const [shape, x = 0, y = 0, scale = 1, opacity = 1] = el.dataset.gl.split(',').map(Number)
    list.push({
      anchor: r.top + r.height / 2,
      shape,
      x: isDesktop ? x : 0,
      y: isDesktop ? y : y * 0.5,
      scale: isDesktop ? scale : scale * 0.72,
      opacity: isDesktop ? opacity : opacity * 0.75,
    })
  })
  if (!list.length) return null
  if (mid <= list[0].anchor) return list[0]
  const last = list[list.length - 1]
  if (mid >= last.anchor) return last
  for (let i = 0; i < list.length - 1; i++) {
    const a = list[i], b = list[i + 1]
    if (mid >= a.anchor && mid <= b.anchor) {
      const raw = (mid - a.anchor) / Math.max(1, b.anchor - a.anchor)
      const f = THREE.MathUtils.smoothstep(raw, 0.2, 0.8)
      const lerp = (k) => a[k] + (b[k] - a[k]) * f
      return { shape: lerp('shape'), x: lerp('x'), y: lerp('y'), scale: lerp('scale'), opacity: lerp('opacity') }
    }
  }
  return last
}

function Points({ count }) {
  const group = useRef()
  const mat = useRef()
  const { size, camera } = useThree()
  const state = useRef({ shape: 0, x: 0, y: 0, scale: 1, opacity: 1, mx: 0, my: 0 })

  const geometry = useMemo(() => {
    const shapes = buildShapes(count)
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(shapes[0], 3))
    for (let i = 1; i < shapes.length; i++) g.setAttribute('p' + i, new THREE.BufferAttribute(shapes[i], 3))
    const rnd = new Float32Array(count * 4)
    for (let i = 0; i < rnd.length; i++) rnd[i] = Math.random()
    g.setAttribute('aRnd', new THREE.BufferAttribute(rnd, 4))
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 50)
    return g
  }, [count])

  const uniforms = useMemo(
    () => ({
      uShape: { value: 0 },
      uTime: { value: 0 },
      uPixel: { value: 1 },
      uIntro: { value: 0 },
      uPulse: { value: 0 },
      uOpacity: { value: 1 },
      uMouse: { value: new THREE.Vector2(99, 99) },
    }),
    [],
  )

  useFrame((frame, delta) => {
    const dt = Math.min(delta, 0.25)
    const s = state.current
    const isDesktop = size.width >= 1024
    const target = readMarkers(isDesktop)
    const k = 1 - Math.exp(-dt * 3.2)
    if (target) {
      s.shape += (target.shape - s.shape) * k
      s.x += (target.x - s.x) * k
      s.y += (target.y - s.y) * k
      s.scale += (target.scale - s.scale) * k
      s.opacity += (target.opacity - s.opacity) * k
    }
    s.mx += (glStore.mouse.x - s.mx) * (1 - Math.exp(-dt * 4))
    s.my += (glStore.mouse.y - s.my) * (1 - Math.exp(-dt * 4))

    if (import.meta.env.DEV) window.__gl = s
    const u = mat.current.uniforms
    u.uTime.value += dt
    u.uShape.value = s.shape
    u.uIntro.value = glStore.intro
    u.uPulse.value = glStore.pulse
    u.uOpacity.value = s.opacity
    u.uPixel.value = frame.gl.getPixelRatio() * (isDesktop ? 2.6 : 2.2)

    // mouse → world plane at z=0
    const dist = camera.position.z
    const h = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * dist
    const w = h * (size.width / size.height)
    u.uMouse.value.set((s.mx * w) / 2, (s.my * h) / 2)

    const t = u.uTime.value
    const g = group.current
    g.position.set(s.x, s.y, 0)
    g.scale.setScalar(s.scale)
    // lattice + ring spin; continuous so there is no jump between shapes
    s.spin = (s.spin || 0) + dt * 0.22 * Math.max(0, 1 - Math.abs(s.shape - 3))
    s.roll = (s.roll || 0) + dt * 0.12 * Math.max(0, 1 - Math.abs(s.shape - 4))
    g.rotation.y = Math.sin(t * 0.18) * 0.45 + s.mx * 0.25 + s.spin
    g.rotation.z = s.roll
    g.rotation.x = Math.sin(t * 0.13) * 0.12 - s.my * 0.15
  })

  return (
    <group ref={group}>
      <points geometry={geometry}>
        <shaderMaterial
          ref={mat}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

export default function ParticleField() {
  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 7000 : 16000
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <Points count={count} />
      </Canvas>
    </div>
  )
}
