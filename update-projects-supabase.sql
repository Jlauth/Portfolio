-- Script pour mettre à jour les projets dans Supabase
-- Exécutez ce script dans l'éditeur SQL de votre projet Supabase

-- Supprimer les anciens projets
DELETE FROM projects;

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

