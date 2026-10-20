'use client'

import { LoaderCircle, Send } from 'lucide-react'
import { useState, useTransition, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { sendInquiry } from '@/app/actions/sendInquiry'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'
import {
  buildInquiryMailto,
  CONTACT_LIMITS,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '@/lib/contactForm'
import { buttonStyles } from '../ui/buttonStyles'

const initialValues: ContactFormValues = { name: '', email: '', message: '' }

/** What happened after the last submit. Never claims delivery unless the server confirmed it. */
type Outcome = 'idle' | 'sent' | 'mail-app' | 'failed'

type FieldChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

export function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [outcome, setOutcome] = useState<Outcome>('idle')
  const [isPending, startTransition] = useTransition()

  function handleChange(event: FieldChangeEvent) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    // Clear a field's error as soon as the visitor edits it.
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  function showErrors(form: HTMLFormElement, fieldErrors: ContactFormErrors) {
    setErrors(fieldErrors)
    const firstInvalidField = Object.keys(fieldErrors)[0]
    form.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus()
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const validationErrors = validateContactForm(values)
    if (Object.keys(validationErrors).length > 0) {
      showErrors(form, validationErrors)
      return
    }

    setOutcome('idle')
    startTransition(async () => {
      const result = await sendInquiry(values).catch(() => ({ status: 'failed' as const }))

      if (result.status === 'invalid') {
        showErrors(form, result.errors)
      } else if (result.status === 'sent') {
        setValues(initialValues)
        setOutcome('sent')
      } else if (result.status === 'not-configured') {
        window.location.href = buildInquiryMailto(site.email, values)
        setOutcome('mail-app')
      } else {
        setOutcome('failed')
      }
    })
  }

  const fieldProps = (name: keyof ContactFormValues) => ({
    name,
    value: values[name],
    error: errors[name],
    maxLength: CONTACT_LIMITS[name],
    onChange: handleChange,
  })

  return (
    <form noValidate onSubmit={handleSubmit} className="rounded-card border border-line bg-surface-solid/60 p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full Name" autoComplete="name" placeholder="e.g. Jordan Lee" {...fieldProps('name')} />
        <FormField
          label="Email Address"
          type="email"
          autoComplete="email"
          placeholder="jordan@company.com"
          {...fieldProps('email')}
        />
      </div>

      <FormField
        label="Message"
        multiline
        placeholder="What would you like to build? Share goals, timeline, or anything helpful..."
        className="mt-5"
        {...fieldProps('message')}
      />

      <button
        type="submit"
        disabled={isPending}
        className={buttonStyles({
          className: 'bg-gradient-primary mt-6 w-full hover:opacity-90 disabled:cursor-wait disabled:opacity-70',
        })}
      >
        {isPending ? (
          <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
        ) : (
          <Send className="size-4" aria-hidden="true" />
        )}
        {isPending ? 'Sending…' : 'Send Project Inquiry'}
      </button>

      <p className="mt-4 text-center text-xs text-fg-muted" role="status">
        <OutcomeMessage outcome={outcome} />
      </p>
    </form>
  )
}

function OutcomeMessage({ outcome }: { outcome: Outcome }) {
  const emailLink = (
    <a href={`mailto:${site.email}`} className="text-blue-600 underline dark:text-blue-400">
      {site.email}
    </a>
  )

  const messages: Record<Outcome, ReactNode> = {
    idle: <>Prefer email? Write to me at {emailLink}.</>,
    sent: <span className="text-emerald-600 dark:text-emerald-400">Thanks! Your message was sent. I&apos;ll reply by email.</span>,
    'mail-app': <>Your email app should open with the message drafted. If nothing happened, email me at {emailLink}.</>,
    failed: (
      <span className="text-rose-600 dark:text-rose-400">
        Sorry, the message could not be sent. Please email me directly at {emailLink}.
      </span>
    ),
  }

  return messages[outcome]
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
  maxLength?: number
  multiline?: boolean
  className?: string
}

/** Labeled input or textarea with an accessible inline error message. */
function FormField({ label, name, error, type = 'text', multiline = false, className, ...inputProps }: FormFieldProps) {
  const errorId = `${name}-error`
  const controlProps = {
    id: name,
    name,
    required: true,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
    className: cn(
      'mt-2 block w-full rounded-lg border bg-surface-raised px-4 py-2.5 font-display text-base text-fg transition-colors placeholder:text-fg-subtle focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none sm:text-[0.95rem]',
      error ? 'border-rose-500' : 'border-line',
      multiline && 'resize-y',
    ),
    ...inputProps,
  }

  return (
    <div className={className}>
      <label htmlFor={name} className="font-mono text-xs font-medium text-fg-secondary">
        {label}
        {/* Visual cue only; screen readers announce the `required` attribute. */}
        <span className="ml-0.5 text-rose-600 dark:text-rose-400" aria-hidden="true">
          *
        </span>
      </label>
      {multiline ? <textarea rows={5} {...controlProps} /> : <input type={type} {...controlProps} />}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  )
}
