import type { PersonalInfo, Experience, Education, Skill, Project } from "@/components/resume/resume-view"

export function generateMD(
  personalInfo: PersonalInfo,
  experiences: Experience[],
  education: Education[],
  skills: Skill[],
  projects: Project[]
): string {
  let md = ``

  // Personal Info
  md += `# ${personalInfo.full_name}\n`
  md += `## ${personalInfo.title}\n\n`
  md += `[Email](mailto:${personalInfo.email}) | [LinkedIn](${personalInfo.linkedin_url}) | [GitHub](${personalInfo.github_url}) | [Website](${personalInfo.website_url})\n\n`
  md += `${personalInfo.bio}\n\n`

  // Experience
  md += `## Experience\n\n`
  experiences.forEach((exp) => {
    md += `### ${exp.title} at ${exp.company}\n`
    md += `*${new Date(exp.start_date).toLocaleDateString()} - ${exp.is_current ? "Present" : new Date(exp.end_date!).toLocaleDateString()}*\n\n`
    md += `${exp.description}\n\n`
    if (exp.achievements && exp.achievements.length > 0) {
      md += `**Achievements:**\n`
      exp.achievements.forEach((ach) => {
        md += `- ${ach}\n`
      })
      md += `\n`
    }
    if (exp.technologies && exp.technologies.length > 0) {
      md += `**Technologies:** ${exp.technologies.join(", ")}\n\n`
    }
  })

  // Education
  md += `## Education\n\n`
  education.forEach((edu) => {
    md += `### ${edu.degree}, ${edu.school}\n`
    md += `*${new Date(edu.start_date).toLocaleDateString()} - ${new Date(edu.end_date!).toLocaleDateString()}*\n\n`
  })

  // Skills
  md += `## Skills\n\n`
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill.name)
    return acc
  }, {} as Record<string, string[]>)

  for (const category in skillsByCategory) {
    md += `### ${category}\n`
    md += `${skillsByCategory[category].join(", ")}\n\n`
  }

  // Projects
  md += `## Projects\n\n`
  projects.forEach((proj) => {
    md += `### [${proj.title}](${proj.github_url || proj.url})\n`
    md += `${proj.description}\n\n`
    if (proj.technologies && proj.technologies.length > 0) {
      md += `**Technologies:** ${proj.technologies.join(", ")}\n\n`
    }
  })

  return md
}

export function downloadMD(content: string, fileName: string) {
  const blob = new Blob([content], { type: "text/markdown" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}
