/**
 * Paarth mark: an upward arrow (the archer's aim) forms the stem of a "P",
 * a full circle forms the bowl (360°), and a gold dot orbits it.
 */
export function LogoMark({ className = 'h-9 w-9', animate = true }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 36V6" />
        <path d="M8.5 11 13 4.5l4.5 6.5" />
        <circle cx="22" cy="16.5" r="9" />
      </g>
      <g className={animate ? 'logo-orbit' : ''}>
        <circle cx="31" cy="16.5" r="2.5" fill="#E9B44C" />
      </g>
    </svg>
  )
}

export default function Logo({ className = '', size = 'h-9 w-9' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className={size} />
      <span className="font-display text-[1.05rem] font-medium tracking-[0.28em]">PAARTH</span>
    </span>
  )
}
