"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Calendar, TrendingUp, Code } from "lucide-react";
import { useEffect, useState } from "react";
import { getProjects } from "@/lib/supabase";
import type { Project } from "@/types";
import { defaultProjects as defaultProjectsData } from "@/data/projects";

// Convertir les projets par défaut au format Project
const defaultProjects: Project[] = defaultProjectsData.map((p) => ({
  ...p,
  created_at: new Date().toISOString(),
}));

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [isInitialized, setIsInitialized] = useState(true);

  useEffect(() => {
    // Synchroniser les projets du code avec Supabase au premier chargement
    const syncAndLoadProjects = async () => {
      try {
        // Synchroniser les projets du code avec Supabase
        await fetch("/api/sync-projects", { method: "POST" });
        
        // Charger les projets depuis Supabase
        const supabaseProjects = await getProjects();
        if (supabaseProjects && supabaseProjects.length > 0) {
          // Filtrer les projets "Test" au cas où
          const filteredProjects = supabaseProjects.filter((project) => {
            const title = project.title || "";
            const isTest = /\btest\b/i.test(title) || title.toLowerCase() === "projet test";
            return !isTest;
          });
          
          // Supprimer les doublons basés sur le titre (garder le premier)
          const seenTitles = new Set<string>();
          const uniqueProjects = filteredProjects.filter((project) => {
            const title = project.title;
            const normalizedTitle = title.toLowerCase().trim();
            
            // Détecter les doublons Omniflamme (avec ou sans version)
            if (normalizedTitle.includes("omniflamme")) {
              if (seenTitles.has("omniflamme")) {
                return false; // Doublon, on l'exclut
              }
              // Garder seulement "Omniflamme 9.0.1 - Mise à jour E-commerce"
              if (title === "Omniflamme 9.0.1 - Mise à jour E-commerce") {
                seenTitles.add("omniflamme");
                seenTitles.add(title);
                return true;
              }
              // Exclure les autres variantes d'Omniflamme
              return false;
            }
            
            if (seenTitles.has(title)) {
              return false; // Doublon, on l'exclut
            }
            seenTitles.add(title);
            return true;
          });
          
          // TOUJOURS mettre à jour avec les projets de Supabase
          console.log(`[Projects] Chargement de ${uniqueProjects.length} projets depuis Supabase:`, uniqueProjects.map(p => p.title));
          setProjects(uniqueProjects);
          setIsInitialized(true);
        } else {
          // Si Supabase est vide ou erreur, garder les projets par défaut
          console.log("[Projects] Aucun projet dans Supabase, utilisation des projets par défaut");
        }
      } catch (error) {
        // Si Supabase n'est pas configuré, garder les projets par défaut
        console.log("Supabase non configuré, utilisation des projets par défaut");
      }
    };

    syncAndLoadProjects();
  }, []);

  return (
    <section
      id="projects"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0f14] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
              Projets
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#9ca3af] font-light">
            Découvrez mes réalisations récentes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView && isInitialized ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative bg-gradient-to-b from-[rgba(255,255,255,0.04)] to-[rgba(255,255,255,0.01)] backdrop-blur-[6px] rounded-[14px] overflow-hidden border border-[rgba(255,255,255,0.06)] hover:border-[#34d399]/20 transition-all duration-500 group hover:shadow-2xl hover:shadow-[#34d399]/5 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-[#34d399]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                {/* Image avec overlay au hover */}
              <div className="relative h-56 bg-[#111827]/30 overflow-hidden">
                {project.image_url ? (
                  <img 
                    src={project.image_url} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Code size={48} className="text-[#34d399]/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-8">
                {/* En-tête avec date et rôle */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#34d399] transition-colors">
                    {project.title}
                  </h3>
                  {project.date && (
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={14} />
                      {project.date}
                    </span>
                  )}
                </div>

                {/* Type */}
                <p className="text-xs text-gray-500 mb-3">Projet client {project.demo_url || project.github_url ? "" : "(confidentiel)"}</p>

                {/* Contexte */}
                {project.context && (
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-400 mb-1">Contexte</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{project.context}</p>
                  </div>
                )}

                {/* Problématique */}
                {project.problem && (
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-400 mb-1">Problématique</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{project.problem}</p>
                  </div>
                )}

                {/* Interventions */}
                {project.interventions && project.interventions.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-400 mb-2">Interventions</h4>
                    <ul className="space-y-1">
                      {project.interventions.map((intervention, i) => (
                        <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                          <span className="text-[#34d399] mt-1">•</span>
                          <span>{intervention}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Résultat */}
                {(project.result || project.results) && (
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-400 mb-1">Résultat</h4>
                    <div className="flex items-start gap-2 text-sm text-[#34d399]">
                      <TrendingUp size={16} className="mt-0.5 flex-shrink-0" />
                      <span>{project.result || project.results}</span>
                    </div>
                  </div>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-[#34d399]/10 text-[#34d399] rounded-lg text-xs border border-[#34d399]/20 backdrop-blur-sm hover:border-[#34d399]/30 hover:bg-[#34d399]/15 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2.5 py-1 text-gray-400 text-xs">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t border-gray-700">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-[#34d399] transition-colors text-sm"
                    >
                      <Github size={18} />
                      <span>Code</span>
                    </a>
                  )}
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-[#34d399] transition-colors text-sm"
                    >
                      <ExternalLink size={18} />
                      <span>Voir le projet</span>
                    </a>
                  )}
                  {!project.github_url && !project.demo_url && (
                    <span className="text-xs text-gray-500">Projet client (confidentiel)</span>
                  )}
                </div>
              </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

