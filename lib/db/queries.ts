import { createClient } from "@/lib/supabase/server"

export async function getPersonalInfo() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("personal_info").select("*").limit(1).single()

  if (error) throw error
  return data
}

export async function getExperiences(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .eq("user_id", userId)
    .order("display_order", { ascending: true })

  if (error) throw error
  return data
}

export async function getEducation(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .eq("user_id", userId)
    .order("display_order", { ascending: true })

  if (error) throw error
  return data
}

export async function getSkills(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("user_id", userId)
    .order("display_order", { ascending: true })

  if (error) throw error
  return data
}

export async function getProjects(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("display_order", { ascending: true })

  if (error) throw error
  return data
}

export async function getServices(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("user_id", userId)
    .order("display_order", { ascending: true })

  if (error) throw error
  return data
}

export async function getTestimonials(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("user_id", userId)
    .order("display_order", { ascending: true })

  if (error) throw error
  return data
}

export async function getContactSubmissions() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function updateContactSubmissionStatus(id: string, status: "unread" | "read" | "archived") {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("contact_submissions")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data
}
