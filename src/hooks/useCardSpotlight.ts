import { useEffect } from 'react'

/** Feeds the mouse position to the `[data-spotlight]` card under the pointer. */
export function useCardSpotlight() {
  useEffect(() => {
    function track(event: PointerEvent) {
      if (event.pointerType !== 'mouse' || !(event.target instanceof Element)) return
      const card = event.target.closest<HTMLElement>('[data-spotlight]')
      if (!card) return
      const bounds = card.getBoundingClientRect()
      card.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`)
      card.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`)
    }

    document.addEventListener('pointermove', track, { passive: true })
    return () => document.removeEventListener('pointermove', track)
  }, [])
}
