import { useEffect } from 'react'

/**
 * Marks `[data-reveal]` elements with `data-revealed` the first time they
 * scroll into view. Also picks up elements mounted later (e.g. when the stack
 * filter changes), so they animate in too.
 */
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-revealed', '')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    const observePending = () => {
      document.querySelectorAll('[data-reveal]:not([data-revealed])').forEach((element) => observer.observe(element))
    }

    let frame = 0
    const mutations = new MutationObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(observePending)
    })

    observePending()
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(frame)
      mutations.disconnect()
      observer.disconnect()
    }
  }, [])
}
