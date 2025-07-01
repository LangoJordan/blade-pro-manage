-- Insert demo clients
INSERT INTO public.clients (id, name, email, phone, company, address) VALUES
  ('11111111-1111-1111-1111-111111111111', 'TechCorp', 'contact@techcorp.com', '+33123456789', 'TechCorp Solutions', '123 Avenue des Champs, Paris'),
  ('22222222-2222-2222-2222-222222222222', 'StartupXYZ', 'hello@startupxyz.com', '+33234567890', 'StartupXYZ Innovation', '456 Rue de la Innovation, Lyon'),
  ('33333333-3333-3333-3333-333333333333', 'DesignCo', 'info@designco.com', '+33345678901', 'DesignCo Creative', '789 Boulevard Créatif, Marseille');

-- Insert demo teams
INSERT INTO public.teams (id, name, description, leader_id) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Équipe Frontend', 'Développement des interfaces utilisateur', null),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Équipe Backend', 'Développement des API et bases de données', null),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Équipe Design', 'Conception UX/UI et prototypage', null),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Équipe QA', 'Tests et assurance qualité', null);

-- Insert demo projects
INSERT INTO public.projects (id, name, description, client_id, status, budget, start_date, end_date, progress) VALUES
  ('44444444-4444-4444-4444-444444444444', 'Site E-commerce TechCorp', 'Développement d''un site e-commerce moderne avec paiement en ligne et gestion des stocks', '11111111-1111-1111-1111-111111111111', 'en_cours', 50000.00, '2024-01-15', '2024-07-15', 75),
  ('55555555-5555-5555-5555-555555555555', 'Application Mobile StartupXYZ', 'Application mobile iOS/Android pour la gestion de tâches collaboratives avec notifications push', '22222222-2222-2222-2222-222222222222', 'en_cours', 75000.00, '2024-02-01', '2024-08-01', 45),
  ('66666666-6666-6666-6666-666666666666', 'Refonte UI DesignCo', 'Refonte complète de l''interface utilisateur du site web avec nouvelle charte graphique', '33333333-3333-3333-3333-333333333333', 'termine', 25000.00, '2023-11-01', '2024-03-01', 100),
  ('77777777-7777-7777-7777-777777777777', 'Système CRM TechCorp', 'Développement d''un système de gestion de la relation client personnalisé', '11111111-1111-1111-1111-111111111111', 'en_attente', 85000.00, '2024-03-01', '2024-09-01', 0),
  ('88888888-8888-8888-8888-888888888888', 'Plateforme E-learning StartupXYZ', 'Création d''une plateforme d''apprentissage en ligne avec vidéos et quiz interactifs', '22222222-2222-2222-2222-222222222222', 'en_cours', 120000.00, '2024-01-01', '2024-12-01', 30);

-- Insert demo tasks for project 1 (Site E-commerce TechCorp)
INSERT INTO public.tasks (title, description, project_id, status, priority, start_date, end_date, estimated_hours, progress) VALUES
  ('Analyse des besoins client', 'Recueillir et analyser les besoins spécifiques du client TechCorp', '44444444-4444-4444-4444-444444444444', 'termine', 'haute', '2024-01-15', '2024-01-22', 40, 100),
  ('Conception de l''architecture', 'Définir l''architecture technique de la solution e-commerce', '44444444-4444-4444-4444-444444444444', 'termine', 'haute', '2024-01-23', '2024-02-05', 60, 100),
  ('Développement du frontend', 'Création des interfaces utilisateur responsive', '44444444-4444-4444-4444-444444444444', 'en_cours', 'moyenne', '2024-02-06', '2024-04-15', 200, 80),
  ('Développement de l''API', 'Création des API REST pour la gestion des produits', '44444444-4444-4444-4444-444444444444', 'en_cours', 'haute', '2024-02-20', '2024-05-01', 150, 70),
  ('Intégration paiement', 'Intégration des solutions de paiement sécurisé', '44444444-4444-4444-4444-444444444444', 'a_faire', 'critique', '2024-05-02', '2024-05-20', 80, 0),
  ('Tests et débogage', 'Tests complets de la plateforme e-commerce', '44444444-4444-4444-4444-444444444444', 'a_faire', 'haute', '2024-06-01', '2024-06-30', 120, 0),
  ('Déploiement production', 'Mise en production et formation utilisateurs', '44444444-4444-4444-4444-444444444444', 'a_faire', 'moyenne', '2024-07-01', '2024-07-15', 40, 0);

-- Insert demo tasks for project 2 (Application Mobile StartupXYZ)
INSERT INTO public.tasks (title, description, project_id, status, priority, start_date, end_date, estimated_hours, progress) VALUES
  ('Wireframes et maquettes', 'Création des wireframes et maquettes UI/UX', '55555555-5555-5555-5555-555555555555', 'termine', 'haute', '2024-02-01', '2024-02-15', 80, 100),
  ('Configuration React Native', 'Setup de l''environnement de développement mobile', '55555555-5555-5555-5555-555555555555', 'termine', 'moyenne', '2024-02-16', '2024-02-25', 30, 100),
  ('Développement authentification', 'Système de connexion et inscription utilisateur', '55555555-5555-5555-5555-555555555555', 'en_cours', 'haute', '2024-02-26', '2024-03-15', 60, 90),
  ('Gestion des tâches', 'CRUD des tâches avec synchronisation temps réel', '55555555-5555-5555-5555-555555555555', 'en_cours', 'haute', '2024-03-16', '2024-05-01', 120, 40),
  ('Notifications push', 'Intégration des notifications push cross-platform', '55555555-5555-5555-5555-555555555555', 'a_faire', 'moyenne', '2024-05-02', '2024-06-01', 80, 0),
  ('Tests sur devices', 'Tests sur différents appareils iOS et Android', '55555555-5555-5555-5555-555555555555', 'a_faire', 'haute', '2024-06-15', '2024-07-15', 100, 0),
  ('Publication stores', 'Publication sur App Store et Google Play', '55555555-5555-5555-5555-555555555555', 'a_faire', 'moyenne', '2024-07-16', '2024-08-01', 40, 0);

