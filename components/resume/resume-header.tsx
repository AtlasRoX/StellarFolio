"use client"

import { motion } from "framer-motion"
import type { ViewMode, PersonalInfo } from "./resume-view"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

interface ResumeHeaderProps {
  viewMode: ViewMode
  personalInfo: PersonalInfo | null
}

export function ResumeHeader({ viewMode, personalInfo }: ResumeHeaderProps) {
  if (!personalInfo) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            No resume data found. Please go to the{" "}
            <a href="/admin" className="font-medium underline">
              admin panel
            </a>{" "}
            to add your information.
          </AlertDescription>
        </Alert>
      </motion.div>
    )
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h1 className="text-5xl font-bold mb-2 text-balance">{personalInfo.full_name}</h1>
      <p className="text-xl text-muted-foreground mb-4">{personalInfo.title}</p>

      <div className="flex flex-wrap gap-4 text-sm">
        {personalInfo.email && (
          <a href={`mailto:${personalInfo.email}`} className="hover:text-primary transition-colors">
            {personalInfo.email}
          </a>
        )}
        {personalInfo.phone && (
          <a href={`tel:${personalInfo.phone}`} className="hover:text-primary transition-colors">
            {personalInfo.phone}
          </a>
        )}
        {personalInfo.location && <span className="text-muted-foreground">{personalInfo.location}</span>}
        {personalInfo.linkedin_url && (
          <a
            href={personalInfo.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
        )}
        {personalInfo.github_url && (
          <a
            href={personalInfo.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            GitHub
          </a>
        )}
        {personalInfo.website_url && (
          <a
            href={personalInfo.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Website
          </a>
        )}
      </div>

      {viewMode === "story" && personalInfo.bio && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-6 text-muted-foreground leading-relaxed"
        >
          {personalInfo.bio}
        </motion.p>
      )}
    </motion.header>
  )
}
