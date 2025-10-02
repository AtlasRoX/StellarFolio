import type { PersonalInfo, Experience, Education, Skill, Project } from "@/lib/db/types"

export async function generateDOCX(
  personalInfo: PersonalInfo,
  experiences: Experience[],
  education: Education[],
  skills: Skill[],
  projects: Project[],
): Promise<Blob> {
  // Generate HTML content for DOCX
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
          h2 { color: #1e40af; margin-top: 30px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
          h3 { color: #1e3a8a; margin-top: 20px; }
          .contact-info { margin-bottom: 20px; }
          .contact-info p { margin: 5px 0; }
          .section { margin-bottom: 30px; }
          .item { margin-bottom: 20px; }
          .item-header { display: flex; justify-content: space-between; margin-bottom: 5px; }
          .item-title { font-weight: bold; }
          .item-date { color: #6b7280; font-style: italic; }
          ul { margin: 10px 0; padding-left: 20px; }
          .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
          .skill-item { padding: 5px; background: #f3f4f6; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h1>${personalInfo.full_name}</h1>
        <div class="contact-info">
          <p><strong>${personalInfo.title}</strong></p>
          ${personalInfo.email ? `<p>Email: ${personalInfo.email}</p>` : ""}
          ${personalInfo.phone ? `<p>Phone: ${personalInfo.phone}</p>` : ""}
          ${personalInfo.location ? `<p>Location: ${personalInfo.location}</p>` : ""}
          ${personalInfo.website_url ? `<p>Website: ${personalInfo.website_url}</p>` : ""}
          ${personalInfo.linkedin_url ? `<p>LinkedIn: ${personalInfo.linkedin_url}</p>` : ""}
          ${personalInfo.github_url ? `<p>GitHub: ${personalInfo.github_url}</p>` : ""}
        </div>

        ${
          personalInfo.bio
            ? `
        <div class="section">
          <h2>Professional Summary</h2>
          <p>${personalInfo.bio}</p>
        </div>
        `
            : ""
        }

        ${
          experiences.length > 0
            ? `
        <div class="section">
          <h2>Work Experience</h2>
          ${experiences
            .map(
              (exp) => `
            <div class="item">
              <div class="item-header">
                <div>
                  <div class="item-title">${exp.title}</div>
                  <div>${exp.company}${exp.location ? ` - ${exp.location}` : ""}</div>
                </div>
                <div class="item-date">
                  ${exp.start_date} - ${exp.is_current ? "Present" : exp.end_date}
                </div>
              </div>
              ${exp.description ? `<p>${exp.description}</p>` : ""}
              ${
                exp.achievements && exp.achievements.length > 0
                  ? `
                <ul>
                  ${exp.achievements.map((achievement) => `<li>${achievement}</li>`).join("")}
                </ul>
              `
                  : ""
              }
            </div>
          `,
            )
            .join("")}
        </div>
        `
            : ""
        }

        ${
          education.length > 0
            ? `
        <div class="section">
          <h2>Education</h2>
          ${education
            .map(
              (edu) => `
            <div class="item">
              <div class="item-header">
                <div>
                  <div class="item-title">${edu.degree}</div>
                  <div>${edu.school}</div>
                </div>
                <div class="item-date">
                  ${edu.start_date} - ${edu.end_date}
                </div>
              </div>
              ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ""}
              ${edu.description ? `<p>${edu.description}</p>` : ""}
            </div>
          `,
            )
            .join("")}
        </div>
        `
            : ""
        }

        ${
          skills.length > 0
            ? `
        <div class="section">
          <h2>Skills</h2>
          <div class="skills-grid">
            ${skills.map((skill) => `<div class="skill-item">${skill.name}</div>`).join("")}
          </div>
        </div>
        `
            : ""
        }

        ${
          projects.length > 0
            ? `
        <div class="section">
          <h2>Projects</h2>
          ${projects
            .map(
              (project) => `
            <div class="item">
              <h3>${project.title}</h3>
              <p>${project.description}</p>
              ${
                project.technologies && project.technologies.length > 0
                  ? `<p><strong>Technologies:</strong> ${project.technologies.join(", ")}</p>`
                  : ""
              }
              ${
                project.highlights && project.highlights.length > 0
                  ? `
                <ul>
                  ${project.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}
                </ul>
              `
                  : ""
              }
              ${project.demo_url ? `<p><strong>Demo:</strong> ${project.demo_url}</p>` : ""}
              ${project.github_url ? `<p><strong>GitHub:</strong> ${project.github_url}</p>` : ""}
            </div>
          `,
            )
            .join("")}
        </div>
        `
            : ""
        }
      </body>
    </html>
  `

  // Convert HTML to DOCX-compatible format
  const docxContent = `
    MIME-Version: 1.0
    Content-Type: multipart/related; boundary="----=_NextPart_000_0000_01D00000.00000000"

    ------=_NextPart_000_0000_01D00000.00000000
    Content-Type: text/html; charset="utf-8"

    ${html}

    ------=_NextPart_000_0000_01D00000.00000000--
  `

  return new Blob([docxContent], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  })
}

export function downloadDOCX(blob: Blob, filename = "resume.docx") {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
