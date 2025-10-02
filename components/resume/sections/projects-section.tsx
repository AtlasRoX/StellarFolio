"use client"

import type { ViewMode, Project } from "../resume-view"
import { ProjectShowcase } from "../interactive/project-showcase"

interface ProjectsSectionProps {
  viewMode: ViewMode
  projects: Project[]
}

export function ProjectsSection({ viewMode, projects }: ProjectsSectionProps) {
  if (viewMode === "recruiter") {
    return null
  }

  if (projects.length === 0) {
    return (
      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Projects</h2>
        <p className="text-muted-foreground">
          No projects added yet. Add your projects in the{" "}
          <a href="/admin" className="underline">
            admin panel
          </a>
          .
        </p>
      </section>
    )
  }

  const formattedProjects = projects.map((project) => ({
    title: project.title,
    description: project.description,
    longDescription: project.description, // Using description as longDescription for now
    technologies: project.technologies || [],
    image: project.image_url || "/project-management-team.png",
    github: project.github_url || undefined,
    demo: project.url || undefined,
    highlights: [], // Could be added to database schema later
  }))

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Featured Projects</h2>
      <ProjectShowcase projects={formattedProjects} />
    </section>
  )
}
