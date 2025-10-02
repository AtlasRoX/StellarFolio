"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ResumeHeader } from "./resume-header"
import { ResumeContent } from "./resume-content"
import { ThemeSwitcher } from "./theme-switcher"
import { ViewModeSwitcher } from "./view-mode-switcher"
import { ExportMenu } from "./export-menu"
import { useTheme } from "@/lib/theme-provider"
import { ArrowUpRight } from "lucide-react"

export type ViewMode = "normal" | "story" | "recruiter" | "client"
export type Theme = "minimal" | "dark" | "aurora" | "glass"

export interface PersonalInfo {
  id: string
  user_id: string
  full_name: string
  title: string
  email: string
  phone: string | null
  location: string | null
  linkedin_url: string | null
  github_url: string | null
  website_url: string | null
  bio: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
  client_satisfaction: string | null
  avg_response_time: string | null
  starting_rate: string | null
}

export interface Experience {
  id: string
  user_id: string
  title: string
  company: string
  location: string | null
  start_date: string
  end_date: string | null
  is_current: boolean
  description: string | null
  achievements: string[] | null
  technologies: string[] | null
  display_order: number
  created_at: string
  updated_at: string
}

export interface Education {
  id: string
  user_id: string
  degree: string
  school: string
  location: string | null
  start_date: string
  end_date: string | null
  is_current: boolean
  description: string | null
  achievements: string[] | null
  gpa: string | null
  display_order: number
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  user_id: string
  name: string
  category: string
  proficiency_level: number
  display_order: number
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  user_id: string
  title: string
  description: string
  url: string | null
  github_url: string | null
  image_url: string | null
  technologies: string[] | null
  start_date: string | null
  end_date: string | null
  is_featured: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  user_id: string
  title: string
  description: string
  deliverables: string[] | null
  icon: string | null
  display_order: number
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  user_id: string
  name: string
  role: string
  content: string
  rating: number
  display_order: number
  created_at: string
  updated_at: string
}

interface ResumeViewProps {
  personalInfo: PersonalInfo | null
  experiences: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  services: Service[]
  testimonials: Testimonial[]
}

export function ResumeView({ personalInfo, experiences, education, skills, projects, services, testimonials }: ResumeViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("client")
  const { theme } = useTheme()

  return (
    <motion.div
      key={theme}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`resume-theme-${theme} min-h-screen transition-colors duration-500`}
    >
      {/* Floating action buttons */}
      <div className="fixed top-4 right-4 z-50 flex items-start gap-2">
        <div className="flex flex-col items-center gap-1 pt-1 pr-2">
          <p className="text-xs text-muted-foreground">select your mode</p>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
        </div>
        <ViewModeSwitcher viewMode={viewMode} onViewModeChange={setViewMode} />
        <ThemeSwitcher />
        <ExportMenu />
      </div>

      {/* Background decorations for themes */}
      <AnimatePresence mode="wait">
        {theme === "aurora" && (
          <motion.div
            key="aurora-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none overflow-hidden"
          >
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </motion.div>
        )}

        {theme === "glass" && (
          <motion.div
            key="glass-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none overflow-hidden"
          >
            <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ResumeHeader viewMode={viewMode} personalInfo={personalInfo} />
            <ResumeContent
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              personalInfo={personalInfo}
              experiences={experiences}
              education={education}
              skills={skills}
              projects={projects}
              services={services}
              testimonials={testimonials}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}