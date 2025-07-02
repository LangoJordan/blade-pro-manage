-- Ajouter des triggers pour updated_at
CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON public.teams
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insérer des données de démonstration complètes
-- 1. Créer des profils d'utilisateurs
INSERT INTO public.profiles (user_id, name, email, role, department, phone) VALUES
('11111111-1111-1111-1111-111111111111', 'Admin Principal', 'admin@scrumflow.com', 'admin', 'Direction', '+33 1 23 45 67 89'),
('22222222-2222-2222-2222-222222222222', 'Marie Dubois', 'marie.dubois@scrumflow.com', 'chef_projet', 'Développement', '+33 1 23 45 67 90'),
('33333333-3333-3333-3333-333333333333', 'Pierre Martin', 'pierre.martin@scrumflow.com', 'chef_equipe', 'Frontend', '+33 1 23 45 67 91'),
('44444444-4444-4444-4444-444444444444', 'Sophie Leroy', 'sophie.leroy@scrumflow.com', 'employe', 'Frontend', '+33 1 23 45 67 92'),
('55555555-5555-5555-5555-555555555555', 'Thomas Roux', 'thomas.roux@scrumflow.com', 'employe', 'Backend', '+33 1 23 45 67 93'),
('66666666-6666-6666-6666-666666666666', 'Client TechCorp', 'contact@techcorp.com', 'client', 'Commercial', '+33 1 23 45 67 94');

-- 2. Créer des clients
INSERT INTO public.clients (name, email, phone, company, address) VALUES
('TechCorp Solutions', 'contact@techcorp.com', '+33 1 40 20 30 40', 'TechCorp', '123 Avenue des Champs-Élysées, 75008 Paris'),
('StartupXYZ', 'hello@startupxyz.com', '+33 1 40 20 30 41', 'StartupXYZ Inc.', '45 Rue de Rivoli, 75004 Paris'),
('DesignCo', 'info@designco.fr', '+33 1 40 20 30 42', 'DesignCo SARL', '78 Boulevard Saint-Germain, 75006 Paris');

-- 3. Créer des équipes
INSERT INTO public.teams (name, description, leader_id) VALUES
('Équipe Frontend', 'Spécialisée dans le développement d''interfaces utilisateur modernes', '33333333-3333-3333-3333-333333333333'),
('Équipe Backend', 'Développement d''APIs et architecture serveur', '22222222-2222-2222-2222-222222222222'),
('Équipe Design', 'Conception UI/UX et identité visuelle', '22222222-2222-2222-2222-222222222222');

-- 4. Ajouter des membres aux équipes
INSERT INTO public.team_members (team_id, user_id) 
SELECT teams.id, '44444444-4444-4444-4444-444444444444' FROM teams WHERE name = 'Équipe Frontend'
UNION ALL
SELECT teams.id, '33333333-3333-3333-3333-333333333333' FROM teams WHERE name = 'Équipe Frontend'
UNION ALL
SELECT teams.id, '55555555-5555-5555-5555-555555555555' FROM teams WHERE name = 'Équipe Backend'
UNION ALL
SELECT teams.id, '22222222-2222-2222-2222-222222222222' FROM teams WHERE name = 'Équipe Backend';

-- 5. Créer des projets
INSERT INTO public.projects (name, description, client_id, manager_id, team_id, status, budget, start_date, end_date, progress)
SELECT 
  'Plateforme E-commerce TechCorp',
  'Développement d''une plateforme e-commerce complète avec gestion des stocks, paiements et analytics',
  c.id,
  '22222222-2222-2222-2222-222222222222',
  t.id,
  'en_cours',
  150000,
  '2024-01-15',
  '2024-12-15',
  75
FROM clients c, teams t 
WHERE c.name = 'TechCorp Solutions' AND t.name = 'Équipe Frontend'
UNION ALL
SELECT 
  'Application Mobile StartupXYZ',
  'Application mobile React Native pour la gestion de tâches collaboratives',
  c.id,
  '22222222-2222-2222-2222-222222222222',
  t.id,
  'en_cours',
  80000,
  '2024-03-01',
  '2024-10-01',
  45
FROM clients c, teams t 
WHERE c.name = 'StartupXYZ' AND t.name = 'Équipe Backend'
UNION ALL
SELECT 
  'Refonte UI DesignCo',
  'Refonte complète de l''identité visuelle et des interfaces utilisateur',
  c.id,
  '22222222-2222-2222-2222-222222222222',
  t.id,
  'termine',
  35000,
  '2023-11-01',
  '2024-05-01',
  100
FROM clients c, teams t 
WHERE c.name = 'DesignCo' AND t.name = 'Équipe Design';

-- 6. Créer des tâches pour chaque projet
INSERT INTO public.tasks (title, description, project_id, created_by, assigned_to, status, priority, start_date, end_date, estimated_hours, actual_hours, progress)
SELECT 
  'Configuration environnement de développement',
  'Mise en place des outils de développement et de l''architecture du projet',
  p.id,
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  'termine',
  'haute',
  '2024-01-15',
  '2024-01-20',
  40,
  38,
  100
