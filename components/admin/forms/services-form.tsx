"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import type { Service } from "@/lib/db/types"
import { X } from "lucide-react"

interface ServicesFormProps {
  userId: string
  service: Service | null
  onClose: () => void
}

export function ServicesForm({ userId, service, onClose }: ServicesFormProps) {
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: service?.title || "",
    description: service?.description || "",
    deliverables: service?.deliverables?.join(", ") || "",
    icon: service?.icon || "",
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
        deliverables: formData.deliverables
          .split(",")
          .map((d) => d.trim())
          .filter((d) => d),
        user_id: userId,
      }

      if (service) {
        const { error } = await supabase
          .from("services")
          .update({ ...data, updated_at: new Date().toISOString() })
          .eq("id", service.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("services").insert(data)

        if (error) throw error
      }

      toast({
        title: "Success",
        description: `Service ${service ? "updated" : "created"} successfully`,
      })
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${service ? "update" : "create"} service`,
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
          <CardTitle>{service ? "Edit" : "Add"} Service</CardTitle>
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
              placeholder="Full-Stack Development"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon (Lucide name)</Label>
            <Input
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="Code2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="End-to-end web application development..."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="deliverables">Deliverables (comma-separated)</Label>
          <Textarea
            id="deliverables"
            value={formData.deliverables}
            onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
            placeholder="Responsive web apps, API development, Database design"
            rows={3}
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
