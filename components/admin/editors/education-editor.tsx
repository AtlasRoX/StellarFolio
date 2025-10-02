"use client"

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { EducationForm } from "../forms/education-form"
import { EducationList } from "../lists/education-list"
import type { Education } from "@/lib/db/types"

interface EducationEditorProps {
  userId: string
}

export function EducationEditor({ userId }: EducationEditorProps) {
  const [educations, setEducations] = useState<Education[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadEducations()
  }, [userId])

  const loadEducations = async () => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from("education")
        .select("*")
        .eq("user_id", userId)
        .order("display_order", { ascending: true })

      if (error) throw error
      setEducations(data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load education",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (education: Education) => {
    setEditingEducation(education)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()

    try {
      const { error } = await supabase.from("education").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Education deleted successfully",
      })
      loadEducations()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete education",
        variant: "destructive",
      })
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingEducation(null)
    loadEducations()
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
              <CardTitle>Education</CardTitle>
              <CardDescription>Manage your education history</CardDescription>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <EducationList educations={educations} onEdit={handleEdit} onDelete={handleDelete} />
        </CardContent>
      </Card>

      {showForm && <EducationForm userId={userId} education={editingEducation} onClose={handleFormClose} />}
    </div>
  )
}
