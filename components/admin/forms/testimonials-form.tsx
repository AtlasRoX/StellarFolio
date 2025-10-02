"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import type { Testimonial } from "@/lib/db/types"
import { X, Star } from "lucide-react"

interface TestimonialsFormProps {
  userId: string
  testimonial: Testimonial | null
  onClose: () => void
}

export function TestimonialsForm({ userId, testimonial, onClose }: TestimonialsFormProps) {
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: testimonial?.name || "",
    role: testimonial?.role || "",
    content: testimonial?.content || "",
    rating: testimonial?.rating || 5,
  })

  const handleSave = async () => {
    if (!formData.name || !formData.role || !formData.content) {
      toast({
        title: "Missing required fields",
        description: "Please fill in Name, Role, and Content.",
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

      if (testimonial) {
        const { error } = await supabase
          .from("testimonials")
          .update({ ...data, updated_at: new Date().toISOString() })
          .eq("id", testimonial.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("testimonials").insert(data)

        if (error) throw error
      }

      toast({
        title: "Success",
        description: `Testimonial ${testimonial ? "updated" : "created"} successfully`,
      })
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${testimonial ? "update" : "create"} testimonial`,
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
          <CardTitle>{testimonial ? "Edit" : "Add"} Testimonial</CardTitle>
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
              placeholder="Sarah Johnson"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="CEO, TechStart Inc"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content *</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Exceptional work! Delivered our MVP 2 weeks ahead of schedule..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label>Rating</Label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((rate) => (
              <Button
                key={rate}
                variant="ghost"
                size="icon"
                onClick={() => setFormData({ ...formData, rating: rate })}
              >
                <Star
                  className={`h-6 w-6 ${rate <= formData.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                />
              </Button>
            ))}
          </div>
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
