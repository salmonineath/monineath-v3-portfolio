'use server'

import { validateContactForm, type ContactFormErrors, type ContactFormValues } from '@/lib/contactForm'

export type SendInquiryResult =
  | { status: 'sent' }
  | { status: 'invalid'; errors: ContactFormErrors }
  /** No delivery service is configured; the form falls back to the visitor's mail app. */
  | { status: 'not-configured' }
  | { status: 'failed' }

/**
 * Contact form integration point.
 *
 * Set `CONTACT_WEBHOOK_URL` (server-only, never sent to the browser) to any
 * endpoint that accepts a JSON POST of `{ name, email, message }`, such as a
 * Formspree form endpoint or an automation webhook. To use an email API
 * instead (Resend, Postmark, ...), replace the `fetch` below with its SDK call.
 */
export async function sendInquiry(input: ContactFormValues): Promise<SendInquiryResult> {
  // Server actions are public endpoints: re-check everything the browser sent.
  const values: ContactFormValues = {
    name: typeof input?.name === 'string' ? input.name.trim() : '',
    email: typeof input?.email === 'string' ? input.email.trim() : '',
    message: typeof input?.message === 'string' ? input.message.trim() : '',
  }

  const errors = validateContactForm(values)
  if (Object.keys(errors).length > 0) return { status: 'invalid', errors }

  const endpoint = process.env.CONTACT_WEBHOOK_URL
  if (!endpoint) return { status: 'not-configured' }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(values),
      signal: AbortSignal.timeout(10_000),
    })
    return response.ok ? { status: 'sent' } : { status: 'failed' }
  } catch {
    return { status: 'failed' }
  }
}
