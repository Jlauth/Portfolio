export interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  technologies: string[];
  github_url: string | null;
  demo_url: string | null;
  created_at: string;
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

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

