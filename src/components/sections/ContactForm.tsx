import { useState, type ChangeEvent, type FormEvent } from 'react'
import { site } from '../../data/site'
import {
  buildInquiryMailto,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '../../lib/contactForm'
import { cn } from '../../lib/cn'
import { buttonStyles } from '../ui/buttonStyles'

const initialValues: ContactFormValues = { name: '', email: '', projectType: '', message: '' }

type FieldChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

export function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [hasOpenedMailApp, setHasOpenedMailApp] = useState(false)

  function handleChange(event: FieldChangeEvent) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    // Clear a field's error as soon as the visitor edits it.
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validationErrors = validateContactForm(values)
    setErrors(validationErrors)

    const firstInvalidField = Object.keys(validationErrors)[0]
    if (firstInvalidField) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus()
      return
    }

    window.location.href = buildInquiryMailto(site.email, values)
    setHasOpenedMailApp(true)
  }

  const fieldProps = (name: keyof ContactFormValues) => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: handleChange,
  })

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-card border border-line bg-surface-solid/60 p-5 sm:p-8"
      aria-describedby="contact-form-note"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Your Name" autoComplete="name" placeholder="e.g. Jordan Lee" {...fieldProps('name')} />
        <FormField
          label="Email Address"
          type="email"
          autoComplete="email"
          placeholder="jordan@company.com"
          {...fieldProps('email')}
        />
      </div>

      <FormField
        label="Project Type"
        optional
        placeholder="e.g. Business Website, SaaS App, Dashboard or Bug Fixes"
        className="mt-5"
        {...fieldProps('projectType')}
      />

      <FormField
        label="Your Message"
        multiline
        placeholder="Tell me a bit about what you're looking to build, timeline, or requirements..."
        className="mt-5"
        {...fieldProps('message')}
      />

      <button type="submit" className={buttonStyles({ className: 'bg-gradient-primary mt-6 w-full hover:opacity-90' })}>
        Send Project Inquiry
      </button>

      <p id="contact-form-note" className="mt-4 text-center text-xs text-fg-subtle" role="status">
        {hasOpenedMailApp ? (
          <>
            Your email app should now open with the inquiry drafted. If nothing happened, email me directly at{' '}
            <a href={`mailto:${site.email}`} className="text-blue-600 underline dark:text-blue-400">
              {site.email}
            </a>
            .
          </>
        ) : (
          'Opens your email app with your message pre-filled.'
        )}
      </p>
    </form>
  )
}

type FormFieldProps = {
  label: string
  name: keyof ContactFormValues
  value: string
  onChange: (event: FieldChangeEvent) => void
  error?: string
  placeholder?: string
  type?: 'text' | 'email'
  autoComplete?: string
  multiline?: boolean
  optional?: boolean
  className?: string
}

/** Labeled input or textarea with an accessible inline error message. */
function FormField({
  label,
  name,
  error,
  type = 'text',
  multiline = false,
  optional = false,
  className,
  ...inputProps
}: FormFieldProps) {
  const errorId = `${name}-error`
  const controlProps = {
    id: name,
    name,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
    className: cn(
      'mt-2 block w-full rounded-lg border bg-surface-raised px-4 py-2.5 font-display text-[0.95rem] text-fg transition-colors placeholder:text-fg-subtle focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none',
      error ? 'border-rose-500' : 'border-line',
      multiline && 'resize-y',
    ),
    ...inputProps,
  }

  return (
    <div className={className}>
      <label htmlFor={name} className="font-mono text-xs font-medium text-fg-secondary">
        {label}
        {optional && <span className="text-fg-subtle"> (optional)</span>}
      </label>
      {multiline ? <textarea rows={4} {...controlProps} /> : <input type={type} {...controlProps} />}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  )
}
