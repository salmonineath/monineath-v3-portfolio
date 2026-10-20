import type { Project } from '../../data/projects'
import { cn } from '../../lib/cn'
import { toneClasses } from '../../lib/tones'
import { buttonStyles } from '../ui/buttonStyles'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'
import { Tag } from '../ui/Tag'
import { ProjectPreview } from './ProjectPreview'
import { stagger } from '../../lib/stagger'

type ProjectCardProps = {
  project: Project
  /** Puts the preview on the right on large screens, alternating down the page. */
  previewOnRight?: boolean
}

export function ProjectCard({ project, previewOnRight = false }: ProjectCardProps) {
  const tone = toneClasses[project.tone]
  const titleId = `project-${project.id}-title`

  return (
    <Card
      as="article"
      aria-labelledby={titleId}
      className={cn(
        'grid overflow-hidden',
        previewOnRight ? 'lg:grid-cols-[1fr_1.4fr]' : 'lg:grid-cols-[1.4fr_1fr]',
      )}
    >
      <div
        data-reveal={previewOnRight ? 'right' : 'left'}
        style={stagger(2)}
        className={cn('min-w-0 border-line-subtle', previewOnRight ? 'lg:order-last lg:border-l' : 'lg:border-r')}
      >
        <ProjectPreview preview={project.preview} tone={project.tone} />
      </div>

      <div className="flex min-w-0 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className={cn('font-mono text-xs font-medium tracking-[0.12em] uppercase', tone.text)}>{project.category}</p>
          <p className={cn('rounded px-2 py-0.5 font-mono text-xs', tone.soft, tone.text)}>{project.status}</p>
        </div>

        <h3 id={titleId} className="mt-4 text-2xl leading-snug font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-fg-secondary">{project.description}</p>

        <h4 className="mt-6 font-mono text-xs font-medium tracking-[0.12em] text-fg-muted uppercase">
          Engineering highlights:
        </h4>
        <ul className="mt-3 space-y-2">
          {project.highlights.map((highlight, index) => (
            <li key={highlight} data-reveal="" style={stagger(index + 3)} className="flex gap-2.5 text-xs leading-relaxed text-fg-secondary">
              <Icon name="check" className={cn('mt-0.5 size-3.5 shrink-0', tone.text)} />
              {highlight}
            </li>
          ))}
        </ul>

        <ul className="mt-6 mb-6 flex flex-wrap gap-2" aria-label="Technologies">
          {project.technologies.map((technology) => (
            <li key={technology}>
              <Tag tone={project.tone}>{technology}</Tag>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3 border-t border-line-subtle pt-6 lg:mt-auto">
          <ProjectLinkButton
            label={project.demo.label}
            href={project.demo.href}
            className={buttonStyles({ size: 'sm', tone: project.tone })}
            icon="arrow-right"
            iconPosition="end"
          />
          <ProjectLinkButton
            label={project.repository.label}
            href={project.repository.href}
            className={buttonStyles({ size: 'sm', variant: 'secondary' })}
            icon="github"
            iconPosition="start"
          />
        </div>
      </div>
    </Card>
  )
}

type ProjectLinkButtonProps = {
  label: string
  href: string | undefined
  className: string
  icon: 'arrow-right' | 'github'
  iconPosition: 'start' | 'end'
}

/** Renders a real link when a URL exists, otherwise an inert "coming soon" button. */
function ProjectLinkButton({ label, href, className, icon, iconPosition }: ProjectLinkButtonProps) {
  const content = (
    <>
      {iconPosition === 'start' && <Icon name={icon} />}
      {label}
      {iconPosition === 'end' && <Icon name={icon} />}
    </>
  )

  if (!href) {
    return (
      <span
        className={cn(className, 'cursor-not-allowed opacity-50')}
        aria-disabled="true"
        title="Link coming soon"
      >
        {content}
        <span className="sr-only"> (link coming soon)</span>
      </span>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  )
}
