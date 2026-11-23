// Tiny mutable store shared between DOM (GSAP) and WebGL (useFrame).
export const glStore = {
  intro: 0, // 0 → 1 when the preloader finishes
  pulse: 0, // momentary energy burst (e.g. on form submit)
  mouse: { x: 0, y: 0 },
}
