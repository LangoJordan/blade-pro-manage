-- First create demo users in auth.users and profiles tables
-- Note: In a real scenario, users would sign up through the app
-- For demo purposes, we'll create placeholder profiles

INSERT INTO public.profiles (user_id, name, email, role, avatar, phone, department) VALUES
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Jean Dupont', 'jean.dupont@promanage.com', 'admin', 'JD', '+33123456789', 'Direction'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Marie Martin', 'marie.martin@promanage.com', 'chef_projet', 'MM', '+33234567890', 'Gestion de projets'),
  ('00000000-0000-0000-0000-000000000001', 'Pierre Dubois', 'pierre.dubois@promanage.com', 'chef_equipe', 'PD', '+33345678901', 'Développement'),
  ('00000000-0000-0000-0000-000000000002', 'Sophie Leroy', 'sophie.leroy@promanage.com', 'employe', 'SL', '+33456789012', 'Frontend'),
  ('00000000-0000-0000-0000-000000000003', 'Client TechCorp', 'client@techcorp.com', 'client', 'CT', '+33567890123', 'Client'),
  ('00000000-0000-0000-0000-000000000004', 'Lucas Bernard', 'lucas.bernard@promanage.com', 'employe', 'LB', '+33678901234', 'Backend'),
  ('00000000-0000-0000-0000-000000000005', 'Emma Rousseau', 'emma.rousseau@promanage.com', 'employe', 'ER', '+33789012345', 'Design'),
  ('00000000-0000-0000-0000-000000000006', 'Thomas Moreau', 'thomas.moreau@promanage.com', 'employe', 'TM', '+33890123456', 'QA');

-- Update teams with leaders
UPDATE public.teams SET leader_id = 'ffffffff-ffff-ffff-ffff-ffffffffffff' WHERE id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
UPDATE public.teams SET leader_id = '00000000-0000-0000-0000-000000000001' WHERE id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
UPDATE public.teams SET leader_id = '00000000-0000-0000-0000-000000000005' WHERE id = 'cccccccc-cccc-cccc-cccc-cccccccccccc';
UPDATE public.teams SET leader_id = '00000000-0000-0000-0000-000000000006' WHERE id = 'dddddddd-dddd-dddd-dddd-dddddddddddd';

-- Add team members
INSERT INTO public.team_members (team_id, user_id) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'ffffffff-ffff-ffff-ffff-ffffffffffff'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000002'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000001'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000004'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '00000000-0000-0000-0000-000000000005'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '00000000-0000-0000-0000-000000000006');

-- Update projects with managers and teams
UPDATE public.projects SET manager_id = 'ffffffff-ffff-ffff-ffff-ffffffffffff', team_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' WHERE id = '44444444-4444-4444-4444-444444444444';
UPDATE public.projects SET manager_id = 'ffffffff-ffff-ffff-ffff-ffffffffffff', team_id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' WHERE id = '55555555-5555-5555-5555-555555555555';
UPDATE public.projects SET manager_id = '00000000-0000-0000-0000-000000000001', team_id = 'cccccccc-cccc-cccc-cccc-cccccccccccc' WHERE id = '66666666-6666-6666-6666-666666666666';
UPDATE public.projects SET manager_id = 'ffffffff-ffff-ffff-ffff-ffffffffffff', team_id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' WHERE id = '77777777-7777-7777-7777-777777777777';
UPDATE public.projects SET manager_id = 'ffffffff-ffff-ffff-ffff-ffffffffffff', team_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' WHERE id = '88888888-8888-8888-8888-888888888888';