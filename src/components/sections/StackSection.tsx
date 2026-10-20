import { useState } from 'react'
import { stackCategories, stackFilters, type StackCategory, type StackFilterId, type StackItem } from '../../data/stack'
import { cn } from '../../lib/cn'
import { toneClasses } from '../../lib/tones'
import { Card } from '../ui/Card'
import { Container } from '../ui/Container'
import { Icon } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'
import { stagger } from '../../lib/stagger'

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
            title="Technical Stack"
            description="Technologies I actively use to construct production-ready web experiences."
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
                    'rounded-lg px-3 py-1.5 font-display text-sm font-medium whitespace-nowrap transition-colors lg:px-2.5 lg:text-[0.8rem]',
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
          {visibleCategories.map((category, index) => (
            <li key={category.id} data-reveal="" style={stagger(index)}>
              <StackCategoryCard category={category} />
            </li>
          ))}
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
        <span className={cn('rounded-md px-2 py-0.5 font-mono text-[0.7rem]', tone.soft, tone.text)}>{category.badge}</span>
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
  const tone = toneClasses[item.tone]

  return (
    <div className="flex items-center gap-3 rounded-xl border border-line-subtle bg-surface-raised p-3">
      <span
        className={cn('grid size-8 shrink-0 place-items-center rounded-lg font-mono text-xs font-semibold', tone.soft, tone.text)}
        aria-hidden="true"
      >
        {item.logo ? <Icon name={item.logo} className="size-4" /> : item.abbreviation}
      </span>
      <div className="min-w-0">
        <p className="font-display text-[0.95rem] font-medium text-fg">{item.name}</p>
        <p className="text-xs text-fg-muted">{item.details}</p>
      </div>
    </div>
  )
}
