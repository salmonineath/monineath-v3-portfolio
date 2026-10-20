import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { ContactForm } from './ContactForm'

describe('ContactForm', () => {
  const html = renderToStaticMarkup(<ContactForm />)

  it('associates every label with its control', () => {
    for (const id of ['name', 'email', 'message']) {
      expect(html).toContain(`for="${id}"`)
      expect(html).toContain(`id="${id}"`)
    }
  })

  it('renders project details as a textarea and email as an email input', () => {
    expect(html).toMatch(/<textarea[^>]*id="message"/)
    expect(html).toMatch(/<input type="email"[^>]*id="email"/)
  })

  it('marks every field as required', () => {
    expect(html.match(/ required=""/g)).toHaveLength(3)
    expect(html.match(/aria-hidden="true">\*<\/span>/g)).toHaveLength(3)
  })

  it('starts without error messages', () => {
    expect(html).not.toContain('-error')
    expect(html).toContain('aria-invalid="false"')
  })
})
