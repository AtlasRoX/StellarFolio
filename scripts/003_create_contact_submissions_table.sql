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