-- Insert demo tasks for project 3 (Refonte UI DesignCo) - Completed project
INSERT INTO public.tasks (title, description, project_id, status, priority, start_date, end_date, estimated_hours, progress) VALUES
  ('Audit UX existant', 'Analyse de l''expérience utilisateur actuelle', '66666666-6666-6666-6666-666666666666', 'termine', 'haute', '2023-11-01', '2023-11-15', 60, 100),
  ('Nouvelle charte graphique', 'Création de la nouvelle identité visuelle', '66666666-6666-6666-6666-666666666666', 'termine', 'haute', '2023-11-16', '2023-12-15', 80, 100),
  ('Prototypage Figma', 'Création des prototypes interactifs', '66666666-6666-6666-6666-666666666666', 'termine', 'moyenne', '2023-12-16', '2024-01-15', 100, 100),
  ('Intégration HTML/CSS', 'Intégration des nouvelles maquettes', '66666666-6666-6666-6666-666666666666', 'termine', 'haute', '2024-01-16', '2024-02-15', 120, 100),
  ('Tests utilisateurs', 'Tests d''acceptation avec les utilisateurs finaux', '66666666-6666-6666-6666-666666666666', 'termine', 'moyenne', '2024-02-16', '2024-02-28', 40, 100),
  ('Mise en production', 'Déploiement de la nouvelle interface', '66666666-6666-6666-6666-666666666666', 'termine', 'critique', '2024-03-01', '2024-03-01', 20, 100);

-- Insert demo tasks for project 4 (Système CRM TechCorp) - Waiting to start
INSERT INTO public.tasks (title, description, project_id, status, priority, start_date, end_date, estimated_hours, progress) VALUES
  ('Analyse besoins CRM', 'Définition des besoins fonctionnels du CRM', '77777777-7777-7777-7777-777777777777', 'a_faire', 'haute', '2024-03-01', '2024-03-20', 80, 0),
  ('Architecture base données', 'Conception de la structure de données clients', '77777777-7777-7777-7777-777777777777', 'a_faire', 'haute', '2024-03-21', '2024-04-10', 60, 0),
  ('Développement backend CRM', 'API de gestion des contacts et opportunités', '77777777-7777-7777-7777-777777777777', 'a_faire', 'moyenne', '2024-04-11', '2024-06-30', 200, 0),
  ('Interface utilisateur CRM', 'Dashboard et formulaires de gestion client', '77777777-7777-7777-7777-777777777777', 'a_faire', 'moyenne', '2024-05-01', '2024-07-15', 150, 0),
  ('Intégration email', 'Synchronisation avec les systèmes de messagerie', '77777777-7777-7777-7777-777777777777', 'a_faire', 'faible', '2024-07-16', '2024-08-15', 80, 0),
  ('Formation équipe', 'Formation des utilisateurs au nouveau CRM', '77777777-7777-7777-7777-777777777777', 'a_faire', 'moyenne', '2024-08-16', '2024-09-01', 40, 0);

-- Insert demo tasks for project 5 (Plateforme E-learning StartupXYZ)
INSERT INTO public.tasks (title, description, project_id, status, priority, start_date, end_date, estimated_hours, progress) VALUES
  ('Spécifications plateforme', 'Cahier des charges détaillé de la plateforme', '88888888-8888-8888-8888-888888888888', 'termine', 'critique', '2024-01-01', '2024-01-31', 100, 100),
  ('Setup infrastructure', 'Configuration serveurs et environnements', '88888888-8888-8888-8888-888888888888', 'termine', 'haute', '2024-02-01', '2024-02-15', 60, 100),
  ('Système utilisateurs', 'Gestion des comptes étudiants et formateurs', '88888888-8888-8888-8888-888888888888', 'en_cours', 'haute', '2024-02-16', '2024-04-30', 120, 80),
  ('Lecteur vidéo', 'Player vidéo avec contrôles avancés', '88888888-8888-8888-8888-888888888888', 'en_cours', 'moyenne', '2024-03-01', '2024-05-31', 150, 20),
  ('Système quiz', 'Création et gestion des quiz interactifs', '88888888-8888-8888-8888-888888888888', 'a_faire', 'moyenne', '2024-06-01', '2024-08-31', 180, 0),
  ('Certificats', 'Génération automatique de certificats', '88888888-8888-8888-8888-888888888888', 'a_faire', 'faible', '2024-09-01', '2024-11-30', 80, 0),
  ('Tests et optimisation', 'Tests de charge et optimisation performances', '88888888-8888-8888-8888-888888888888', 'a_faire', 'haute', '2024-10-01', '2024-12-01', 100, 0);