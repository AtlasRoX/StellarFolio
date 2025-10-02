-- Add stats columns to personal_info table

alter table public.personal_info add column if not exists client_satisfaction text;
alter table public.personal_info add column if not exists avg_response_time text;
alter table public.personal_info add column if not exists starting_rate text;
