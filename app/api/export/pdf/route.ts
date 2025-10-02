import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch resume data
    const [personalInfoResult, experiencesResult, educationResult, skillsResult, projectsResult] = await Promise.all([
      supabase.from("personal_info").select("*").eq("user_id", user.id).single(),
      supabase.from("experiences").select("*").eq("user_id", user.id).order("display_order"),
      supabase.from("education").select("*").eq("user_id", user.id).order("display_order"),
      supabase.from("skills").select("*").eq("user_id", user.id).order("display_order"),
      supabase.from("projects").select("*").eq("user_id", user.id).order("display_order"),
    ])

    // Return data for client-side PDF generation
    return NextResponse.json({
      personalInfo: personalInfoResult.data,
      experiences: experiencesResult.data || [],
      education: educationResult.data || [],
      skills: skillsResult.data || [],
      projects: projectsResult.data || [],
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
