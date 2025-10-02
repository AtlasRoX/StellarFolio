"use client"

import { motion } from "framer-motion"
import type { ViewMode, Education } from "../resume-view"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface EducationSectionProps {
  viewMode: ViewMode
  education: Education[]
}

export function EducationSection({ viewMode, education }: EducationSectionProps) {
  if (education.length === 0) {
    return (
      <section>
        <h2 className="text-3xl font-bold mb-6">Education</h2>
        <p className="text-muted-foreground">
          No education added yet. Add your education in the{" "}
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
      <h2 className="text-3xl font-bold mb-6">Education</h2>

      <div className="space-y-4">
        {education.map((edu, index) => {
          const startDate = new Date(edu.start_date)
          const endDate = edu.end_date ? new Date(edu.end_date) : null
          const period = edu.is_current
            ? `${startDate.getFullYear()} - Present`
            : `${startDate.getFullYear()} - ${endDate?.getFullYear()}`

          return (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span>{edu.degree}</span>
                    <span className="text-sm font-normal text-muted-foreground">{period}</span>
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {edu.institution}
                    {edu.location && ` • ${edu.location}`}
                  </p>
                </CardHeader>

                {viewMode !== "recruiter" &&
                  (edu.gpa || edu.description || (edu.achievements && edu.achievements.length > 0)) && (
                    <CardContent className="space-y-2">
                      {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                      {edu.description && <p className="text-sm leading-relaxed">{edu.description}</p>}
                      {edu.achievements && edu.achievements.length > 0 && (
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {edu.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  )}
              </Card>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
