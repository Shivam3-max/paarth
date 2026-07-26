import { useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import { Container } from '../components/Shared.jsx'
import { Gyro } from '../motion/Object3D.jsx'
import Lazy3D from '../motion/Lazy3D.jsx'

const stages = ['Student', 'Working Professional', 'Founder / Business Owner', 'Marketer / Freelancer / Operator', 'Other']
const focuses = ['Marketing', 'AI', 'Business Leadership', 'A combination']
const APPLICATION_API_URL = import.meta.env.VITE_APPLICATION_API_URL || '/send-mail.php'

const inputCls =
  'w-full border hairline bg-paper px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-soft/50 outline-none transition-colors focus:border-brass'

function Field({ label, htmlFor, required, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold tracking-wide">
        {label} {required && <span className="text-brass">*</span>}
      </label>
      {children}
    </div>
  )
}

export default function Apply() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setSending(true)

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const response = await fetch(APPLICATION_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.status === 404) {
        throw new Error(
          'Application service is not available on this deployment. Configure VITE_APPLICATION_API_URL to point at a live backend endpoint.',
        )
      }

      const result = await response.json().catch(() => ({}))

      if (!response.ok || result.ok === false) {
        throw new Error(result.message || 'Could not submit your application right now.')
      }

      setSent(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      const fallback =
        err instanceof TypeError
          ? 'Could not reach the application service. Check that the backend endpoint is deployed and accessible from this domain.'
          : 'Could not submit your application right now.'

      setError(err.message || fallback)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <header className="relative overflow-hidden border-b hairline">
        <Lazy3D kind="dodeca" className="absolute right-[8%] top-28 hidden h-64 w-64 lg:block" />
        <Gyro size={100} className="absolute bottom-8 right-[30%] hidden opacity-60 lg:block" />
        <Container className="relative pt-36 pb-14 md:pt-44 md:pb-20">
          <Reveal>
            <p className="eyebrow">Admissions</p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-6 max-w-3xl text-[clamp(1.5rem,9.5vw,2.25rem)] leading-[1.08] md:text-6xl">
              Apply to <em className="serif-i text-brass-deep">Paarth</em>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Tell us a little about who you are, what you’re building toward, and why you want to join Paarth. We
              review applications to understand intent, fit, and seriousness.
            </p>
          </Reveal>
        </Container>
      </header>

      <section className="py-20 md:py-28">
        <Container>
          {sent ? (
            <div className="mx-auto max-w-2xl border hairline bg-cream px-8 py-16 text-center md:px-16">
              <p className="eyebrow">Application Received</p>
              <h2 className="mt-6 text-3xl md:text-4xl">Thank you for applying.</h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                Our team reviews every application to understand intent, fit, and seriousness. If there is a potential
                fit, you will hear from us with next steps for a conversation.
              </p>
              <p className="mt-8 font-display text-xl italic text-brass-deep">Founder-led. Framework-driven.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mx-auto grid max-w-2xl gap-7">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div className="grid gap-7 sm:grid-cols-2">
                <Field label="Full Name" htmlFor="name" required>
                  <input id="name" name="name" required className={inputCls} placeholder="Your full name" />
                </Field>
                <Field label="Email Address" htmlFor="email" required>
                  <input id="email" name="email" type="email" required className={inputCls} placeholder="you@example.com" />
                </Field>
              </div>
              <div className="grid gap-7 sm:grid-cols-2">
                <Field label="Phone Number" htmlFor="phone" required>
                  <input id="phone" name="phone" type="tel" required className={inputCls} placeholder="+91" />
                </Field>
                <Field label="Current Stage" htmlFor="stage" required>
                  <select id="stage" name="stage" required className={`${inputCls} cursor-pointer`} defaultValue="">
                    <option value="" disabled>Select your stage</option>
                    {stages.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="LinkedIn / Portfolio / Website (optional)" htmlFor="link">
                <input id="link" name="link" className={inputCls} placeholder="https://" />
              </Field>
              <Field label="Why do you want to join Paarth?" htmlFor="why" required>
                <textarea id="why" name="why" required rows={4} className={inputCls} placeholder="A few honest lines are enough." />
              </Field>
              <Field label="What are you hoping to build or become better at?" htmlFor="goal" required>
                <textarea id="goal" name="goal" required rows={4} className={inputCls} />
              </Field>
              <Field label="Which area matters most to you right now?" htmlFor="focus" required>
                <select id="focus" name="focus" required className={`${inputCls} cursor-pointer`} defaultValue="">
                  <option value="" disabled>Select an area</option>
                  {focuses.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
              </Field>
              <Field label="Anything else we should know?" htmlFor="more">
                <textarea id="more" name="more" rows={3} className={inputCls} />
              </Field>
              {error && (
                <div className="border border-brass/40 bg-cream px-4 py-3 text-sm leading-relaxed text-ink-soft">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={sending}
                className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 bg-ink px-8 py-4 text-sm font-semibold tracking-wide text-paper transition-colors duration-200 hover:bg-brass-deep"
              >
                {sending ? 'Submitting...' : 'Submit Application'}
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
              <p className="text-center text-xs text-ink-soft/70">
                We review applications to understand intent, fit, and seriousness — not to judge where you’re starting from.
              </p>
            </form>
          )}
        </Container>
      </section>
    </>
  )
}
