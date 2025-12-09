export interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  technologies: string[];
  github_url: string | null;
  demo_url: string | null;
  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

