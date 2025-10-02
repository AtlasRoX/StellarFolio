"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import type { Skill } from "@/lib/db/types"

interface SkillsListProps {
  skills: Skill[]
  onEdit: (skill: Skill) => void
  onDelete: (id: string) => void
}

export function SkillsList({ skills, onEdit, onDelete }: SkillsListProps) {
  if (skills.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No skills added yet</p>
  }

  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <Card key={skill.id}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
                <p className="text-muted-foreground">
                  {skill.category}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${skill.level * 10}%` }}></div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => onEdit(skill)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => onDelete(skill.id)}>
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
