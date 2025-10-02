export interface PersonalInfo {
  id: string
  user_id: string
  full_name: string
  title: string
  email: string
  phone?: string
  location?: string
  linkedin_url?: string
  github_url?: string
  website_url?: string
  bio?: string
  created_at: string
  updated_at: string
}

export interface Experience {
  id: string
  user_id: string
  title: string
  company: string
  location?: string
  start_date: string
  end_date?: string
  is_current: boolean
  description?: string
  achievements?: string[]
  technologies?: string[]
  display_order: number
  created_at: string
  updated_at: string
}

export interface Education {
  id: string
  user_id: string
  degree: string
  school: string
  location?: string
  start_date: string
  end_date?: string
  gpa?: string
  description?: string
  achievements?: string[]
  display_order: number
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  user_id: string
  name: string
  category: string
  level: number
  display_order: number
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  user_id: string
  title: string
  description: string
  long_description?: string
  technologies?: string[]
  image_url?: string
  github_url?: string
  demo_url?: string
  highlights?: string[]
  display_order: number
  created_at: string
  updated_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  status: "unread" | "read" | "archived"
  created_at: string
  updated_at: string
}
