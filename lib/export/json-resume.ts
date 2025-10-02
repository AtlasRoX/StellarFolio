import type { PersonalInfo, Experience, Education, Skill, Project } from "@/lib/db/types"

interface JSONResumeSchema {
  basics: {
    name: string
    label: string
    email: string
    phone?: string
    url?: string
    summary?: string
    location?: {
      city?: string
      countryCode?: string
      region?: string
    }
    profiles?: Array<{
      network: string
      username?: string
      url: string
    }>
  }
  work?: Array<{
    name: string
    position: string
    startDate: string
    endDate?: string
    summary?: string
    highlights?: string[]
  }>
  education?: Array<{
    institution: string
    area: string
    studyType: string
    startDate: string
    endDate?: string
    score?: string
  }>
  skills?: Array<{
    name: string
    level: string
    keywords?: string[]
  }>
  projects?: Array<{
    name: string
    description: string
    highlights?: string[]
    keywords?: string[]
    url?: string
    roles?: string[]
  }>
}

export function generateJSONResume(
  personalInfo: PersonalInfo,
  experiences: Experience[],
  education: Education[],
  skills: Skill[],
  projects: Project[],
): JSONResumeSchema {
  const profiles = []

  if (personalInfo.linkedin_url) {
    profiles.push({
      network: "LinkedIn",
      url: personalInfo.linkedin_url,
    })
  }

  if (personalInfo.github_url) {
    profiles.push({
      network: "GitHub",
      url: personalInfo.github_url,
    })
  }

  const resume: JSONResumeSchema = {
    basics: {
      name: personalInfo.full_name,
      label: personalInfo.title,
      email: personalInfo.email,
      phone: personalInfo.phone,
      url: personalInfo.website_url,
      summary: personalInfo.bio,
      profiles: profiles.length > 0 ? profiles : undefined,
    },
    work: experiences.map((exp) => ({
      name: exp.company,
      position: exp.title,
      startDate: exp.start_date,
      endDate: exp.is_current ? undefined : exp.end_date,
      summary: exp.description,
      highlights: exp.achievements,
    })),
    education: education.map((edu) => ({
      institution: edu.school,
      area: edu.degree,
      studyType: "Bachelor",
      startDate: edu.start_date,
      endDate: edu.end_date,
      score: edu.gpa,
    })),
    skills: skills.map((skill) => ({
      name: skill.name,
      level: getLevelLabel(skill.level),
      keywords: [skill.category],
    })),
    projects: projects.map((project) => ({
      name: project.title,
      description: project.description,
      highlights: project.highlights,
      keywords: project.technologies,
      url: project.demo_url || project.github_url,
    })),
  }

  return resume
}

function getLevelLabel(level: number): string {
  if (level >= 9) return "Expert"
  if (level >= 7) return "Advanced"
  if (level >= 5) return "Intermediate"
  if (level >= 3) return "Beginner"
  return "Novice"
}

export function downloadJSONResume(resume: JSONResumeSchema, filename = "resume.json") {
  const blob = new Blob([JSON.stringify(resume, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
