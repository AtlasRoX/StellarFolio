import { motion } from "framer-motion"
import type { ViewMode, PersonalInfo, Experience, Education, Skill, Project, Service, Testimonial } from "./resume-view"
import { ExperienceSection } from "./sections/experience-section"
import { EducationSection } from "./sections/education-section"
import { SkillsSection } from "./sections/skills-section"
import { ProjectsSection } from "./sections/projects-section"
import { DynamicTimeline } from "./interactive/dynamic-timeline"
import { ClientModeView } from "./client-mode-view"

interface ResumeContentProps {
  viewMode: ViewMode
  onViewModeChange: (viewMode: ViewMode) => void
  personalInfo: PersonalInfo | null
  experiences: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  services: Service[]
  testimonials: Testimonial[]
}

export function ResumeContent({
  viewMode,
  onViewModeChange,
  personalInfo,
  experiences,
  education,
  skills,
  projects,
  services,
  testimonials,
}: ResumeContentProps) {
  if (viewMode === "client") {
    return (
      <ClientModeView
        personalInfo={personalInfo}
        experiences={experiences}
        education={education}
        skills={skills}
        projects={projects}
        services={services}
        testimonials={testimonials}
        onViewModeChange={onViewModeChange}
      />
    )
  }

  if (viewMode === "story") {
    const timelineEvents = [
      ...experiences.map((exp) => ({
        year: exp.is_current
          ? `${new Date(exp.start_date).getFullYear()} - Present`
          : `${new Date(exp.start_date).getFullYear()} - ${exp.end_date ? new Date(exp.end_date).getFullYear() : "Present"}`,
        title: exp.title,
        company: exp.company,
        description: exp.description || "",
        achievements: exp.achievements || [],
        technologies: exp.technologies || [],
        type: "work" as const,
      })),
      ...education.map((edu) => ({
        year: edu.is_current
          ? `${new Date(edu.start_date).getFullYear()} - Present`
          : `${new Date(edu.start_date).getFullYear()} - ${edu.end_date ? new Date(edu.end_date).getFullYear() : "Present"}`,
        title: edu.degree,
        company: edu.school,
        description: edu.description || "",
        achievements: edu.achievements || [],
        technologies: [],
        type: "education" as const,
      })),
    ].sort((a, b) => {
      const aYear = Number.parseInt(a.year.split(" - ")[0])
      const bYear = Number.parseInt(b.year.split(" - ")[0])
      return bYear - aYear
    })

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <h2 className="text-3xl font-bold mb-8">My Journey</h2>
        <DynamicTimeline events={timelineEvents} />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-12"
    >
      <ExperienceSection viewMode={viewMode} experiences={experiences} />
      <SkillsSection viewMode={viewMode} skills={skills} />
      <ProjectsSection viewMode={viewMode} projects={projects} />
      <EducationSection viewMode={viewMode} education={education} />
    </motion.div>
  )
}
