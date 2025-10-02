"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

interface PersonalInfoEditorProps {
  userId: string
}

export function PersonalInfoEditor({ userId }: PersonalInfoEditorProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    full_name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin_url: "",
    github_url: "",
    website_url: "",
    bio: "",
    client_satisfaction: "",
    avg_response_time: "",
    starting_rate: "",
    pdf_download_url: "",
  })

  useEffect(() => {
    loadPersonalInfo()
  }, [userId])

  const loadPersonalInfo = async () => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const { data, error } = await supabase.from("personal_info").select("*").eq("user_id", userId).single()

      if (error && error.code !== "PGRST116") throw error

      if (data) {
        setFormData({
          full_name: data.full_name || "",
          title: data.title || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
          linkedin_url: data.linkedin_url || "",
          github_url: data.github_url || "",
          website_url: data.website_url || "",
          bio: data.bio || "",
          client_satisfaction: data.client_satisfaction || "",
          avg_response_time: data.avg_response_time || "",
          starting_rate: data.starting_rate || "",
          pdf_download_url: data.pdf_download_url || "",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load personal information",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("personal_info")
        .upsert({ ...formData, user_id: userId, updated_at: new Date().toISOString() }, { onConflict: "user_id" })

      if (error) throw error

      toast({
        title: "Success",
        description: "Personal information saved successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save personal information",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details and contact information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              placeholder="FahAd"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Professional Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Senior Full-Stack Engineer"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (234) 567-890"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="San Francisco, CA"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin_url">LinkedIn URL</Label>
            <Input
              id="linkedin_url"
              value={formData.linkedin_url}
              onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github_url">GitHub URL</Label>
            <Input
              id="github_url"
              value={formData.github_url}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
              placeholder="https://github.com/johndoe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website_url">Website URL</Label>
            <Input
              id="website_url"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              placeholder="https://johndoe.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pdf_download_url">PDF Download URL</Label>
            <Input
              id="pdf_download_url"
              value={formData.pdf_download_url}
              onChange={(e) => setFormData({ ...formData, pdf_download_url: e.target.value })}
              placeholder="https://example.com/resume.pdf"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="A brief description about yourself..."
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="client_satisfaction">Client Satisfaction</Label>
            <Input
              id="client_satisfaction"
              value={formData.client_satisfaction}
              onChange={(e) => setFormData({ ...formData, client_satisfaction: e.target.value })}
              placeholder="4.9/5"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avg_response_time">Avg. Response Time</Label>
            <Input
              id="avg_response_time"
              value={formData.avg_response_time}
              onChange={(e) => setFormData({ ...formData, avg_response_time: e.target.value })}
              placeholder="< 2hrs"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="starting_rate">Starting Rate</Label>
            <Input
              id="starting_rate"
              value={formData.starting_rate}
              onChange={(e) => setFormData({ ...formData, starting_rate: e.target.value })}
              placeholder="$75/hr"
            />
          </div>
        </div>

        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  )
}
