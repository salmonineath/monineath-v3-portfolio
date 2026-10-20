'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

/** Slow vertical drift for the hero portrait. Disabled under reduced motion (see Providers). */
export function FloatingFrame({ children }: { children: ReactNode }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
    >
      {children}
    </motion.div>
  )
}
