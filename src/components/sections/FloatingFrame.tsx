'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type FloatingFrameProps = {
  children: ReactNode
  className?: string
  /** Vertical travel in px. */
  distance?: number
  duration?: number
  /** Offsets the cycle so neighboring elements drift out of sync. */
  delay?: number
}

/** Slow vertical drift for hero decorations. Disabled under reduced motion (see Providers). */
export function FloatingFrame({ children, className, distance = 8, duration = 6, delay = 0 }: FloatingFrameProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -distance, 0] }}
      transition={{ duration, delay, ease: 'easeInOut', repeat: Infinity }}
    >
      {children}
    </motion.div>
  )
}
