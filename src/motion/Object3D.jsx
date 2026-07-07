/** Zero-dependency CSS 3D ornaments — run everywhere, cost nothing. */

/** Armillary sphere: three tumbling brass rings + core dot. */
export function Gyro({ size = 110, light = false, className = '' }) {
  const c = light ? 'rgba(251,249,244,0.4)' : 'rgba(154,123,45,0.55)'
  return (
    <div className={`o3d ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <span className="o3d-ring gyro-a" style={{ borderColor: c }} />
      <span className="o3d-ring gyro-b" style={{ borderColor: c }} />
      <span className="o3d-ring gyro-c" style={{ borderColor: light ? 'rgba(154,123,45,0.6)' : 'rgba(23,21,15,0.25)' }} />
      <span
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'var(--color-brass)' }}
      />
    </div>
  )
}

/** Wireframe cube spinning on two axes. */
export function Cube({ size = 64, light = false, className = '' }) {
  const border = light ? 'rgba(251,249,244,0.35)' : 'rgba(154,123,45,0.5)'
  const fill = 'rgba(154,123,45,0.05)'
  const half = size / 2
  const faces = [
    `rotateY(0deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(270deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ]
  return (
    <div className={`o3d-scene ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <div className="o3d-cube" style={{ width: size, height: size }}>
        {faces.map((t, i) => (
          <span key={i} className="o3d-face" style={{ transform: t, borderColor: border, background: fill }} />
        ))}
      </div>
    </div>
  )
}

/** Stack of floating brass planes — reads as a 3D card deck. */
export function Deck({ size = 90, className = '' }) {
  return (
    <div className={`o3d-scene ${className}`} style={{ width: size, height: size * 0.7 }} aria-hidden="true">
      <div className="o3d-deck" style={{ width: size, height: size * 0.7 }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="o3d-face"
            style={{
              transform: `translateZ(${i * 14 - 14}px)`,
              borderColor: `rgba(154,123,45,${0.55 - i * 0.15})`,
              background: i === 0 ? 'rgba(154,123,45,0.06)' : 'transparent',
            }}
          />
        ))}
      </div>
    </div>
  )
}
