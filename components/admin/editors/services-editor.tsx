"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { ServicesForm } from "../forms/services-form"
import { ServicesList } from "../lists/services-list"
import type { Service } from "@/lib/db/types"

interface ServicesEditorProps {
  userId: string
}

export function ServicesEditor({ userId }: ServicesEditorProps) {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadServices()
  }, [userId])

  const loadServices = async () => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("user_id", userId)
        .order("display_order", { ascending: true })

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()

    try {
      const { error } = await supabase.from("services").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Service deleted successfully",
      })
      loadServices()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      })
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingService(null)
    loadServices()
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
              <CardTitle>Services</CardTitle>
              <CardDescription>Manage the services you offer</CardDescription>
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ServicesList services={services} onEdit={handleEdit} onDelete={handleDelete} />
        </CardContent>
      </Card>

      {showForm && <ServicesForm userId={userId} service={editingService} onClose={handleFormClose} />}
    </div>
  )
}
