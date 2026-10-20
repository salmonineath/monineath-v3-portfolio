import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently under the header, for highlighting
 * the matching navigation link. Uses a thin detection band near the top of the
 * viewport so exactly one section is "active" at a time.
 */
export function useActiveSection<T extends string>(sectionIds: readonly T[]): T {
  const [activeId, setActiveId] = useState<T>(sectionIds[0])

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)
        const visibleId = sectionIds.find((id) => id === visibleEntry?.target.id)
        if (visibleId) {
          setActiveId(visibleId)
        }
      },
      { rootMargin: '-30% 0px -69% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
