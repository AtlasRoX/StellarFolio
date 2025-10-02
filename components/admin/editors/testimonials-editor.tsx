"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { TestimonialsForm } from "../forms/testimonials-form"
import { TestimonialsList } from "../lists/testimonials-list"
import type { Testimonial } from "@/lib/db/types"

interface TestimonialsEditorProps {
  userId: string
}

export function TestimonialsEditor({ userId }: TestimonialsEditorProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadTestimonials()
  }, [userId])

  const loadTestimonials = async () => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("user_id", userId)
        .order("display_order", { ascending: true })

      if (error) throw error
      setTestimonials(data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load testimonials",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()

    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      })
      loadTestimonials()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      })
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingTestimonial(null)
    loadTestimonials()
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
              <CardTitle>Testimonials</CardTitle>
              <CardDescription>Manage your client testimonials</CardDescription>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <TestimonialsList testimonials={testimonials} onEdit={handleEdit} onDelete={handleDelete} />
        </CardContent>
      </Card>

      {showForm && <TestimonialsForm userId={userId} testimonial={editingTestimonial} onClose={handleFormClose} />}
    </div>
  )
}
