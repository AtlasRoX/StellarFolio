-- Seed sample data for testing

-- Insert a sample user into auth.users
-- This is a placeholder and will not work in a real Supabase project
-- You should sign up a user in your Supabase project and use their ID.
-- For the purpose of this seed script, we will assume a user with the following ID exists.
-- The user ID used here matches the hardcoded ID in app/page.tsx.
-- In a real project, you would get the user ID from the authenticated user.

-- The following INSERT statement is for demonstration purposes and will likely fail
-- if you do not have the necessary permissions on the auth.users table.
-- It is commented out by default.
-- INSERT INTO auth.users (id, email, encrypted_password) VALUES
-- ('00000000-0000-0000-0000-000000000001', 'user@example.com', 'password');

-- Insert sample personal info
INSERT INTO public.personal_info (user_id, full_name, title, email, phone, location, linkedin_url, github_url, website_url, bio)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Jane Doe',
  'Senior Software Engineer',
  'jane.doe@example.com',
  '123-456-7890',
  'New York, USA',
  'https://www.linkedin.com/in/janedoe',
  'https://github.com/janedoe',
  'https://janedoe.dev',
  'A passionate software engineer with over 10 years of experience in building scalable and user-friendly web applications. I am proficient in a variety of programming languages and frameworks, and I am always eager to learn new things.'
);

-- Insert sample experiences
INSERT INTO public.experiences (user_id, title, company, location, start_date, end_date, is_current, description, achievements, technologies)
VALUES
(
  '00000000-0000-0000-0000-000000000001',
  'Senior Software Engineer',
  'Tech Solutions Inc.',
  'San Francisco, CA',
  '2020-01-15',
  NULL,
  TRUE,
  'Leading the development of a new cloud-based platform for data analytics. Responsible for the entire software development lifecycle, from design and implementation to deployment and maintenance.',
  ARRAY['Reduced API response time by 50%', 'Mentored and trained junior engineers', 'Successfully migrated a legacy system to a modern microservices architecture'],
  ARRAY['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker']
),
(
  '00000000-0000-0000-0000-000000000001',
  'Software Engineer',
  'Innovate Corp.',
  'Boston, MA',
  '2017-06-01',
  '2019-12-31',
  FALSE,
  'Developed and maintained a customer relationship management (CRM) system. Worked closely with product managers and designers to implement new features and improve user experience.',
  ARRAY['Improved application performance by 30%', 'Implemented a new real-time chat feature'],
  ARRAY['Angular', 'Java', 'Spring Boot', 'MySQL']
);

-- Insert sample education
INSERT INTO public.education (user_id, degree, school, location, start_date, end_date, gpa, description)
VALUES
(
  '00000000-0000-0000-0000-000000000001',
  'Master of Science in Computer Science',
  'Stanford University',
  'Stanford, CA',
  '2015-09-01',
  '2017-05-31',
  '3.9/4.0',
  'Thesis: "A Novel Approach to Real-Time Data Visualization". Coursework included advanced algorithms, machine learning, and distributed systems.'
),
(
  '00000000-0000-0000-0000-000000000001',
  'Bachelor of Science in Computer Science',
  'Massachusetts Institute of Technology (MIT)',
  'Cambridge, MA',
  '2011-09-01',
  '2015-05-31',
  '3.8/4.0',
  'Graduated with honors. Member of the ACM programming contest team.'
);

-- Insert sample skills
INSERT INTO public.skills (user_id, name, category, level)
VALUES
('00000000-0000-0000-0000-000000000001', 'JavaScript', 'Programming Languages', 9),
('00000000-0000-0000-0000-000000000001', 'TypeScript', 'Programming Languages', 9),
('00000000-0000-0000-0000-000000000001', 'Python', 'Programming Languages', 8),
('00000000-0000-0000-0000-000000000001', 'React', 'Frameworks/Libraries', 9),
('00000000-0000-0000-0000-000000000001', 'Node.js', 'Frameworks/Libraries', 9),
('00000000-0000-0000-0000-000000000001', 'PostgreSQL', 'Databases', 8),
('00000000-0000-0000-0000-000000000001', 'AWS', 'Cloud/DevOps', 8),
('00000000-0000-0000-0000-000000000001', 'Docker', 'Cloud/DevOps', 8);

-- Insert sample projects
INSERT INTO public.projects (user_id, title, description, long_description, technologies, image_url, github_url, demo_url, highlights)
VALUES
(
  '00000000-0000-0000-0000-000000000001',
  'Project Alpha',
  'A real-time collaborative code editor.',
  'Project Alpha is a web-based code editor that allows multiple users to edit the same file in real-time. It features syntax highlighting for multiple languages, code completion, and a built-in chat for collaboration.',
  ARRAY['React', 'WebSockets', 'Node.js', 'Monaco Editor'],
  '/project-alpha.png',
  'https://github.com/janedoe/project-alpha',
  'https://project-alpha.dev',
  ARRAY['Real-time collaboration using WebSockets', 'Support for over 20 programming languages', 'Scalable architecture using microservices']
),
(
  '00000000-0000-0000-0000-000000000001',
  'Project Beta',
  'An e-commerce platform for selling handmade goods.',
  'Project Beta is a full-featured e-commerce platform that allows users to create their own stores and sell handmade goods. It includes features such as product management, order processing, and a secure payment gateway.',
  ARRAY['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
  '/project-beta.png',
  'https://github.com/janedoe/project-beta',
  'https://project-beta.shop',
  ARRAY['Secure payment processing with Stripe', 'Customizable storefronts for sellers', 'Advanced product search and filtering']
);
