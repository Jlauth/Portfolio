"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { getProjects } from "@/lib/supabase";
import type { Project } from "@/types";

// Projets par défaut si Supabase n'est pas configuré
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Application E-commerce",
    description:
      "Plateforme e-commerce moderne avec paiement en ligne, gestion de panier et dashboard administrateur.",
    image_url: null,
    technologies: ["Next.js", "TypeScript", "Supabase", "Stripe"],
    github_url: "https://github.com",
    demo_url: "https://example.com",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Dashboard Analytics",
    description:
      "Tableau de bord interactif pour visualiser et analyser des données en temps réel avec graphiques dynamiques.",
    image_url: null,
    technologies: ["React", "TypeScript", "Chart.js", "Supabase"],
    github_url: "https://github.com",
    demo_url: "https://example.com",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Application de Gestion",
    description:
      "Application web complète pour la gestion de projets avec authentification, CRUD et notifications.",
    image_url: null,
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    github_url: "https://github.com",
    demo_url: "https://example.com",
    created_at: new Date().toISOString(),
  },
];

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  useEffect(() => {
    // Charger les projets depuis Supabase si configuré
    const loadProjects = async () => {
      try {
        const supabaseProjects = await getProjects();
        if (supabaseProjects && supabaseProjects.length > 0) {
          setProjects(supabaseProjects);
        }
      } catch (error) {
        // Si Supabase n'est pas configuré, utiliser les projets par défaut
        console.log("Using default projects");
      }
    };

    loadProjects();
  }, []);

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Projets
          </h2>
          <p className="text-xl text-gray-300">
            Découvrez mes réalisations récentes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 group"
            >
              <div className="relative h-48 bg-gradient-to-br from-purple-600 to-blue-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    {project.title}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={20} />
                      <span>Code</span>
                    </a>
                  )}
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <ExternalLink size={20} />
                      <span>Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

