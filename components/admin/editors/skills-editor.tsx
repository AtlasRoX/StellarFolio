"use client"

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { SkillsForm } from "../forms/skills-form"
import { SkillsList } from "../lists/skills-list"
import type { Skill } from "@/lib/db/types"

interface SkillsEditorProps {
  userId: string
}

export function SkillsEditor({ userId }: SkillsEditorProps) {
  const [skills, setSkills] = useState<Skill[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadSkills()
  }, [userId])

  const loadSkills = async () => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .eq("user_id", userId)
        .order("display_order", { ascending: true })

      if (error) throw error
      setSkills(data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load skills",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()

    try {
      const { error } = await supabase.from("skills").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Skill deleted successfully",
      })
      loadSkills()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive",
      })
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingSkill(null)
    loadSkills()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Manage your skills and proficiency levels</CardDescription>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <SkillsList skills={skills} onEdit={handleEdit} onDelete={handleDelete} />
        </CardContent>
      </Card>

      {showForm && <SkillsForm userId={userId} skill={editingSkill} onClose={handleFormClose} />}
    </div>
  )
}
