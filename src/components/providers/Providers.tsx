'use client'

import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'
import { useCardSpotlight } from '@/hooks/useCardSpotlight'
import { useScrollReveal } from '@/hooks/useScrollReveal'

/** Page-wide client behavior: reduced-motion handling, scroll reveals, card spotlight. */
export function Providers({ children }: { children: ReactNode }) {
  useScrollReveal()
  useCardSpotlight()

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
