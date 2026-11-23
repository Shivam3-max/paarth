// ─────────────────────────────────────────────────────────────
//  Edit these values to update the site without touching layout.
// ─────────────────────────────────────────────────────────────

export const MASTERCLASS = {
  title: 'The 360° Masterclass',
  // Set an exact ISO date for the next session, e.g. '2026-12-06T11:00:00+05:30'.
  // Leave null to auto-show the coming Sunday, 11:00 AM IST.
  date: null,
  durationMin: 60,
  platform: 'Live on Zoom',
  host: {
    name: 'Shivam Bhandari',
    role: 'Founder, Paarth',
    photo: '/img/host.jpg',
  },
}

export const CONTACT = {
  email: '', // add the public inbox, e.g. 'hello@yourdomain.com' (hidden when empty)
  dishaUrl: import.meta.env.VITE_DISHA_URL || '',
}

export const FORM_API_URL = import.meta.env.VITE_APPLICATION_API_URL || '/send-mail.php'

/** Next session as a Date. */
export function nextSession() {
  if (MASTERCLASS.date) return new Date(MASTERCLASS.date)
  // coming Sunday 11:00 IST (05:30 UTC)
  const now = new Date()
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 5, 30))
  const add = (7 - d.getUTCDay()) % 7
  d.setUTCDate(d.getUTCDate() + add)
  if (d <= now) d.setUTCDate(d.getUTCDate() + 7)
  return d
}

export function formatSession(d) {
  const opts = { timeZone: 'Asia/Kolkata' }
  return {
    day: d.toLocaleDateString('en-IN', { ...opts, weekday: 'long' }),
    date: d.toLocaleDateString('en-IN', { ...opts, day: 'numeric', month: 'short', year: 'numeric' }),
    time: d.toLocaleTimeString('en-IN', { ...opts, hour: 'numeric', minute: '2-digit' }).toUpperCase() + ' IST',
  }
}
