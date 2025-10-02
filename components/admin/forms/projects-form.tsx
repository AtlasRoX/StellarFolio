"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import type { Project } from "@/lib/db/types"
import { X } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"

interface ProjectsFormProps {
  userId: string
  project: Project | null
  onClose: () => void
}

export function ProjectsForm({ userId, project, onClose }: ProjectsFormProps) {
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    long_description: project?.long_description || "",
    technologies: project?.technologies?.join(", ") || "",
    image_url: project?.image_url || "",
    github_url: project?.github_url || "",
    demo_url: project?.demo_url || "",
    is_featured: project?.is_featured || false,
  })

  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Missing required fields",
        description: "Please fill in Title and Description.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    const supabase = createClient()

    try {
      const data = {
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
        user_id: userId,
      }

      if (project) {
        const { error } = await supabase
          .from("projects")
          .update({ ...data, updated_at: new Date().toISOString() })
          .eq("id", project.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("projects").insert(data)

        if (error) throw error
      }

      toast({
        title: "Success",
        description: `Project ${project ? "updated" : "created"} successfully`,
      })
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${project ? "update" : "create"} project`,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{project ? "Edit" : "Add"} Project</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Project Alpha"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="A real-time collaborative code editor."
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="long_description">Long Description</Label>
          <Textarea
            id="long_description"
            value={formData.long_description}
            onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
            placeholder="A more detailed description of your project..."
            rows={5}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="technologies">Technologies (comma-separated)</Label>
          <Input
            id="technologies"
            value={formData.technologies}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
            placeholder="React, Node.js, PostgreSQL, AWS"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="/project-alpha.png"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github_url">GitHub URL</Label>
            <Input
              id="github_url"
              value={formData.github_url}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
              placeholder="https://github.com/janedoe/project-alpha"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="demo_url">Demo URL</Label>
          <Input
            id="demo_url"
            value={formData.demo_url}
            onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
            placeholder="https://project-alpha.dev"
          />
        </div>

        <div className="flex items-center space-x-2 pt-4">
          <Checkbox
            id="is_featured"
            checked={formData.is_featured}
            onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked as boolean })}
          />
          <Label htmlFor="is_featured">Featured Project</Label>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
