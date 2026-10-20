import { describe, expect, it } from 'vitest'
import { buttonStyles } from './buttonStyles'

describe('buttonStyles', () => {
  it('defaults to the brand primary button', () => {
    expect(buttonStyles()).toContain('bg-primary')
  })

  it('recolors a primary button with a tone', () => {
    const classes = buttonStyles({ tone: 'emerald' })
    expect(classes).toContain('bg-emerald-600')
    expect(classes).not.toContain('bg-primary')
  })

  it('renders the secondary variant without primary colors', () => {
    const classes = buttonStyles({ variant: 'secondary', size: 'sm', className: 'extra' })
    expect(classes).toContain('border-line')
    expect(classes).toContain('h-9')
    expect(classes).not.toContain('text-white')
    expect(classes.endsWith('extra')).toBe(true)
  })
})
