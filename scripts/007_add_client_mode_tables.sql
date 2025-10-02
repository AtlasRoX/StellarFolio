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
