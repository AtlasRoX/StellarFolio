
-- ##################################################################
-- File: 001_create_profiles_table.sql
-- ##################################################################

-- Create profiles table for user management
-- This table extends auth.users with additional profile information
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Create trigger to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', null)
  )
  on conflict (id) do nothing;
  
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();


-- ##################################################################
-- File: 002_create_resume_data_tables.sql
-- ##################################################################

-- Create tables for storing resume content

-- Personal information
create table if not exists public.personal_info (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  full_name text not null,
  title text not null,
  email text not null,
  phone text,
  location text,
  linkedin_url text,
  github_url text,
  website_url text,
  bio text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id)
);

-- Work experience
create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  company text not null,
  location text,
  start_date date not null,
  end_date date,
  is_current boolean default false,
  description text,
  achievements text[],
  technologies text[],
  display_order integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Education
create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  degree text not null,
  school text not null,
  location text,
  start_date date not null,
  end_date date,
  gpa text,
  description text,
  achievements text[],
  display_order integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Skills
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  category text not null,
  level integer check (level >= 1 and level <= 10),
  display_order integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text not null,
  long_description text,
  technologies text[],
  image_url text,
  github_url text,
  demo_url text,
  highlights text[],
  display_order integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS on all tables
alter table public.personal_info enable row level security;
alter table public.experiences enable row level security;
alter table public.education enable row level security;
alter table public.skills enable row level security;
alter table public.projects enable row level security;

-- RLS Policies for personal_info
create policy "Users can view their own personal info"
  on public.personal_info for select
  using (auth.uid() = user_id);

create policy "Users can insert their own personal info"
  on public.personal_info for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own personal info"
  on public.personal_info for update
  using (auth.uid() = user_id);

create policy "Users can delete their own personal info"
  on public.personal_info for delete
  using (auth.uid() = user_id);

-- RLS Policies for experiences
create policy "Users can view their own experiences"
  on public.experiences for select
  using (auth.uid() = user_id);

create policy "Users can insert their own experiences"
  on public.experiences for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own experiences"
  on public.experiences for update
  using (auth.uid() = user_id);

create policy "Users can delete their own experiences"
  on public.experiences for delete
  using (auth.uid() = user_id);

-- RLS Policies for education
create policy "Users can view their own education"
  on public.education for select
  using (auth.uid() = user_id);

create policy "Users can insert their own education"
  on public.education for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own education"
  on public.education for update
  using (auth.uid() = user_id);

create policy "Users can delete their own education"
  on public.education for delete
  using (auth.uid() = user_id);

-- RLS Policies for skills
create policy "Users can view their own skills"
  on public.skills for select
  using (auth.uid() = user_id);

create policy "Users can insert their own skills"
  on public.skills for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own skills"
  on public.skills for update
  using (auth.uid() = user_id);

create policy "Users can delete their own skills"
  on public.skills for delete
  using (auth.uid() = user_id);

-- RLS Policies for projects
create policy "Users can view their own projects"
  on public.projects for select
  using (auth.uid() = user_id);

create policy "Users can insert their own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own projects"
  on public.projects for update
  using (auth.uid() = user_id);

create policy "Users can delete their own projects"
  on public.projects for delete
  using (auth.uid() = user_id);

-- Create indexes for better query performance
create index if not exists experiences_user_id_idx on public.experiences(user_id);
create index if not exists education_user_id_idx on public.education(user_id);
create index if not exists skills_user_id_idx on public.skills(user_id);
create index if not exists projects_user_id_idx on public.projects(user_id);


-- ##################################################################
-- File: 003_create_contact_submissions_table.sql
-- ##################################################################

-- Create table for contact form submissions
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text default 'unread' check (status in ('unread', 'read', 'archived')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.contact_submissions enable row level security;

-- Allow anyone to insert (public contact form)
create policy "Anyone can submit contact form"
  on public.contact_submissions for insert
  with check (true);

-- Only authenticated users can view submissions
create policy "Authenticated users can view all submissions"
  on public.contact_submissions for select
  using (auth.role() = 'authenticated');

-- Only authenticated users can update submissions
create policy "Authenticated users can update submissions"
  on public.contact_submissions for update
  using (auth.role() = 'authenticated');

-- Only authenticated users can delete submissions
create policy "Authenticated users can delete submissions"
  on public.contact_submissions for delete
  using (auth.role() = 'authenticated');

-- Create index for better query performance
create index if not exists contact_submissions_status_idx on public.contact_submissions(status);
create index if not exists contact_submissions_created_at_idx on public.contact_submissions(created_at desc);


-- ##################################################################
-- File: 006_update_rls_policies.sql
-- ##################################################################

-- Update RLS policies to allow public read access to resume data

-- Personal Info
DROP POLICY IF EXISTS "Users can view their own personal info" ON public.personal_info;
CREATE POLICY "Public can view personal info" ON public.personal_info FOR SELECT USING (true);

-- Experiences
DROP POLICY IF EXISTS "Users can view their own experiences" ON public.experiences;
CREATE POLICY "Public can view experiences" ON public.experiences FOR SELECT USING (true);

-- Education
DROP POLICY IF EXISTS "Users can view their own education" ON public.education;
CREATE POLICY "Public can view education" ON public.education FOR SELECT USING (true);

-- Skills
DROP POLICY IF EXISTS "Users can view their own skills" ON public.skills;
CREATE POLICY "Public can view skills" ON public.skills FOR SELECT USING (true);

-- Projects
DROP POLICY IF EXISTS "Users can view their own projects" ON public.projects;
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);


-- ##################################################################
-- File: 007_add_client_mode_tables.sql
-- ##################################################################

-- Add tables for client mode view

-- Services table
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text not null,
  deliverables text[],
  icon text,
  display_order integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Testimonials table
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  role text not null,
  content text not null,
  rating integer check (rating >= 1 and rating <= 5),
  display_order integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Add is_featured to projects table
alter table public.projects add column if not exists is_featured boolean default false;

-- Enable RLS
alter table public.services enable row level security;
alter table public.testimonials enable row level security;

-- RLS Policies for services
create policy "Public can view services" on public.services for select using (true);
create policy "Users can insert their own services" on public.services for insert with check (auth.uid() = user_id);
create policy "Users can update their own services" on public.services for update using (auth.uid() = user_id);
create policy "Users can delete their own services" on public.services for delete using (auth.uid() = user_id);

-- RLS Policies for testimonials
create policy "Public can view testimonials" on public.testimonials for select using (true);
create policy "Users can insert their own testimonials" on public.testimonials for insert with check (auth.uid() = user_id);
create policy "Users can update their own testimonials" on public.testimonials for update using (auth.uid() = user_id);
create policy "Users can delete their own testimonials" on public.testimonials for delete using (auth.uid() = user_id);


-- ##################################################################
-- File: 008_add_stats_to_personal_info.sql
-- ##################################################################

-- Add stats columns to personal_info table
alter table public.personal_info add column if not exists client_satisfaction text;
alter table public.personal_info add column if not exists avg_response_time text;
alter table public.personal_info add column if not exists starting_rate text;


-- ##################################################################
-- File: 009_add_subject_to_contact.sql
-- ##################################################################

-- Add subject column to contact_submissions table
-- Note: This was already in the create table statement, but IF NOT EXISTS prevents errors.
alter table public.contact_submissions add column if not exists subject text;


-- ##################################################################
-- File: 010_add_pdf_download_url.sql
-- ##################################################################

-- Add pdf_download_url column to personal_info table
alter table public.personal_info add column if not exists pdf_download_url text;