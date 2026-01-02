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
  // Champs optionnels pour une meilleure présentation
  role?: string;
  date?: string;
  highlights?: string[];
  results?: string;
  category?: "ecommerce" | "website" | "seo" | "other";
  shortDescription?: string;
  // Nouveaux champs pour le positionnement PME/artisans
  context?: string;
  problem?: string;
  interventions?: string[];
  result?: string;
}

export const defaultProjects: DefaultProject[] = [
  {
    id: "1",
    title: "STL CHR - E-commerce PrestaShop 8.2",
    description:
      "Boutique e-commerce complète pour matériel de cuisine professionnel. Développement PrestaShop 8.2 avec personnalisation de modules, rédaction de fiches produit SEO friendly, optimisation des performances (OPcache, cache, etc.) et amélioration de l'expérience utilisateur.",
    shortDescription: "E-commerce PrestaShop 8.2 avec modules custom, optimisation SEO et performance.",
    image_url: null,
    technologies: ["PrestaShop 8.2", "PHP", "Smarty", "MySQL", "SEO", "OPcache"],
    github_url: null,
    demo_url: null,
    role: "Développement Full-stack & SEO",
    date: "2025",
    highlights: [
      "Personnalisation de modules PrestaShop",
      "Optimisation performance (OPcache, cache)",
      "Rédaction SEO de 200+ fiches produit"
    ],
    results: "Temps de chargement -40%",
    category: "ecommerce",
    context: "PME spécialisée dans le matériel de cuisine professionnel (CHR). Boutique e-commerce existante nécessitant une modernisation et une optimisation.",
    problem: "Site lent, version PrestaShop obsolète, temps de chargement élevés impactant les ventes, manque de visibilité SEO, base technique vieillissante.",
    interventions: [
      "Montée de version PrestaShop vers 8.2",
      "Développement et adaptation de modules custom",
      "Optimisation des performances (OPcache, cache)",
      "SEO technique et rédaction de fiches produit optimisées"
    ],
    result: "Site plus rapide et stable (-40% temps de chargement), base technique saine, meilleure visibilité SEO, back-office plus simple à gérer."
  },
  {
    id: "2",
    title: "Garage Ottélec - WordPress Elementor Pro",
    description:
      "Site vitrine professionnel pour garage automobile développé avec WordPress et Elementor Pro. Design moderne et responsive, optimisation SEO, intégration de formulaires de contact et gestion de contenu optimisée.",
    shortDescription: "Site WordPress moderne avec Elementor Pro, optimisé SEO et responsive.",
    image_url: null,
    technologies: ["WordPress", "Elementor Pro", "PHP", "CSS", "SEO"],
    github_url: null,
    demo_url: null,
    role: "Développement & SEO",
    date: "2025",
    highlights: [
      "Design responsive moderne",
      "Optimisation SEO complète",
      "Intégration formulaires de contact"
    ],
    category: "website",
    context: "Garage automobile indépendant nécessitant une présence en ligne professionnelle pour attirer de nouveaux clients.",
    problem: "Site vitrine obsolète, design daté, manque de visibilité sur les moteurs de recherche, pas de formulaire de contact fonctionnel, non responsive.",
    interventions: [
      "Développement site WordPress avec Elementor Pro",
      "Optimisation SEO technique et on-page",
      "Intégration de formulaires de contact",
      "Design responsive et moderne"
    ],
    result: "Site moderne et responsive, meilleure visibilité SEO, formulaire de contact fonctionnel, base technique saine pour l'avenir."
  },
  {
    id: "3",
    title: "Omniflamme 9.0.1 - Mise à jour E-commerce",
    description:
      "Mise à jour et amélioration d'une boutique e-commerce existante avec développement de nombreux modules custom. Inclut un module innovant développé en Three.js pour une expérience 3D interactive et immersive.",
    shortDescription: "Refonte e-commerce avec module 3D interactif en Three.js.",
    image_url: null,
    technologies: ["PrestaShop", "PHP", "Three.js", "JavaScript", "Modules Custom"],
    github_url: null,
    demo_url: null,
    role: "Développement Frontend & Backend",
    date: "2025-2026",
    highlights: [
      "Module 3D interactif (Three.js)",
      "Développement de modules custom",
      "Amélioration UX/UI"
    ],
    category: "ecommerce",
    context: "Boutique e-commerce existante nécessitant une mise à jour majeure et des améliorations significatives de l'expérience utilisateur.",
    problem: "Version PrestaShop obsolète, bugs critiques en production, UX/UI datée, manque de fonctionnalités innovantes pour se démarquer de la concurrence.",
    interventions: [
      "Mise à jour PrestaShop vers version récente",
      "Développement de modules custom",
      "Module 3D interactif (Three.js) pour expérience immersive",
      "Amélioration UX/UI et correction de bugs critiques"
    ],
    result: "Site plus rapide et stable, base technique saine, expérience utilisateur améliorée avec module 3D innovant, meilleure gestion du back-office."
  },
];

