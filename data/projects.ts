// Fichier centralisé pour les projets par défaut
// Modifiez ce fichier pour ajouter/modifier des projets
// Ils seront automatiquement synchronisés avec Supabase

export interface DefaultProject {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  technologies: string[];
  github_url: string | null;
  demo_url: string | null;
}

export const defaultProjects: DefaultProject[] = [
  {
    id: "1",
    title: "STL CHR - E-commerce PrestaShop 8.2",
    description:
      "Boutique e-commerce complète pour matériel de cuisine professionnel. Développement PrestaShop 8.2 avec personnalisation de modules, rédaction de fiches produit SEO friendly, optimisation des performances (OPcache, cache, etc.) et amélioration de l'expérience utilisateur.",
    image_url: null,
    technologies: ["PrestaShop 8.2", "PHP", "Smarty", "MySQL", "SEO", "OPcache", "Performance"],
    github_url: null,
    demo_url: null,
  },
  {
    id: "2",
    title: "Garage Ottélec - WordPress Elementor Pro",
    description:
      "Site vitrine professionnel pour garage automobile développé avec WordPress et Elementor Pro. Design moderne et responsive, optimisation SEO, intégration de formulaires de contact et gestion de contenu optimisée.",
    image_url: null,
    technologies: ["WordPress", "Elementor Pro", "PHP", "CSS", "SEO", "Responsive"],
    github_url: null,
    demo_url: null,
  },
  {
    id: "3",
    title: "Omniflamme 9.0.1 - Mise à jour E-commerce",
    description:
      "Mise à jour et amélioration d'une boutique e-commerce existante avec développement de nombreux modules custom. Inclut un module innovant développé en Three.js pour une expérience 3D interactive et immersive.",
    image_url: null,
    technologies: ["PrestaShop", "PHP", "Three.js", "JavaScript", "Modules Custom", "3D"],
    github_url: null,
    demo_url: null,
  },
  {
    id: "4",
    title: "Projet Test",
    description:
      "Projet de test pour vérifier la synchronisation automatique entre le code et Supabase. Ce projet sera automatiquement ajouté à la base de données lors du prochain chargement.",
    image_url: null,
    technologies: ["Test", "Synchronisation", "Supabase"],
    github_url: null,
    demo_url: null,
  },
];

