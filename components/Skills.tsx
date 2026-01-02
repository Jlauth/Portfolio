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
    title: "CMS : WordPress & Prestashop",
    emoji: "🟦",
    skills: [
      { name: "Intégration / thèmes WordPress", level: 80, color: "from-green-400 to-emerald-600" },
      { name: "Hooks & filtres WordPress", level: 65, color: "from-green-400 to-emerald-600" },
      { name: "ACF / CPT", level: 70, color: "from-green-400 to-emerald-600" },
      { name: "Overrides Smarty Prestashop", level: 85, color: "from-orange-400 to-orange-600" },
      { name: "Création/adaptation de modules Prestashop", level: 75, color: "from-orange-400 to-orange-600" },
      { name: "Customisation TPL Prestashop", level: 90, color: "from-orange-400 to-orange-600" },
      { name: "Sécurité & maintenance CMS", level: 75, color: "from-green-400 to-emerald-600" },
    ],
  },
  {
    title: "Développement",
    emoji: "💻",
    skills: [
      { name: "HTML sémantique", level: 90, color: "from-green-400 to-green-600" },
      { name: "CSS responsive", level: 85, color: "from-green-400 to-green-600" },
      { name: "JavaScript vanilla", level: 70, color: "from-green-400 to-green-600" },
      { name: "jQuery", level: 70, color: "from-green-400 to-green-600" },
      { name: "Intégration Figma → code", level: 80, color: "from-green-400 to-green-600" },
      { name: "PHP (lecture & adaptation)", level: 75, color: "from-yellow-400 to-yellow-600" },
      { name: "SQL & bases de données", level: 70, color: "from-cyan-400 to-cyan-600" },
      { name: "Performance (optimisation front/back)", level: 85, color: "from-pink-400 to-pink-600" },
    ],
  },
  {
    title: "DevOps & Infrastructure",
    emoji: "🐳",
    skills: [
      { name: "Linux (CMD, SSH, droits)", level: 65, color: "from-green-300 to-emerald-500" },
      { name: "Docker (run / compose)", level: 55, color: "from-green-300 to-emerald-500" },
      { name: "Déploiement Git", level: 70, color: "from-green-300 to-emerald-500" },
      { name: "FTP/SFTP", level: 85, color: "from-green-300 to-emerald-500" },
    ],
  },
  {
    title: "SEO",
    emoji: "🔍",
    skills: [
      { name: "SEO technique (balises, sitemap, structure)", level: 90, color: "from-green-500 to-emerald-700" },
      { name: "Optimisation on-page (Hn, maillage)", level: 90, color: "from-orange-500 to-orange-700" },
      { name: "Recherche de mots-clés", level: 85, color: "from-orange-500 to-orange-700" },
      { name: "Données structurées (schema.org)", level: 75, color: "from-green-500 to-emerald-700" },
      { name: "Performance SEO", level: 85, color: "from-green-500 to-emerald-700" },
      { name: "Search Console (analyse & optimisation)", level: 85, color: "from-green-500 to-emerald-700" },
    ],
  },
  {
    title: "Rédaction & Stratégie SEO",
    emoji: "✍️",
    skills: [
      { name: "Rédaction SEO optimisée", level: 95, color: "from-yellow-500 to-yellow-700" },
      { name: "Style & fluidité", level: 95, color: "from-yellow-500 to-yellow-700" },
      { name: "Construction Hn", level: 95, color: "from-yellow-500 to-yellow-700" },
      { name: "Stratégie éditoriale & personas", level: 85, color: "from-green-500 to-emerald-700" },
      { name: "Architecture sémantique (silos/clusters)", level: 70, color: "from-green-500 to-emerald-700" },
      { name: "Analyse concurrentielle", level: 75, color: "from-green-500 to-emerald-700" },
    ],
  },
  {
    title: "Analytics & Conversion",
    emoji: "📊",
    skills: [
      { name: "GA4 (lecture & KPIs)", level: 80, color: "from-green-500 to-green-700" },
      { name: "Search Console (analyse trafic)", level: 85, color: "from-green-500 to-green-700" },
      { name: "Reporting & insights", level: 80, color: "from-green-500 to-green-700" },
      { name: "CRO / UX rédactionnelle", level: 80, color: "from-amber-700 to-amber-900" },
      { name: "Analyse parcours utilisateur", level: 65, color: "from-amber-700 to-amber-900" },
    ],
  },
  {
    title: "Marketing Digital",
    emoji: "📧",
    skills: [
      { name: "Email marketing (rédaction & analyse)", level: 80, color: "from-orange-600 to-orange-800" },
      { name: "Planification social media", level: 70, color: "from-amber-600 to-amber-800" },
    ],
  },
  {
    title: "IA & Productivité",
    emoji: "🤖",
    skills: [
      { name: "Utilisation de l'IA pour le développement", level: 95, color: "from-indigo-400 to-indigo-600" },
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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Compétences
          </h2>
          <p className="text-xl text-gray-300">
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
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden transition-all duration-300"
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
                              className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-colors"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-white text-sm font-medium">{skill.name}</span>
                                <span className="text-gray-400 text-xs font-semibold">{skill.level}%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ 
                                    duration: 0.8, 
                                    delay: skillIndex * 0.05 + 0.2,
                                    ease: "easeOut"
                                  }}
                                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full shadow-lg`}
                                />
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

