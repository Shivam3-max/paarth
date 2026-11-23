// Point-cloud targets the particle field morphs between.
// 0 orb · 1 arrow (lead) · 2 megaphone (market) · 3 lattice (AI)
// 4 ring (360°) · 5 rising city (business) · 6 galaxy (masterclass)

const TAU = Math.PI * 2
const rand = (a = -1, b = 1) => a + Math.random() * (b - a)

function orb(n) {
  const out = new Float32Array(n * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const th = golden * i
    const R = 2.3 + (Math.random() < 0.12 ? rand(0, 0.5) : rand(-0.03, 0.03))
    out.set([Math.cos(th) * r * R, y * R, Math.sin(th) * r * R], i * 3)
  }
  return out
}

function arrow(n) {
  const out = new Float32Array(n * 3)
  const ang = Math.PI / 4 // points up-right
  const c = Math.cos(ang), s = Math.sin(ang)
  for (let i = 0; i < n; i++) {
    let x, y, z
    const k = Math.random()
    if (k < 0.42) {
      // shaft
      x = rand(-2.8, 1.6)
      const a = rand(0, TAU), r = 0.07 * Math.sqrt(Math.random())
      y = Math.cos(a) * r; z = Math.sin(a) * r
    } else if (k < 0.78) {
      // head: cone from x=1.4 to tip 2.9
      const t = Math.pow(Math.random(), 0.7)
      x = 2.9 - t * 1.5
      const a = rand(0, TAU), r = t * 0.62 * Math.sqrt(Math.random() * 0.3 + 0.7)
      y = Math.cos(a) * r; z = Math.sin(a) * r * 0.35
    } else {
      // fletching fins
      const u = Math.random(), v = Math.random()
      x = -2.8 + u * 0.9 - v * 0.35
      const side = Math.random() < 0.5 ? 1 : -1
      y = side * v * 0.55; z = rand(-0.02, 0.02)
    }
    out.set([x * c - y * s, x * s + y * c, z], i * 3)
  }
  return out
}

function megaphone(n) {
  const out = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    let x, y, z
    if (Math.random() < 0.66) {
      const t = Math.random()
      x = -2.4 + t * 3.2
      const r = 0.28 + Math.pow(t, 1.6) * 1.5
      const a = rand(0, TAU)
      y = Math.cos(a) * r; z = Math.sin(a) * r
      if (Math.random() < 0.08) { x = -2.6 - rand(0, 0.5); y = rand(-0.3, 0.3); z = rand(-0.3, 0.3) }
    } else {
      // sound waves
      const w = Math.floor(rand(0, 3))
      const R = 2.3 + w * 0.65
      const a = rand(-0.85, 0.85)
      const b = rand(0, TAU)
      const spread = 0.04
      x = 0.4 + Math.cos(a) * R * 0.6 + rand(-spread, spread)
      y = Math.sin(a) * R * Math.cos(b * 0.08) + rand(-spread, spread)
      z = Math.sin(a) * R * Math.sin(b) * 0.25
    }
    out.set([x, y, z], i * 3)
  }
  return out
}

function lattice(n) {
  const out = new Float32Array(n * 3)
  const g = 5, size = 3.4
  const step = size / (g - 1)
  for (let i = 0; i < n; i++) {
    const axis = Math.floor(rand(0, 3))
    const p = [0, 0, 0]
    for (let k = 0; k < 3; k++) p[k] = Math.floor(rand(0, g)) * step - size / 2
    if (Math.random() < 0.82) p[axis] = rand(-size / 2, size / 2)
    else for (let k = 0; k < 3; k++) p[k] += rand(-0.06, 0.06) // nodes
    out.set(p, i * 3)
  }
  return out
}

function ring(n) {
  const out = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const a = rand(0, TAU)
    const k = Math.random()
    let R, r
    if (k < 0.7) { R = 2.9; r = 0.14 * Math.sqrt(Math.random()) }
    else if (k < 0.9) { R = 3.55; r = 0.03 }
    else { R = 2.1; r = 0.03 }
    const b = rand(0, TAU)
    const x = Math.cos(a) * (R + Math.cos(b) * r)
    const y = Math.sin(a) * (R + Math.cos(b) * r)
    const z = Math.sin(b) * r
    out.set([x, y, z], i * 3)
  }
  return out
}

function city(n) {
  const out = new Float32Array(n * 3)
  const g = 6, gap = 0.62, w = 0.36
  for (let i = 0; i < n; i++) {
    const gx = Math.floor(rand(0, g)), gz = Math.floor(rand(0, g))
    const h = 0.25 + Math.pow((gx + gz) / (2 * (g - 1)), 1.8) * 3.6
    const cx = (gx - (g - 1) / 2) * gap, cz = (gz - (g - 1) / 2) * gap
    let x, y, z
    const face = Math.random()
    if (face < 0.18) { x = cx + rand(-w, w) / 2; z = cz + rand(-w, w) / 2; y = h } // roof
    else {
      y = Math.random() * h
      const side = Math.floor(rand(0, 4))
      const t = rand(-w / 2, w / 2)
      x = cx + (side === 0 ? -w / 2 : side === 1 ? w / 2 : t)
      z = cz + (side === 2 ? -w / 2 : side === 3 ? w / 2 : t)
    }
    // tilt so it reads in 3/4 view
    const ry = 0.7
    const X = x * Math.cos(ry) - z * Math.sin(ry)
    const Z = x * Math.sin(ry) + z * Math.cos(ry)
    const rx = 0.42
    const Y = (y - 1.8) * Math.cos(rx) - Z * Math.sin(rx)
    const Z2 = (y - 1.8) * Math.sin(rx) + Z * Math.cos(rx)
    out.set([X, Y, Z2], i * 3)
  }
  return out
}

function galaxy(n) {
  const out = new Float32Array(n * 3)
  const arms = 3
  for (let i = 0; i < n; i++) {
    const r = Math.pow(Math.random(), 1.4) * 4.4
    const arm = (Math.floor(rand(0, arms)) / arms) * TAU
    const a = arm + r * 0.9 + rand(-0.35, 0.35) * (1.2 - r / 5)
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r
    const y = rand(-0.12, 0.12) * (1.4 - r / 4.4)
    // tilt toward viewer
    const t = 1.1
    out.set([x, y * Math.cos(t) - z * Math.sin(t), y * Math.sin(t) + z * Math.cos(t)], i * 3)
  }
  return out
}

export const SHAPE_COUNT = 7

export function buildShapes(n) {
  return [orb(n), arrow(n), megaphone(n), lattice(n), ring(n), city(n), galaxy(n)]
}
