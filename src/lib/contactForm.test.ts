import { describe, expect, it } from 'vitest'
import { buildInquiryMailto, validateContactForm, type ContactFormValues } from './contactForm'

const validValues: ContactFormValues = {
  name: 'Jordan Lee',
  email: 'jordan@company.com',
  projectType: 'SaaS App',
  message: 'I need a dashboard for my team.',
}

describe('validateContactForm', () => {
  it('accepts a complete submission', () => {
    expect(validateContactForm(validValues)).toEqual({})
  })

  it('requires name, email, and a meaningful message', () => {
    const errors = validateContactForm({ name: ' ', email: '', projectType: '', message: 'hi' })
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name'])
  })

  it('rejects malformed email addresses', () => {
    expect(validateContactForm({ ...validValues, email: 'not-an-email' }).email).toMatch(/valid email/)
  })

  it('treats the project type as optional', () => {
    expect(validateContactForm({ ...validValues, projectType: '' })).toEqual({})
  })
})

describe('buildInquiryMailto', () => {
  it('encodes the subject and body for the recipient', () => {
    const url = new URL(buildInquiryMailto('me@example.com', validValues))
    expect(url.protocol).toBe('mailto:')
    expect(url.pathname).toBe('me@example.com')
    expect(url.searchParams.get('subject')).toBe('Project inquiry: SaaS App')
    expect(url.searchParams.get('body')).toContain('Name: Jordan Lee')
    expect(url.searchParams.get('body')).toContain('Email: jordan@company.com')
  })

  it('omits the project type when it was left blank', () => {
    const url = new URL(buildInquiryMailto('me@example.com', { ...validValues, projectType: '' }))
    expect(url.searchParams.get('subject')).toBe('Project inquiry')
    expect(url.searchParams.get('body')).not.toContain('Project type')
  })
})
