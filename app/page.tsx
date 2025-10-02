import { ResumeView } from "@/components/resume/resume-view"
import { getPersonalInfo, getExperiences, getEducation, getSkills, getProjects, getServices, getTestimonials } from "@/lib/db/queries"

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  try {
    const personalInfo = await getPersonalInfo()

    if (!personalInfo) {
      return (
        <main className="min-h-screen">
          <ResumeView
            personalInfo={null}
            experiences={[]}
            education={[]}
            skills={[]}
            projects={[]}
            services={[]}
            testimonials={[]}
          />
        </main>
      )
    }

    const userId = personalInfo.user_id

    const [experiences, education, skills, projects, services, testimonials] = await Promise.all([
      getExperiences(userId),
      getEducation(userId),
      getSkills(userId),
      getProjects(userId),
      getServices(userId),
      getTestimonials(userId),
    ])

    return (
      <main className="min-h-screen">
        <ResumeView
          personalInfo={personalInfo}
          experiences={experiences}
          education={education}
          skills={skills}
          projects={projects}
          services={services}
          testimonials={testimonials}
        />
      </main>
    )
  } catch (error) {
    console.error("[GC] Error fetching resume data:", error)
    return (
      <main className="min-h-screen">
        <ResumeView
          personalInfo={null}
          experiences={[]}
          education={[]}
          skills={[]}
          projects={[]}
          services={[]}
          testimonials={[]}
        />
      </main>
    )
  }
}
