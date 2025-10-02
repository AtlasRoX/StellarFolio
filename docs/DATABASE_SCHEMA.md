# Database Schema Documentation

## Overview

The resume microsite uses Supabase (PostgreSQL) for data storage with Row Level Security (RLS) enabled on all tables to ensure data privacy and security.

## Tables

### profiles

Extends `auth.users` with additional profile information.

\`\`\`sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
\`\`\`

**RLS Policies:**
- Users can view their own profile
- Users can update their own profile
- Users can insert their own profile

**Triggers:**
- Auto-creates profile on user signup

---

### personal_info

Stores personal information for the resume.

\`\`\`sql
create table public.personal_info (
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
\`\`\`

**Constraints:**
- One personal_info record per user (unique constraint on user_id)

**RLS Policies:**
- Users can CRUD their own personal info

---

### experiences

Stores work experience entries.

\`\`\`sql
create table public.experiences (
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
\`\`\`

**Fields:**
- `achievements`: Array of achievement strings
- `technologies`: Array of technology names
- `display_order`: For custom ordering (lower = higher priority)
- `is_current`: Boolean flag for current position

**Indexes:**
- `experiences_user_id_idx` on user_id

**RLS Policies:**
- Users can CRUD their own experiences

---

### education

Stores educational background.

\`\`\`sql
create table public.education (
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
\`\`\`

**Indexes:**
- `education_user_id_idx` on user_id

**RLS Policies:**
- Users can CRUD their own education

---

### skills

Stores technical and soft skills.

\`\`\`sql
create table public.skills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  category text not null,
  level integer check (level >= 1 and level <= 10),
  display_order integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
\`\`\`

**Constraints:**
- `level` must be between 1 and 10

**Common Categories:**
- Frontend
- Backend
- DevOps
- Tools
- Soft Skills

**Indexes:**
- `skills_user_id_idx` on user_id

**RLS Policies:**
- Users can CRUD their own skills

---

### projects

Stores portfolio projects.

\`\`\`sql
create table public.projects (
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
\`\`\`

**Fields:**
- `description`: Short description for cards
- `long_description`: Detailed description for modals
- `technologies`: Array of technology names
- `highlights`: Array of key highlight strings
- `image_url`: URL to project screenshot/image

**Indexes:**
- `projects_user_id_idx` on user_id

**RLS Policies:**
- Users can CRUD their own projects

---

### contact_submissions

Stores contact form submissions.

\`\`\`sql
create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text default 'unread' check (status in ('unread', 'read', 'archived')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
\`\`\`

**Status Values:**
- `unread`: New submission
- `read`: Viewed by user
- `archived`: Archived/dismissed

**Indexes:**
- `contact_submissions_status_idx` on status
- `contact_submissions_created_at_idx` on created_at (descending)

**RLS Policies:**
- Anyone can insert (public contact form)
- Only authenticated users can view/update/delete

---

## Row Level Security (RLS)

All tables have RLS enabled with policies that ensure:

1. **Data Isolation**: Users can only access their own data
2. **Secure Inserts**: user_id is automatically set to auth.uid()
3. **Public Contact Form**: Anyone can submit contact forms
4. **Admin Access**: Authenticated users can manage contact submissions

### Example RLS Policy

\`\`\`sql
create policy "Users can view their own experiences"
  on public.experiences for select
  using (auth.uid() = user_id);
\`\`\`

## Migrations

Execute SQL scripts in order:

1. **001_create_profiles_table.sql**
   - Creates profiles table
   - Sets up auto-profile creation trigger

2. **002_create_resume_data_tables.sql**
   - Creates all resume data tables
   - Enables RLS and creates policies
   - Creates indexes

3. **003_create_contact_submissions_table.sql**
   - Creates contact submissions table
   - Sets up public insert policy

## Querying Data

### TypeScript Example

\`\`\`typescript
import { createClient } from '@/lib/supabase/server'

// Get user's experiences
const supabase = await createClient()
const { data, error } = await supabase
  .from('experiences')
  .select('*')
  .eq('user_id', userId)
  .order('display_order', { ascending: true })
\`\`\`

### Direct SQL Example

\`\`\`sql
-- Get all data for a user
select 
  pi.*,
  json_agg(distinct e.*) as experiences,
  json_agg(distinct ed.*) as education,
  json_agg(distinct s.*) as skills,
  json_agg(distinct p.*) as projects
from personal_info pi
left join experiences e on e.user_id = pi.user_id
left join education ed on ed.user_id = pi.user_id
left join skills s on s.user_id = pi.user_id
left join projects p on p.user_id = pi.user_id
where pi.user_id = 'user-uuid'
group by pi.id;
\`\`\`

## Backup and Recovery

### Backup

\`\`\`bash
# Using Supabase CLI
supabase db dump -f backup.sql

# Or use pg_dump
pg_dump $DATABASE_URL > backup.sql
\`\`\`

### Restore

\`\`\`bash
# Using Supabase CLI
supabase db reset

# Or use psql
psql $DATABASE_URL < backup.sql
\`\`\`

## Performance Considerations

1. **Indexes**: All foreign keys have indexes for faster joins
2. **RLS**: Policies use indexed columns (user_id, auth.uid())
3. **Ordering**: display_order field for custom sorting
4. **Timestamps**: created_at and updated_at for audit trails

## Future Enhancements

Potential schema additions:

- **certifications**: Professional certifications
- **languages**: Spoken languages with proficiency levels
- **publications**: Articles, papers, or blog posts
- **awards**: Professional awards and recognition
- **references**: Professional references
