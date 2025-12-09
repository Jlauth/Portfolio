-- Script pour mettre à jour les projets dans Supabase (version corrigée)
-- Exécutez ce script dans l'éditeur SQL de votre projet Supabase

-- D'abord, vérifier et créer une politique pour permettre la suppression
DROP POLICY IF EXISTS "Allow public delete on projects" ON projects;
CREATE POLICY "Allow public delete on projects" ON projects
  FOR DELETE
  USING (true);

-- Supprimer les anciens projets
DELETE FROM projects;

-- Vérifier et créer une politique pour permettre l'insertion
DROP POLICY IF EXISTS "Allow public insert on projects" ON projects;
CREATE POLICY "Allow public insert on projects" ON projects
  FOR INSERT
  WITH CHECK (true);

-- Insérer les nouveaux projets
INSERT INTO projects (title, description, technologies, github_url, demo_url) VALUES
  (
    'STL CHR - E-commerce PrestaShop 8.2',
    'Boutique e-commerce complète pour matériel de cuisine professionnel. Développement PrestaShop 8.2 avec personnalisation de modules, rédaction de fiches produit SEO friendly, optimisation des performances (OPcache, cache, etc.) et amélioration de l''expérience utilisateur.',
    ARRAY['PrestaShop 8.2', 'PHP', 'Smarty', 'MySQL', 'SEO', 'OPcache', 'Performance'],
    NULL,
    NULL
  ),
  (
    'Garage Ottélec - WordPress Elementor Pro',
    'Site vitrine professionnel pour garage automobile développé avec WordPress et Elementor Pro. Design moderne et responsive, optimisation SEO, intégration de formulaires de contact et gestion de contenu optimisée.',
    ARRAY['WordPress', 'Elementor Pro', 'PHP', 'CSS', 'SEO', 'Responsive'],
    NULL,
    NULL
  ),
  (
    'Omniflamme - Mise à jour E-commerce',
    'Mise à jour et amélioration d''une boutique e-commerce existante avec développement de nombreux modules custom. Inclut un module innovant développé en Three.js pour une expérience 3D interactive et immersive.',
    ARRAY['PrestaShop', 'PHP', 'Three.js', 'JavaScript', 'Modules Custom', '3D'],
    NULL,
    NULL
  );

-- Vérifier que les projets ont été insérés
SELECT id, title, description FROM projects ORDER BY created_at DESC;

