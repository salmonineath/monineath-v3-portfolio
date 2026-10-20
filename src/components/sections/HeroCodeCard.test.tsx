import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { HeroCodeCard } from './HeroCodeCard'

describe('HeroCodeCard', () => {
  const html = renderToStaticMarkup(<HeroCodeCard />)

  it('is hidden from assistive technology', () => {
    expect(html).toMatch(/^<div aria-hidden="true"/)
  })

  it('reserves space for the full code before typing starts', () => {
    expect(html).toContain('text-transparent')
    expect(html).toContain('Full-Stack Developer')
    expect(html).toContain('Compiling…')
  })
})
