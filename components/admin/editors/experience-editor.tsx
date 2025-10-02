"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { ExperienceForm } from "../forms/experience-form"
import { ExperienceList } from "../lists/experience-list"
import type { Experience } from "@/lib/db/types"

interface ExperienceEditorProps {
  userId: string
}

export function ExperienceEditor({ userId }: ExperienceEditorProps) {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadExperiences()
  }, [userId])

  const loadExperiences = async () => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .eq("user_id", userId)
        .order("display_order", { ascending: true })

      if (error) throw error
      setExperiences(data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load experiences",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()

    try {
      const { error } = await supabase.from("experiences").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Experience deleted successfully",
      })
      loadExperiences()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete experience",
        variant: "destructive",
      })
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingExperience(null)
    loadExperiences()
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
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Manage your work history and achievements</CardDescription>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ExperienceList experiences={experiences} onEdit={handleEdit} onDelete={handleDelete} />
        </CardContent>
      </Card>

      {showForm && <ExperienceForm userId={userId} experience={editingExperience} onClose={handleFormClose} />}
    </div>
  )
}
