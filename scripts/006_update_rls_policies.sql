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
