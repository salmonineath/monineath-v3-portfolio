import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { HighlightedSql } from './HighlightedSql'

const render = (code: string) => renderToStaticMarkup(<HighlightedSql code={code} />)

describe('HighlightedSql', () => {
  it('colors comments, strings, table definitions, and constraints', () => {
    const html = render("-- note\nCREATE TABLE t (id UUID PRIMARY KEY, s TEXT DEFAULT 'x');")
    expect(html).toContain('<span class="text-code-comment">-- note</span>')
    expect(html).toContain('<span class="text-code-name">CREATE TABLE</span>')
    expect(html).toContain('<span class="text-code-keyword">PRIMARY KEY</span>')
    expect(html).toContain('<span class="text-code-keyword">DEFAULT</span>')
    expect(html).toContain('<span class="text-code-string">&#x27;x&#x27;</span>')
  })

  it('leaves plain identifiers unwrapped', () => {
    expect(render('total_cents INT')).toBe('total_cents INT')
  })
})
