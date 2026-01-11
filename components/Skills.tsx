"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface SkillCategory {
  title: string;
  emoji: string;
  skills: { name: string; level: number; color: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Sites vitrines WordPress",
    emoji: "🟦",
    skills: [
      { name: "Intégration / thèmes WordPress", level: 80, color: "from-[#34d399] to-[#10b981]" },
      { name: "Hooks & filtres WordPress", level: 65, color: "from-[#34d399] to-[#10b981]" },
      { name: "ACF / CPT", level: 70, color: "from-[#34d399] to-[#10b981]" },
      { name: "Elementor Pro", level: 75, color: "from-[#34d399] to-[#10b981]" },
      { name: "Sites responsive", level: 85, color: "from-[#34d399] to-[#10b981]" },
      { name: "Sécurité & maintenance WordPress", level: 75, color: "from-[#34d399] to-[#10b981]" },
    ],
  },
  {
    title: "E-commerce PrestaShop",
    emoji: "🛒",
    skills: [
      { name: "Montées de version (1.7 → 8.x)", level: 80, color: "from-orange-400 to-orange-600" },
      { name: "Développement de modules custom", level: 75, color: "from-orange-400 to-orange-600" },
      { name: "Reprise de boutiques existantes", level: 85, color: "from-orange-400 to-orange-600" },
      { name: "Correction de bugs critiques en production", level: 80, color: "from-orange-400 to-orange-600" },
      { name: "Overrides Smarty & customisation TPL", level: 90, color: "from-orange-400 to-orange-600" },
      { name: "Hooks PrestaShop", level: 65, color: "from-orange-400 to-orange-600" },
    ],
  },
  {
    title: "Performance & SEO",
    emoji: "⚡",
    skills: [
      { name: "Optimisation des temps de chargement", level: 85, color: "from-pink-400 to-pink-600" },
      { name: "Cache, OPcache, Smarty", level: 75, color: "from-pink-400 to-pink-600" },
      { name: "SEO technique (structure, performance, indexation)", level: 90, color: "from-[#34d399] to-[#10b981]" },
      { name: "Mise en place et suivi Analytics", level: 80, color: "from-[#34d399] to-[#10b981]" },
      { name: "Lighthouse/PageSpeed diagnostics", level: 75, color: "from-pink-400 to-pink-600" },
      { name: "Search Console (analyse & optimisation)", level: 85, color: "from-[#34d399] to-[#10b981]" },
    ],
  },
  {
    title: "Maintenance & accompagnement",
    emoji: "💼",
    skills: [
      { name: "Travail en autonomie ou avec équipes non techniques", level: 85, color: "from-[#34d399] to-[#10b981]" },
      { name: "Conformité RGPD (cookies, formulaires, bases légales)", level: 75, color: "from-[#34d399] to-[#10b981]" },
      { name: "Réduction de la dette technique", level: 80, color: "from-pink-400 to-pink-600" },
      { name: "Notions d'infrastructure et d'hébergement", level: 65, color: "from-[#34d399] to-[#10b981]" },
      { name: "Déploiement Git", level: 70, color: "from-[#34d399] to-[#10b981]" },
    ],
  },
];

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

export function Skills() {
  const mounted = useMounted();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: "-50px 0px",
  });
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Marquer l'animation comme terminée une fois que la section est visible
  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  if (!mounted) {
    return null;
  }

  const toggleCategory = (title: string) => {
    setOpenCategory(openCategory === title ? null : title);
  };

  return (
    <section
      id="skills"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0f14] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
              Compétences
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#9ca3af] font-light">
            Technologies et outils que je maîtrise
          </p>
        </motion.div>

        <div className="space-y-4 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => {
            const isOpen = openCategory === category.title;
            
            return (
              <div className="relative rounded-[14px]">
                {/* Couche BLUR STATIQUE */}
                <div
                  className="absolute inset-0 rounded-[14px] backdrop-blur-[6px] bg-gradient-to-b from-[rgba(255,255,255,0.04)] to-[rgba(255,255,255,0.01)] pointer-events-none"
                />
                
                {/* Couche ANIMÉE */}
                <motion.div
                  key={category.title}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  className="relative rounded-[14px] border border-[rgba(255,255,255,0.06)] overflow-hidden transition-all duration-500 hover:border-[#34d399]/20 hover:shadow-2xl hover:shadow-[#34d399]/5 group"
                  style={{ contain: "layout paint" }}
                >
                {/* En-tête cliquable */}
                <button
                  onClick={() => toggleCategory(category.title)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14] rounded-lg"
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-3">
                    <span className="text-2xl">{category.emoji}</span>
                    <span>{category.title}</span>
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown 
                      size={24} 
                      className="text-gray-400 transition-colors duration-200"
                    />
                  </motion.div>
                </button>

                {/* Contenu dépliable */}
                <motion.div
                  initial={false}
                  animate={{
                    maxHeight: isOpen ? 1000 : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={false}
                          animate={{ opacity: isOpen ? 1 : 0 }}
                          transition={{ 
                            duration: 0.4, 
                            delay: skillIndex * 0.05 
                          }}
                          className="relative bg-gradient-to-b from-[#111827]/80 to-[#111827]/60 p-4 rounded-xl border border-[rgba(255,255,255,0.06)] hover:border-[#34d399]/20 hover:bg-gradient-to-b hover:from-[#111827]/90 hover:to-[#111827]/70 transition-all duration-300 group/item"
                        >
                          <div className="absolute inset-0 bg-[#34d399]/5 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative z-10">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white text-sm font-medium">{skill.name}</span>
                            <span className="text-gray-400 text-xs font-semibold">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-800/50 rounded-full h-2.5 overflow-hidden relative">
                            <motion.div
                              initial={false}
                              animate={{ 
                                scaleX: isOpen ? 1 : 0, 
                                opacity: isOpen ? 1 : 0 
                              }}
                              transition={{ 
                                duration: 0.8, 
                                delay: isOpen ? skillIndex * 0.05 + 0.15 : 0,
                                ease: [0.22, 1, 0.36, 1]
                              }}
                              className={`h-full bg-gradient-to-r ${skill.color} rounded-full shadow-lg shadow-[#34d399]/10`}
                              style={{ 
                                width: `${skill.level}%`,
                                transformOrigin: 'left',
                                willChange: 'transform, opacity'
                              }}
                            />
                          </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

