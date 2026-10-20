import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { navItems } from '@/data/site'
import { Header } from './Header'

describe('Header', () => {
  const html = renderToStaticMarkup(<Header />)

  it('links to every section', () => {
    for (const item of navItems) expect(html).toContain(`href="#${item.id}"`)
  })

  it('marks the first section as current before scrolling', () => {
    expect(html).toMatch(/href="#home" aria-current="location"/)
  })

  it('starts with the mobile menu closed', () => {
    expect(html).toContain('aria-expanded="false"')
    expect(html).not.toContain('id="mobile-navigation"')
  })
})
