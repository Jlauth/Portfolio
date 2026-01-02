"use client";

import { motion, AnimatePresence } from "framer-motion";
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
      { name: "Intégration / thèmes WordPress", level: 80, color: "from-green-400 to-emerald-600" },
      { name: "Hooks & filtres WordPress", level: 65, color: "from-green-400 to-emerald-600" },
      { name: "ACF / CPT", level: 70, color: "from-green-400 to-emerald-600" },
      { name: "Elementor Pro", level: 75, color: "from-green-400 to-emerald-600" },
      { name: "Sites responsive", level: 85, color: "from-green-400 to-emerald-600" },
      { name: "Sécurité & maintenance WordPress", level: 75, color: "from-green-400 to-emerald-600" },
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
      { name: "SEO technique (structure, performance, indexation)", level: 90, color: "from-green-500 to-emerald-700" },
      { name: "Mise en place et suivi Analytics", level: 80, color: "from-green-500 to-emerald-700" },
      { name: "Lighthouse/PageSpeed diagnostics", level: 75, color: "from-pink-400 to-pink-600" },
      { name: "Search Console (analyse & optimisation)", level: 85, color: "from-green-500 to-emerald-700" },
    ],
  },
  {
    title: "Maintenance & accompagnement",
    emoji: "💼",
    skills: [
      { name: "Travail en autonomie ou avec équipes non techniques", level: 85, color: "from-green-400 to-emerald-600" },
      { name: "Conformité RGPD (cookies, formulaires, bases légales)", level: 75, color: "from-green-500 to-emerald-700" },
      { name: "Réduction de la dette technique", level: 80, color: "from-pink-400 to-pink-600" },
      { name: "Notions d'infrastructure et d'hébergement", level: 65, color: "from-green-300 to-emerald-500" },
      { name: "Déploiement Git", level: 70, color: "from-green-300 to-emerald-500" },
    ],
  },
];

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  // Fermer toutes les catégories quand on sort de la section
  useEffect(() => {
    if (!inView) {
      setOpenCategory(null);
    }
  }, [inView]);

  const toggleCategory = (title: string) => {
    setOpenCategory(openCategory === title ? null : title);
  };

  return (
    <section
      id="skills"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden"
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-green-100 to-emerald-100 bg-clip-text text-transparent">
              Compétences
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300/80 font-light">
            Technologies et outils que je maîtrise
          </p>
        </motion.div>

        <div className="space-y-4 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => {
            const isOpen = openCategory === category.title;
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                className="relative bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden transition-all duration-500 hover:border-green-500/30 hover:shadow-2xl hover:shadow-green-500/10 group"
              >
                {/* En-tête cliquable */}
                <button
                  onClick={() => toggleCategory(category.title)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-lg"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
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
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2">
                        <div className="grid md:grid-cols-2 gap-4">
                          {category.skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                duration: 0.4, 
                                delay: skillIndex * 0.05 
                              }}
                              className="relative bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/30 hover:border-green-500/30 hover:bg-gray-900/80 transition-all duration-300 group/item"
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                              <div className="relative z-10">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-white text-sm font-medium">{skill.name}</span>
                                <span className="text-gray-400 text-xs font-semibold">{skill.level}%</span>
                              </div>
                              <div className="w-full bg-gray-800/50 rounded-full h-2.5 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ 
                                    duration: 0.8, 
                                    delay: skillIndex * 0.05 + 0.2,
                                    ease: "easeOut"
                                  }}
                                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full shadow-lg shadow-green-500/20`}
                                />
                              </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

