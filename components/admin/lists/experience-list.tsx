"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import type { Experience } from "@/lib/db/types"

interface ExperienceListProps {
  experiences: Experience[]
  onEdit: (experience: Experience) => void
  onDelete: (id: string) => void
}

export function ExperienceList({ experiences, onEdit, onDelete }: ExperienceListProps) {
  if (experiences.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No experiences added yet</p>
  }

  return (
    <div className="space-y-4">
      {experiences.map((exp) => (
        <Card key={exp.id}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{exp.title}</h3>
                <p className="text-muted-foreground">
                  {exp.company} • {exp.location}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(exp.start_date).toLocaleDateString()} -{" "}
                  {exp.is_current ? "Present" : new Date(exp.end_date!).toLocaleDateString()}
                </p>
                {exp.description && <p className="mt-2 text-sm">{exp.description}</p>}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => onEdit(exp)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => onDelete(exp.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
