import { ExternalLink } from 'lucide-react'
import { projects } from '@/data/projects'
import { site } from '@/data/site'
import { stagger } from '@/lib/stagger'
import { ProjectCard } from '../projects/ProjectCard'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="04"
            label="Portfolio"
            titleId="projects-title"
            title="Featured Projects"
            description="A selection of things I have built, from the database to the interface."
          />
          <a
            href={site.github.repositoriesHref}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal=""
            style={stagger(3)}
            className="flex min-h-10 items-center gap-2 self-start font-mono text-xs font-medium text-blue-600 hover:underline md:self-auto dark:text-blue-400"
          >
            Browse all repositories on GitHub
            <span className="sr-only"> (opens in a new tab)</span>
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        </div>

        <ul className="mt-10 space-y-14">
          {projects.map((project, index) => (
            <li key={project.id} data-reveal="scale">
              <ProjectCard project={project} screenshotOnRight={index % 2 === 1} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
