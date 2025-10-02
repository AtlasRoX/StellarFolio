import { createClient } from "@/lib/supabase/server"

// Personal Info mutations
export async function upsertPersonalInfo(userId: string, data: any) {
  const supabase = await createClient()
  const { data: result, error } = await supabase
    .from("personal_info")
    .upsert({ ...data, user_id: userId, updated_at: new Date().toISOString() })
    .select()
    .single()

  if (error) throw error
  return result
}

// Experience mutations
export async function createExperience(userId: string, data: any) {
  const supabase = await createClient()
  const { data: result, error } = await supabase
    .from("experiences")
    .insert({ ...data, user_id: userId })
    .select()
    .single()

  if (error) throw error
  return result
}

export async function updateExperience(id: string, data: any) {
  const supabase = await createClient()
  const { data: result, error } = await supabase
    .from("experiences")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return result
}

export async function deleteExperience(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("experiences").delete().eq("id", id)

  if (error) throw error
}

// Education mutations
export async function createEducation(userId: string, data: any) {
  const supabase = await createClient()
  const { data: result, error } = await supabase
    .from("education")
    .insert({ ...data, user_id: userId })
    .select()
    .single()

  if (error) throw error
  return result
}

export async function updateEducation(id: string, data: any) {
  const supabase = await createClient()
  const { data: result, error } = await supabase
    .from("education")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return result
}

export async function deleteEducation(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("education").delete().eq("id", id)

  if (error) throw error
}

// Skill mutations
export async function createSkill(userId: string, data: any) {
  const supabase = await createClient()
  const { data: result, error } = await supabase
    .from("skills")
    .insert({ ...data, user_id: userId })
    .select()
    .single()

  if (error) throw error
  return result
}

export async function updateSkill(id: string, data: any) {
  const supabase = await createClient()
  const { data: result, error } = await supabase
    .from("skills")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return result
}

export async function deleteSkill(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("skills").delete().eq("id", id)

  if (error) throw error
}

// Project mutations
export async function createProject(userId: string, data: any) {
  const supabase = await createClient()
  const { data: result, error } = await supabase
    .from("projects")
    .insert({ ...data, user_id: userId })
    .select()
    .single()

  if (error) throw error
  return result
}

export async function updateProject(id: string, data: any) {
  const supabase = await createClient()
  const { data: result, error } = await supabase
    .from("projects")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return result
}

export async function deleteProject(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("projects").delete().eq("id", id)

  if (error) throw error
}

// Contact submission mutations
export async function createContactSubmission(data: {
  name: string
  email: string
  subject?: string
  message: string
}) {
  const supabase = await createClient()
  const { data: result, error } = await supabase.from("contact_submissions").insert(data).select().single()

  if (error) throw error
  return result
}