FROM projects p WHERE p.name = 'Plateforme E-commerce TechCorp'
UNION ALL
SELECT 
  'Développement catalogue produits',
  'Interface de gestion et d''affichage du catalogue produits',
  p.id,
  '22222222-2222-2222-2222-222222222222',
  '44444444-4444-4444-4444-444444444444',
  'termine',
  'haute',
  '2024-01-21',
  '2024-03-15',
  120,
  115,
  100
FROM projects p WHERE p.name = 'Plateforme E-commerce TechCorp'
UNION ALL
SELECT 
  'Intégration système de paiement',
  'Intégration Stripe pour les paiements en ligne sécurisés',
  p.id,
  '22222222-2222-2222-2222-222222222222',
  '55555555-5555-5555-5555-555555555555',
  'en_cours',
  'critique',
  '2024-03-16',
  '2024-06-30',
  80,
  45,
  60
FROM projects p WHERE p.name = 'Plateforme E-commerce TechCorp'
UNION ALL
SELECT 
  'Tests et optimisation',
  'Tests utilisateur et optimisation des performances',
  p.id,
  '22222222-2222-2222-2222-222222222222',
  '44444444-4444-4444-4444-444444444444',
  'a_faire',
  'moyenne',
  '2024-07-01',
  '2024-09-30',
  60,
  0,
  0
FROM projects p WHERE p.name = 'Plateforme E-commerce TechCorp'
UNION ALL
SELECT 
  'Conception architecture mobile',
  'Définition de l''architecture et des technologies pour l''app mobile',
  p.id,
  '22222222-2222-2222-2222-222222222222',
  '55555555-5555-5555-5555-555555555555',
  'termine',
  'haute',
  '2024-03-01',
  '2024-03-15',
  30,
  32,
  100
FROM projects p WHERE p.name = 'Application Mobile StartupXYZ'
UNION ALL
SELECT 
  'Développement interfaces utilisateur',
  'Création des écrans principaux de l''application mobile',
  p.id,
  '22222222-2222-2222-2222-222222222222',
  '44444444-4444-4444-4444-444444444444',
  'en_cours',
  'haute',
  '2024-03-16',
  '2024-07-15',
  100,
  55,
  55
FROM projects p WHERE p.name = 'Application Mobile StartupXYZ'
UNION ALL
SELECT 
  'API gestion des tâches',
  'Développement de l''API REST pour la gestion des tâches',
  p.id,
  '22222222-2222-2222-2222-222222222222',
  '55555555-5555-5555-5555-555555555555',
  'en_cours',
  'haute',
  '2024-04-01',
  '2024-08-01',
  80,
  30,
  40
FROM projects p WHERE p.name = 'Application Mobile StartupXYZ';

-- 7. Créer des notifications
INSERT INTO public.notifications (user_id, title, message, type, project_id, is_read)
SELECT 
  '22222222-2222-2222-2222-222222222222',
  'Nouveau projet assigné',
  'Vous avez été assigné comme chef de projet pour "Plateforme E-commerce TechCorp"',
  'projet',
  p.id,
  true
FROM projects p WHERE p.name = 'Plateforme E-commerce TechCorp'
UNION ALL
SELECT 
  '44444444-4444-4444-4444-444444444444',
  'Nouvelle tâche assignée',
  'Une nouvelle tâche vous a été assignée: "Développement catalogue produits"',
  'tache',
  p.id,
  false
FROM projects p WHERE p.name = 'Plateforme E-commerce TechCorp'
UNION ALL
SELECT 
  '55555555-5555-5555-5555-555555555555',
  'Échéance approchante',
  'La tâche "Intégration système de paiement" arrive à échéance dans 5 jours',
  'rappel',
  p.id,
  false
FROM projects p WHERE p.name = 'Plateforme E-commerce TechCorp';

-- 8. Créer des messages de démonstration
INSERT INTO public.messages (sender_id, receiver_id, subject, content, project_id, is_read)
SELECT 
  '22222222-2222-2222-2222-222222222222',
  '44444444-4444-4444-4444-444444444444',
  'Point sur le catalogue produits',
  'Salut Sophie, peux-tu me faire un point sur l''avancement du catalogue produits ? Le client souhaite voir une démo cette semaine.',
  p.id,
  false
FROM projects p WHERE p.name = 'Plateforme E-commerce TechCorp'
UNION ALL
SELECT 
  '44444444-4444-4444-4444-444444444444',
  '22222222-2222-2222-2222-222222222222',
  'Re: Point sur le catalogue produits',
  'Salut Marie, le catalogue est presque terminé. Je finalise les filtres de recherche et ce sera prêt pour la démo de jeudi.',
  p.id,
  true
FROM projects p WHERE p.name = 'Plateforme E-commerce TechCorp'
UNION ALL
SELECT 
  '55555555-5555-5555-5555-555555555555',
  '22222222-2222-2222-2222-222222222222',
  'Problème intégration Stripe',
  'J''ai rencontré un problème avec l''API Stripe en mode sandbox. Peux-tu m''aider à déboguer ?',
  p.id,
  false
FROM projects p WHERE p.name = 'Plateforme E-commerce TechCorp';