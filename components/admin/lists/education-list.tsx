"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import type { Education } from "@/lib/db/types"

interface EducationListProps {
  educations: Education[]
  onEdit: (education: Education) => void
  onDelete: (id: string) => void
}

export function EducationList({ educations, onEdit, onDelete }: EducationListProps) {
  if (educations.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No education added yet</p>
  }

  return (
    <div className="space-y-4">
      {educations.map((edu) => (
        <Card key={edu.id}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{edu.degree}</h3>
                <p className="text-muted-foreground">
                  {edu.school} • {edu.location}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(edu.start_date).toLocaleDateString()} -{" "}
                  {edu.end_date ? new Date(edu.end_date).toLocaleDateString() : "Present"}
                </p>
                {edu.description && <p className="mt-2 text-sm">{edu.description}</p>}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => onEdit(edu)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => onDelete(edu.id)}>
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
