-- Script de configuration Supabase pour le portfolio
-- Exécutez ce script dans l'éditeur SQL de votre projet Supabase

-- Table pour stocker les messages de contact
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour stocker les projets
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  technologies TEXT[],
  github_url TEXT,
  demo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion dans contacts (lecture publique, écriture publique)
CREATE POLICY "Allow public insert on contacts" ON contacts
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read on contacts" ON contacts
  FOR SELECT
  USING (true);

-- Politique pour permettre la lecture publique des projets
CREATE POLICY "Allow public read on projects" ON projects
  FOR SELECT
  USING (true);

-- Insérer quelques projets d'exemple (optionnel)
INSERT INTO projects (title, description, technologies, github_url, demo_url) VALUES
  (
    'Application E-commerce',
    'Plateforme e-commerce moderne avec paiement en ligne, gestion de panier et dashboard administrateur.',
    ARRAY['Next.js', 'TypeScript', 'Supabase', 'Stripe'],
    'https://github.com',
    'https://example.com'
  ),
  (
    'Dashboard Analytics',
    'Tableau de bord interactif pour visualiser et analyser des données en temps réel avec graphiques dynamiques.',
    ARRAY['React', 'TypeScript', 'Chart.js', 'Supabase'],
    'https://github.com',
    'https://example.com'
  ),
  (
    'Application de Gestion',
    'Application web complète pour la gestion de projets avec authentification, CRUD et notifications.',
    ARRAY['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    'https://github.com',
    'https://example.com'
  );

