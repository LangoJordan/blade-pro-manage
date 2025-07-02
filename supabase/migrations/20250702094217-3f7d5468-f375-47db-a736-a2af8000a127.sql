-- Insérer des données de démonstration complètes
-- 1. Créer des profils d'utilisateurs
INSERT INTO public.profiles (user_id, name, email, role, department, phone) VALUES
('11111111-1111-1111-1111-111111111111', 'Admin Principal', 'admin@scrumflow.com', 'admin', 'Direction', '+33 1 23 45 67 89'),
('22222222-2222-2222-2222-222222222222', 'Marie Dubois', 'marie.dubois@scrumflow.com', 'chef_projet', 'Développement', '+33 1 23 45 67 90'),
('33333333-3333-3333-3333-333333333333', 'Pierre Martin', 'pierre.martin@scrumflow.com', 'chef_equipe', 'Frontend', '+33 1 23 45 67 91'),
('44444444-4444-4444-4444-444444444444', 'Sophie Leroy', 'sophie.leroy@scrumflow.com', 'employe', 'Frontend', '+33 1 23 45 67 92'),
('55555555-5555-5555-5555-555555555555', 'Thomas Roux', 'thomas.roux@scrumflow.com', 'employe', 'Backend', '+33 1 23 45 67 93'),
('66666666-6666-6666-6666-666666666666', 'Client TechCorp', 'contact@techcorp.com', 'client', 'Commercial', '+33 1 23 45 67 94')
ON CONFLICT (user_id) DO NOTHING;

-- 2. Créer des clients
INSERT INTO public.clients (name, email, phone, company, address) VALUES
('TechCorp Solutions', 'contact@techcorp.com', '+33 1 40 20 30 40', 'TechCorp', '123 Avenue des Champs-Élysées, 75008 Paris'),
('StartupXYZ', 'hello@startupxyz.com', '+33 1 40 20 30 41', 'StartupXYZ Inc.', '45 Rue de Rivoli, 75004 Paris'),
('DesignCo', 'info@designco.fr', '+33 1 40 20 30 42', 'DesignCo SARL', '78 Boulevard Saint-Germain, 75006 Paris')
ON CONFLICT (email) DO NOTHING;

-- 3. Créer des équipes
INSERT INTO public.teams (name, description, leader_id) VALUES
('Équipe Frontend', 'Spécialisée dans le développement d''interfaces utilisateur modernes', '33333333-3333-3333-3333-333333333333'),
('Équipe Backend', 'Développement d''APIs et architecture serveur', '22222222-2222-2222-2222-222222222222'),
('Équipe Design', 'Conception UI/UX et identité visuelle', '22222222-2222-2222-2222-222222222222')
ON CONFLICT (name) DO NOTHING;