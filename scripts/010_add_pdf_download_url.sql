-- Add pdf_download_url column to personal_info table

alter table public.personal_info add column if not exists pdf_download_url text;
