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
