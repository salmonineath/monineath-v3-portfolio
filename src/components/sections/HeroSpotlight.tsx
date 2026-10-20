'use client'

import type { PointerEvent, ReactNode } from 'react'

/** Moves the grid spotlight to the pointer. Writes CSS vars directly to skip re-renders. */
function trackPointer(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== 'mouse') return
  const bounds = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`)
  event.currentTarget.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`)
}

/** The hero `<section>`: ambient grid background plus a brighter grid that follows the mouse. */
export function HeroSpotlight({ children }: { children: ReactNode }) {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      onPointerMove={trackPointer}
      className="group/hero bg-hero relative overflow-hidden [--spot-x:50%] [--spot-y:-300px]"
    >
      <div
        aria-hidden="true"
        className="hero-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/hero:opacity-100 motion-reduce:hidden"
      />
      {children}
    </section>
  )
}
