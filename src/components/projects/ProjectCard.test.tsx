import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import type { Project } from '@/data/projects'
import { ProjectCard } from './ProjectCard'

const baseProject: Project = {
  id: 'example',
  category: 'Web Application',
  title: 'Example App',
  description: 'An example project.',
  features: ['Feature A'],
  technologies: ['React'],
  tone: 'blue',
}

const render = (project: Partial<Project>) => renderToStaticMarkup(<ProjectCard project={{ ...baseProject, ...project }} />)

describe('ProjectCard links', () => {
  it('links to the demo and repository when both exist', () => {
    const html = render({ demoUrl: 'https://demo.example.com', repositoryUrl: 'https://github.com/me/app' })
    expect(html).toContain('href="https://demo.example.com"')
    expect(html).toContain('href="https://github.com/me/app"')
    expect(html).not.toContain('aria-disabled')
  })

  it('omits a link the project does not have', () => {
    const html = render({ repositoryUrl: 'https://github.com/me/app' })
    expect(html).not.toContain('Live Demo')
    expect(html).toContain('Source Code')
  })

  it('renders no link row when a real project has no links', () => {
    expect(render({})).not.toContain('Source Code')
  })

  it('labels placeholders and shows their links as disabled', () => {
    const html = render({ placeholder: true })
    expect(html).toContain('Placeholder')
    expect(html.match(/aria-disabled="true"/g)).toHaveLength(2)
  })

  it('shows a screenshot placeholder until a screenshot is added', () => {
    expect(render({})).toContain('Screenshot placeholder')
    expect(render({ screenshot: { src: '/images/projects/app.png', alt: 'App dashboard' } })).toContain('alt="App dashboard"')
  })
})
