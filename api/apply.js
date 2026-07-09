const REQUIRED_FIELDS = ['name', 'email', 'phone', 'stage', 'why', 'goal', 'focus']

function readBody(req) {
  if (req.body && typeof req.body === 'object') {
    return Promise.resolve(req.body)
  }

  if (typeof req.body === 'string') {
    try {
      return Promise.resolve(req.body ? JSON.parse(req.body) : {})
    } catch {
      return Promise.reject(new Error('Invalid JSON'))
    }
  }

  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
      if (body.length > 1_000_000) {
        reject(new Error('Request body too large'))
        req.destroy()
      }
    })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        reject(new Error('Invalid JSON'))
      }
    })
    req.on('error', reject)
  })
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function applicationHtml(data) {
  const rows = [
    ['Full name', data.name],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Current stage', data.stage],
    ['LinkedIn / Portfolio / Website', data.link],
    ['Focus area', data.focus],
    ['Why Paarth?', data.why],
    ['Goal', data.goal],
    ['Anything else', data.more],
  ]

  return `
    <div style="font-family:Arial,sans-serif;color:#17150f;line-height:1.55">
      <h1 style="font-size:22px;margin:0 0 16px">New Paarth Application</h1>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:720px">
        ${rows
          .filter(([, value]) => String(value || '').trim())
          .map(
            ([label, value]) => `
              <tr>
                <td style="border:1px solid #e2dac8;padding:10px;font-weight:700;width:220px;background:#f2ede2">${escapeHtml(label)}</td>
                <td style="border:1px solid #e2dac8;padding:10px;white-space:pre-wrap">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join('')}
      </table>
    </div>
  `
}

async function readResendError(response) {
  try {
    const payload = await response.json()
    return payload?.message || payload?.error || payload?.name
  } catch {
    return ''
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, message: 'Method not allowed' })
  }

  try {
    const data = await readBody(req)

    if (data.website) {
      return res.status(200).json({ ok: true })
    }

    const missing = REQUIRED_FIELDS.filter((field) => !String(data[field] || '').trim())
    if (missing.length) {
      return res.status(400).json({ ok: false, message: 'Please complete all required fields.' })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) {
      return res.status(400).json({ ok: false, message: 'Please enter a valid email address.' })
    }

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.APPLICATION_MAIL_TO
    const from = process.env.APPLICATION_MAIL_FROM || 'Paarth Applications <onboarding@resend.dev>'

    if (!apiKey) {
      return res.status(500).json({ ok: false, message: 'Mail service is missing the Resend API key.' })
    }

    if (!to || to.includes('your-domain.com')) {
      return res.status(500).json({ ok: false, message: 'Mail service needs a real receiving email address.' })
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: data.email,
        subject: `New Paarth application from ${data.name}`,
        html: applicationHtml(data),
      }),
    })

    if (!response.ok) {
      const resendMessage = await readResendError(response)
      return res.status(502).json({
        ok: false,
        message: resendMessage || 'Mail service could not send the application.',
      })
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message || 'Something went wrong.' })
  }
}
