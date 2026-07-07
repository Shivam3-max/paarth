import { useEffect, useRef } from 'react'

/** Mouse-reactive particle network on a 2D canvas.
 *  Draws one frame synchronously so it's never blank, then animates via rAF. */
export default function Constellation({ density = 55, dark = false, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const dot = dark ? 'rgba(251,249,244,0.55)' : 'rgba(154,123,45,0.6)'
    const accent = 'rgba(154,123,45,'
    const line = dark ? 'rgba(251,249,244,' : 'rgba(23,21,15,'

    let w = 0
    let h = 0
    let parts = []
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      const r = canvas.parentElement.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round((density * (w * h)) / (1440 * 700))
      parts = Array.from({ length: Math.max(24, n) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.6,
      }))
    }

    const draw = (dt = 0) => {
      ctx.clearRect(0, 0, w, h)
      const linkDist = 120
      for (const p of parts) {
        if (dt) {
          p.x += p.vx * dt * 0.06
          p.y += p.vy * dt * 0.06
          if (p.x < -10) p.x = w + 10
          if (p.x > w + 10) p.x = -10
          if (p.y < -10) p.y = h + 10
          if (p.y > h + 10) p.y = -10
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = dot
        ctx.fill()
      }
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i]
          const b = parts[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < linkDist) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `${line}${(0.14 * (1 - d / linkDist)).toFixed(3)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
        // mouse links
        const a = parts[i]
        const d = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (d < 170) {
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `${accent}${(0.35 * (1 - d / 170)).toFixed(3)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    resize()
    draw() // static first frame — never blank

    let rafId
    let last = performance.now()
    const loop = (t) => {
      const dt = Math.min(t - last, 50)
      last = t
      draw(dt)
      rafId = requestAnimationFrame(loop)
    }
    if (!reduced) rafId = requestAnimationFrame(loop)

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const ro = new ResizeObserver(() => {
      resize()
      draw()
    })
    ro.observe(canvas.parentElement)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseout', onLeave)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [density, dark])

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <canvas ref={ref} className="block h-full w-full" />
    </div>
  )
}
