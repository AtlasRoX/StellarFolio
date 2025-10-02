"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, FileText, FileJson } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { generateJSONResume, downloadJSONResume } from "@/lib/export/json-resume"
import { generateMD, downloadMD } from "@/lib/export/md-generator"
import { downloadPDF } from "@/lib/export/pdf-generator"

export function ExportMenu() {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const fetchResumeData = async () => {
    const supabase = createClient()

    try {
      const { data: personalInfo, error: personalError } = await supabase
        .from("personal_info")
        .select("*")
        .limit(1)
        .single()

      if (personalError || !personalInfo) {
        throw new Error("No resume data found. Please add your information in the admin panel first.")
      }

      const userId = personalInfo.user_id

      const [experiencesResult, educationResult, skillsResult, projectsResult] = await Promise.all([
        supabase.from("experiences").select("*").eq("user_id", userId).order("display_order"),
        supabase.from("education").select("*").eq("user_id", userId).order("display_order"),
        supabase.from("skills").select("*").eq("user_id", userId).order("display_order"),
        supabase.from("projects").select("*").eq("user_id", userId).order("display_order"),
      ])

      return {
        personalInfo,
        experiences: experiencesResult.data || [],
        education: educationResult.data || [],
        skills: skillsResult.data || [],
        projects: projectsResult.data || [],
      }
    } catch (error) {
      console.error("[GC] Export error:", error)
      throw error
    }
  }

  const handleExport = async (format: "pdf" | "md" | "json") => {
    setIsExporting(true)

    try {
      const data = await fetchResumeData()

      if (!data.personalInfo) {
        toast({
          title: "No Data",
          description: "Please add your personal information in the admin panel first",
          variant: "destructive",
        })
        return
      }

      const fileName = data.personalInfo.full_name.replace(/\s+/g, "_")

      switch (format) {
        case "json":
          const jsonResume = generateJSONResume(
            data.personalInfo,
            data.experiences,
            data.education,
            data.skills,
            data.projects,
          )
          downloadJSONResume(jsonResume, `${fileName}_resume.json`)
          break

        case "md":
          const md = generateMD(
            data.personalInfo,
            data.experiences,
            data.education,
            data.skills,
            data.projects,
          )
          downloadMD(md, `${fileName}_resume.md`)
          break

        case "pdf":
          if (data.personalInfo.pdf_download_url) {
            window.open(data.personalInfo.pdf_download_url, "_blank")
          } else {
            downloadPDF(`${fileName}_resume.pdf`)
          }
          break
      }

      toast({
        title: "Export Successful",
        description: `Your resume has been exported as ${format.toUpperCase()}`,
      })
    } catch (error) {
      console.error("[GC] Export failed:", error)
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : "There was an error exporting your resume",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="backdrop-blur-sm bg-background/50" disabled={isExporting}>
          <Download className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Export Resume</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleExport("pdf")} className="cursor-pointer">
          <FileText className="mr-2 h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("md")} className="cursor-pointer">
          <FileText className="mr-2 h-4 w-4" />
          Export as MD
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("json")} className="cursor-pointer">
          <FileJson className="mr-2 h-4 w-4" />
          Export as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
