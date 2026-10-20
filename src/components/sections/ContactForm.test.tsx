import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { ContactForm } from './ContactForm'

describe('ContactForm', () => {
  const html = renderToStaticMarkup(<ContactForm />)

  it('associates every label with its control', () => {
    for (const id of ['name', 'email', 'projectType', 'message']) {
      expect(html).toContain(`for="${id}"`)
      expect(html).toContain(`id="${id}"`)
    }
  })

  it('renders the message as a textarea and email as an email input', () => {
    expect(html).toMatch(/<textarea[^>]*id="message"/)
    expect(html).toMatch(/<input type="email"[^>]*id="email"/)
  })

  it('starts without error messages', () => {
    expect(html).not.toContain('-error')
    expect(html).toContain('aria-invalid="false"')
  })
})
