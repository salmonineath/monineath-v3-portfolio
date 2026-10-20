export type ContactFormValues = {
  name: string
  email: string
  projectType: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.'
  }
  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address, e.g. name@company.com.'
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Please tell me a little about your project (at least 10 characters).'
  }

  return errors
}

/**
 * The site has no backend, so the form drafts an email in the visitor's own
 * mail app instead of submitting to a server.
 */
export function buildInquiryMailto(recipient: string, values: ContactFormValues): string {
  const projectType = values.projectType.trim()
  const subject = projectType ? `Project inquiry: ${projectType}` : 'Project inquiry'
  const body = [
    values.message.trim(),
    '',
    '—',
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    projectType && `Project type: ${projectType}`,
  ]
    .filter((line) => line !== '')
    .join('\n')

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
