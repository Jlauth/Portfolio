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
    title: "STL CHR - E-commerce PrestaShop 8.2",
    description:
      "Boutique e-commerce complète pour matériel de cuisine professionnel. Développement PrestaShop 8.2 avec personnalisation de modules, rédaction de fiches produit SEO friendly, optimisation des performances (OPcache, cache, etc.) et amélioration de l'expérience utilisateur.",
    image_url: null,
    technologies: ["PrestaShop 8.2", "PHP", "Smarty", "MySQL", "SEO", "OPcache", "Performance"],
    github_url: null,
    demo_url: null,
    created_at: new Date().toISOString(),
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
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Omniflamme - Mise à jour E-commerce",
    description:
      "Mise à jour et amélioration d'une boutique e-commerce existante avec développement de nombreux modules custom. Inclut un module innovant développé en Three.js pour une expérience 3D interactive et immersive.",
    image_url: null,
    technologies: ["PrestaShop", "PHP", "Three.js", "JavaScript", "Modules Custom", "3D"],
    github_url: null,
    demo_url: null,
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

