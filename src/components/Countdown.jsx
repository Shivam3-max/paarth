import { useEffect, useState } from 'react'

function parts(target) {
  const ms = Math.max(0, target - Date.now())
  const s = Math.floor(ms / 1000)
  return [
    ['Days', Math.floor(s / 86400)],
    ['Hrs', Math.floor((s % 86400) / 3600)],
    ['Min', Math.floor((s % 3600) / 60)],
    ['Sec', s % 60],
  ]
}

export default function Countdown({ target, className = '' }) {
  const [p, setP] = useState(() => parts(target))
  useEffect(() => {
    const id = setInterval(() => setP(parts(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  return (
    <div className={`flex gap-2 sm:gap-3 ${className}`} role="timer" aria-label="Time until the masterclass">
      {p.map(([label, v]) => (
        <div key={label} className="glass hud flex w-[4.4rem] flex-col items-center rounded-xl py-3 sm:w-20">
          <span className="font-mono text-2xl font-bold tabular-nums text-ivory sm:text-3xl">{String(v).padStart(2, '0')}</span>
          <span className="mono mt-1 !text-[0.55rem] text-mist">{label}</span>
        </div>
      ))}
    </div>
  )
}
