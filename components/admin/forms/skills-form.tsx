"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import type { Skill } from "@/lib/db/types"
import { X } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface SkillsFormProps {
  userId: string
  skill: Skill | null
  onClose: () => void
}

export function SkillsForm({ userId, skill, onClose }: SkillsFormProps) {
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: skill?.name || "",
    category: skill?.category || "",
    level: skill?.level || 5,
  })

  const handleSave = async () => {
    if (!formData.name || !formData.category) {
      toast({
        title: "Missing required fields",
        description: "Please fill in Name and Category.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    const supabase = createClient()

    try {
      const data = {
        ...formData,
        user_id: userId,
      }

      if (skill) {
        const { error } = await supabase
          .from("skills")
          .update({ ...data, updated_at: new Date().toISOString() })
          .eq("id", skill.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("skills").insert(data)

        if (error) throw error
      }

      toast({
        title: "Success",
        description: `Skill ${skill ? "updated" : "created"} successfully`,
      })
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${skill ? "update" : "create"} skill`,
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
          <CardTitle>{skill ? "Edit" : "Add"} Skill</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="JavaScript"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Programming Languages"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="level">Level: {formData.level}</Label>
          <Slider
            id="level"
            min={1}
            max={10}
            step={1}
            value={[formData.level]}
            onValueChange={(value) => setFormData({ ...formData, level: value[0] })}
          />
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
