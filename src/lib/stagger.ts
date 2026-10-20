import type { CSSProperties } from 'react'

/** Delays a `data-reveal` element by its position in a list (see globals.css). */
export function stagger(index: number): CSSProperties {
  return { '--stagger': index } as CSSProperties
}
