export type ContactFormValues = {
  name: string
  email: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const CONTACT_LIMITS = { name: 100, email: 254, message: 5000 } as const

/** Shared by the form (instant feedback) and the server action (the real check). */
export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const message = values.message.trim()

  if (!name) {
    errors.name = 'Please enter your name.'
  } else if (name.length > CONTACT_LIMITS.name) {
    errors.name = `Please keep your name under ${CONTACT_LIMITS.name} characters.`
  }

  if (!email) {
    errors.email = 'Please enter your email address.'
  } else if (email.length > CONTACT_LIMITS.email || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address, e.g. name@company.com.'
  }

  if (message.length < 10) {
    errors.message = 'Please tell me a little about your project (at least 10 characters).'
  } else if (message.length > CONTACT_LIMITS.message) {
    errors.message = `Please keep your message under ${CONTACT_LIMITS.message} characters.`
  }

  return errors
}

/** Fallback when no delivery service is configured: drafts the email in the visitor's own mail app. */
export function buildInquiryMailto(recipient: string, values: ContactFormValues): string {
  const subject = `Project inquiry from ${values.name.trim()}`
  const body = [values.message.trim(), '', '—', `Name: ${values.name.trim()}`, `Email: ${values.email.trim()}`].join('\n')

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
