'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { stackCategories, stackFilters, type StackCategory, type StackFilterId, type StackItem } from '@/data/stack'
import { cn } from '@/lib/cn'
import { stagger } from '@/lib/stagger'
import { toneClasses } from '@/lib/tones'
import { BrandIcon } from '../ui/BrandIcon'
import { Card } from '../ui/Card'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function StackSection() {
  const [activeFilter, setActiveFilter] = useState<StackFilterId>('all')

  const visibleCategories =
    activeFilter === 'all' ? stackCategories : stackCategories.filter((category) => category.id === activeFilter)

  return (
    <section id="stack" aria-labelledby="stack-title" className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="02"
            label="Stack"
            titleId="stack-title"
            title="Tech Stack"
            description="The technologies I work with to design, build, and ship web applications."
          />

          <div
            role="group"
            aria-label="Filter technologies by category"
            data-reveal=""
            style={stagger(2)}
            className="flex flex-wrap gap-2 lg:shrink-0 lg:flex-nowrap lg:gap-0.5 lg:rounded-xl lg:border lg:border-line lg:bg-surface lg:p-1"
          >
            {stackFilters.map((filter) => {
              const isActive = filter.id === activeFilter
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    'min-h-10 rounded-lg px-3 py-1.5 font-display text-sm font-medium whitespace-nowrap transition-colors lg:min-h-0 lg:px-2.5 lg:text-[0.8rem]',
                    isActive
                      ? 'bg-primary text-white'
                      : 'border border-line text-fg-muted hover:text-fg lg:border-transparent',
                  )}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>

        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleCategories.map((category, index) => (
              <motion.li
                key={category.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                data-reveal=""
                style={stagger(index)}
              >
                <StackCategoryCard category={category} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </Container>
    </section>
  )
}

function StackCategoryCard({ category }: { category: StackCategory }) {
  const tone = toneClasses[category.tone]

  return (
    <Card as="article" className="h-full p-5">
      <header className="flex items-center justify-between gap-3 border-b border-line-subtle pb-4">
        <h3 className={cn('font-mono text-sm font-medium tracking-[0.1em] uppercase', tone.text)}>{category.title}</h3>
        <span className={cn('shrink-0 rounded-md px-2 py-0.5 font-mono text-[0.7rem]', tone.soft, tone.text)}>
          {category.badge}
        </span>
      </header>
      <ul className="mt-4 space-y-3">
        {category.items.map((item, index) => (
          <li key={item.name} data-reveal="left" style={stagger(index + 2)}>
            <StackItemRow item={item} />
          </li>
        ))}
      </ul>
    </Card>
  )
}

function StackItemRow({ item }: { item: StackItem }) {
  return (
    <div className="group flex items-center gap-3 rounded-xl border border-line-subtle bg-surface-raised p-3 transition-colors duration-200 hover:border-line">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line-subtle bg-surface-solid text-fg transition-transform duration-200 ease-out-expo group-hover:scale-110 motion-reduce:transition-none">
        <BrandIcon name={item.icon} colored className="size-[1.125rem]" />
      </span>
      <div className="min-w-0">
        <p className="font-display text-[0.95rem] font-medium text-fg">{item.name}</p>
        <p className="text-xs text-fg-muted">{item.details}</p>
      </div>
    </div>
  )
}
