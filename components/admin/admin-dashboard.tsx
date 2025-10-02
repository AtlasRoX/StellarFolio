"use client"

import { useState } from "react"
import type { User } from "@supabase/supabase-js"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LogOut, UserIcon, Briefcase, GraduationCap, Code, FolderOpen, Mail, Star } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { PersonalInfoEditor } from "./editors/personal-info-editor"
import { ExperienceEditor } from "./editors/experience-editor"
import { EducationEditor } from "./editors/education-editor"
import { SkillsEditor } from "./editors/skills-editor"
import { ProjectsEditor } from "./editors/projects-editor"
import { ServicesEditor } from "./editors/services-editor"
import { TestimonialsEditor } from "./editors/testimonials-editor"
import { ContactSubmissionsViewer } from "./viewers/contact-submissions-viewer"

interface AdminDashboardProps {
  user: User
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("personal")
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-8 mb-8">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Testimonials</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalInfoEditor userId={user.id} />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceEditor userId={user.id} />
          </TabsContent>

          <TabsContent value="education">
            <EducationEditor userId={user.id} />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsEditor userId={user.id} />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsEditor userId={user.id} />
          </TabsContent>

          <TabsContent value="services">
            <ServicesEditor userId={user.id} />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsEditor userId={user.id} />
          </TabsContent>

          <TabsContent value="contact">
            <ContactSubmissionsViewer />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
