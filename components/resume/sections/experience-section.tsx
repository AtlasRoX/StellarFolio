"use client"

import { motion } from "framer-motion"
import type { ViewMode, Experience } from "../resume-view"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ExperienceSectionProps {
  viewMode: ViewMode
  experiences: Experience[]
}

export function ExperienceSection({ viewMode, experiences }: ExperienceSectionProps) {
  if (experiences.length === 0) {
    return (
      <section>
        <h2 className="text-3xl font-bold mb-6">Experience</h2>
        <p className="text-muted-foreground">
          No work experience added yet. Add your experience in the{" "}
          <a href="/admin" className="underline">
            admin panel
          </a>
          .
        </p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Experience</h2>

      <div className="space-y-6">
        {experiences.map((exp, index) => {
          const startDate = new Date(exp.start_date)
          const endDate = exp.end_date ? new Date(exp.end_date) : null
          const period = exp.is_current
            ? `${startDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })} - Present`
            : `${startDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })} - ${endDate?.toLocaleDateString("en-US", { month: "short", year: "numeric" })}`

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span>{exp.title}</span>
                    <span className="text-sm font-normal text-muted-foreground">{period}</span>
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {exp.company}
                    {exp.location && ` • ${exp.location}`}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {exp.description && <p className="leading-relaxed">{exp.description}</p>}

                  {viewMode !== "recruiter" && exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
