import { ArrowRight, Check, type LucideIcon } from 'lucide-react'
import type { Project } from '@/data/projects'
import { cn } from '@/lib/cn'
import { stagger } from '@/lib/stagger'
import { toneClasses } from '@/lib/tones'
import { BrandIcon } from '../ui/BrandIcon'
import { buttonStyles } from '../ui/buttonStyles'
import { Card } from '../ui/Card'
import { Tag } from '../ui/Tag'
import { ProjectScreenshot } from './ProjectScreenshot'

type ProjectCardProps = {
  project: Project
  /** Puts the screenshot on the right on large screens, alternating down the page. */
  screenshotOnRight?: boolean
}

export function ProjectCard({ project, screenshotOnRight = false }: ProjectCardProps) {
  const tone = toneClasses[project.tone]
  const titleId = `project-${project.id}-title`

  return (
    <Card
      as="article"
      aria-labelledby={titleId}
      className={cn(
        'group/project grid overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-fg-subtle/40 hover:shadow-2xl hover:shadow-blue-950/20',
        screenshotOnRight ? 'lg:grid-cols-[1fr_1.4fr]' : 'lg:grid-cols-[1.4fr_1fr]',
      )}
    >
      <div
        data-reveal={screenshotOnRight ? 'right' : 'left'}
        style={stagger(2)}
        className={cn('min-w-0 border-line-subtle', screenshotOnRight ? 'lg:order-last lg:border-l' : 'lg:border-r')}
      >
        <ProjectScreenshot project={project} />
      </div>

      <div className="flex min-w-0 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className={cn('font-mono text-xs font-medium tracking-[0.12em] uppercase', tone.text)}>{project.category}</p>
          {project.placeholder && (
            <p className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-xs text-amber-700 dark:text-amber-400">
              Placeholder
            </p>
          )}
        </div>

        <h3 id={titleId} className="mt-4 text-2xl leading-snug font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-fg-secondary">{project.description}</p>

        <h4 className="mt-6 font-mono text-xs font-medium tracking-[0.12em] text-fg-muted uppercase">Key features</h4>
        <ul className="mt-3 space-y-2">
          {project.features.map((feature, index) => (
            <li
              key={feature}
              data-reveal=""
              style={stagger(index + 3)}
              className="flex gap-2.5 text-sm leading-relaxed text-fg-secondary"
            >
              <Check className={cn('mt-1 size-3.5 shrink-0', tone.text)} aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <ul className="mt-6 mb-6 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.technologies.map((technology) => (
            <li key={technology}>
              <Tag tone={project.tone}>{technology}</Tag>
            </li>
          ))}
        </ul>

        <ProjectLinks project={project} />
      </div>
    </Card>
  )
}

/**
 * Real projects only show the links they have. Placeholders show both as
 * disabled buttons so the finished layout is visible.
 */
function ProjectLinks({ project }: { project: Project }) {
  const showDemo = project.demoUrl || project.placeholder
  const showRepository = project.repositoryUrl || project.placeholder
  if (!showDemo && !showRepository) return null

  return (
    <div className="flex flex-wrap gap-3 border-t border-line-subtle pt-6 lg:mt-auto">
      {showDemo && (
        <ProjectLinkButton
          label="Live Demo"
          href={project.demoUrl}
          projectTitle={project.title}
          className={buttonStyles({ size: 'sm', tone: project.tone })}
          trailingIcon={ArrowRight}
        />
      )}
      {showRepository && (
        <ProjectLinkButton
          label="Source Code"
          href={project.repositoryUrl}
          projectTitle={project.title}
          className={buttonStyles({ size: 'sm', variant: 'secondary' })}
          leadingGithubIcon
        />
      )}
    </div>
  )
}

type ProjectLinkButtonProps = {
  label: string
  href: string | undefined
  projectTitle: string
  className: string
  trailingIcon?: LucideIcon
  leadingGithubIcon?: boolean
}

function ProjectLinkButton({
  label,
  href,
  projectTitle,
  className,
  trailingIcon: TrailingIcon,
  leadingGithubIcon = false,
}: ProjectLinkButtonProps) {
  const content = (
    <>
      {leadingGithubIcon && <BrandIcon name="github" />}
      {label}
      {TrailingIcon && <TrailingIcon className="size-4" aria-hidden="true" />}
    </>
  )

  if (!href) {
    return (
      <span className={cn(className, 'cursor-not-allowed opacity-50')} aria-disabled="true" title="Link not added yet">
        {content}
        <span className="sr-only"> (link not added yet)</span>
      </span>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
      <span className="sr-only"> for {projectTitle} (opens in a new tab)</span>
    </a>
  )
}
