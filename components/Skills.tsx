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
    title: "CMS : WordPress",
    emoji: "🟦",
    skills: [
      { name: "Intégration / thèmes", level: 80, color: "from-blue-400 to-blue-600" },
      { name: "Hooks & filtres (avec IA)", level: 65, color: "from-blue-400 to-blue-600" },
      { name: "Développement de plugins", level: 50, color: "from-blue-400 to-blue-600" },
      { name: "ACF / CPT", level: 70, color: "from-blue-400 to-blue-600" },
      { name: "Sécurité & maintenance", level: 75, color: "from-blue-400 to-blue-600" },
    ],
  },
  {
    title: "CMS : Prestashop",
    emoji: "🟧",
    skills: [
      { name: "Overrides Smarty", level: 85, color: "from-orange-400 to-orange-600" },
      { name: "Création/adaptation de modules", level: 75, color: "from-orange-400 to-orange-600" },
      { name: "Hooks Prestashop", level: 65, color: "from-orange-400 to-orange-600" },
      { name: "Customisation TPL", level: 90, color: "from-orange-400 to-orange-600" },
    ],
  },
  {
    title: "Backend / PHP",
    emoji: "🟨",
    skills: [
      { name: "Lecture & adaptation", level: 75, color: "from-yellow-400 to-yellow-600" },
      { name: "Écriture de fonctions simples", level: 60, color: "from-yellow-400 to-yellow-600" },
      { name: "POO basique", level: 45, color: "from-yellow-400 to-yellow-600" },
      { name: "API en PHP (avec IA)", level: 55, color: "from-yellow-400 to-yellow-600" },
      { name: "Sécurité PHP", level: 35, color: "from-yellow-400 to-yellow-600" },
    ],
  },
  {
    title: "Bases de données",
    emoji: "🗄️",
    skills: [
      { name: "SQL (SELECT/UPDATE/DELETE)", level: 70, color: "from-cyan-400 to-cyan-600" },
      { name: "Jointures & requêtes avancées", level: 55, color: "from-cyan-400 to-cyan-600" },
      { name: "MySQL admin (phpMyAdmin)", level: 60, color: "from-cyan-400 to-cyan-600" },
    ],
  },
  {
    title: "DevOps / Serveurs",
    emoji: "🐳",
    skills: [
      { name: "Docker (run / compose basique)", level: 55, color: "from-blue-300 to-blue-500" },
      { name: "Dockerfile (modifications simples)", level: 45, color: "from-blue-300 to-blue-500" },
      { name: "Linux (CMD, SSH, droits, apt)", level: 65, color: "from-blue-300 to-blue-500" },
      { name: "Gestion Apache/Nginx", level: 40, color: "from-blue-300 to-blue-500" },
      { name: "Déploiement Git (pull serveur)", level: 70, color: "from-blue-300 to-blue-500" },
      { name: "FTP/SFTP classique", level: 85, color: "from-blue-300 to-blue-500" },
    ],
  },
  {
    title: "Frontend",
    emoji: "🟩",
    skills: [
      { name: "HTML sémantique", level: 90, color: "from-green-400 to-green-600" },
      { name: "CSS responsive", level: 85, color: "from-green-400 to-green-600" },
      { name: "JavaScript vanilla", level: 70, color: "from-green-400 to-green-600" },
      { name: "jQuery", level: 70, color: "from-green-400 to-green-600" },
      { name: "Intégration Figma → code", level: 80, color: "from-green-400 to-green-600" },
      { name: "Adaptation UI/UX", level: 65, color: "from-green-400 to-green-600" },
      { name: "Création de maquettage simple", level: 50, color: "from-green-400 to-green-600" },
      { name: "Frameworks JS (lecture/IA)", level: 35, color: "from-green-400 to-green-600" },
    ],
  },
  {
    title: "Sécurité",
    emoji: "🔐",
    skills: [
      { name: "Sécurité WP/PS (base + outils)", level: 70, color: "from-purple-400 to-purple-600" },
      { name: "Durcissement serveur", level: 40, color: "from-purple-400 to-purple-600" },
      { name: "Sécurité code (XSS/CSRF)", level: 30, color: "from-purple-400 to-purple-600" },
    ],
  },
  {
    title: "Performance",
    emoji: "🚀",
    skills: [
      { name: "Optimisation front (WebP, lazyload)", level: 85, color: "from-pink-400 to-pink-600" },
      { name: "Lighthouse/PageSpeed diagnostics", level: 75, color: "from-pink-400 to-pink-600" },
      { name: "Cache (plugins, PS, Cloudflare)", level: 70, color: "from-pink-400 to-pink-600" },
      { name: "Optimisation backend (OPcache, Redis)", level: 55, color: "from-pink-400 to-pink-600" },
    ],
  },
  {
    title: "IA / Productivité",
    emoji: "🤖",
    skills: [
      { name: "Utilisation de l'IA pour dev", level: 95, color: "from-indigo-400 to-indigo-600" },
      { name: "Autonomie sans IA", level: 30, color: "from-indigo-400 to-indigo-600" },
    ],
  },
  {
    title: "SEO Technique",
    emoji: "🟦",
    skills: [
      { name: "Balises meta / OG / structure", level: 90, color: "from-blue-500 to-blue-700" },
      { name: "Robots.txt / Sitemap / 301", level: 85, color: "from-blue-500 to-blue-700" },
      { name: "Performance SEO", level: 85, color: "from-blue-500 to-blue-700" },
      { name: "Search Console (erreurs & optimisation)", level: 80, color: "from-blue-500 to-blue-700" },
      { name: "Données structurées (schema.org)", level: 75, color: "from-blue-500 to-blue-700" },
      { name: "Canonical / duplicate / hreflang", level: 70, color: "from-blue-500 to-blue-700" },
    ],
  },
  {
    title: "SEO On-Page / Contenu",
    emoji: "🟧",
    skills: [
      { name: "Recherche de mots-clés", level: 85, color: "from-orange-500 to-orange-700" },
      { name: "Optimisation on-page (Hn, maillage)", level: 90, color: "from-orange-500 to-orange-700" },
      { name: "Rédaction SEO optimisée", level: 95, color: "from-orange-500 to-orange-700" },
      { name: "Analyse SERP", level: 85, color: "from-orange-500 to-orange-700" },
      { name: "Optimisation images", level: 90, color: "from-orange-500 to-orange-700" },
      { name: "Stratégie de maillage interne", level: 85, color: "from-orange-500 to-orange-700" },
    ],
  },
  {
    title: "Rédaction SEO / Copywriting",
    emoji: "🟨",
    skills: [
      { name: "Style & fluidité", level: 95, color: "from-yellow-500 to-yellow-700" },
      { name: "Intégration naturelle des mots-clés", level: 90, color: "from-yellow-500 to-yellow-700" },
      { name: "Construction Hn", level: 95, color: "from-yellow-500 to-yellow-700" },
      { name: "Accroche / taux de clic", level: 85, color: "from-yellow-500 to-yellow-700" },
      { name: "CTA / conversion", level: 80, color: "from-yellow-500 to-yellow-700" },
      { name: "Adaptation du ton", level: 90, color: "from-yellow-500 to-yellow-700" },
      { name: "Contenus longs optimisés", level: 90, color: "from-yellow-500 to-yellow-700" },
    ],
  },
  {
    title: "Stratégie éditoriale",
    emoji: "🟪",
    skills: [
      { name: "Personas & intentions", level: 85, color: "from-purple-500 to-purple-700" },
      { name: "Calendrier éditorial", level: 80, color: "from-purple-500 to-purple-700" },
      { name: "Opportunités SEO / contenu", level: 85, color: "from-purple-500 to-purple-700" },
      { name: "Priorisation par volume & intention", level: 80, color: "from-purple-500 to-purple-700" },
      { name: "Analyse concurrentielle", level: 75, color: "from-purple-500 to-purple-700" },
      { name: "Architecture sémantique (silos/clusters)", level: 70, color: "from-purple-500 to-purple-700" },
    ],
  },
  {
    title: "Analytics & Tracking",
    emoji: "🟩",
    skills: [
      { name: "GA4 (lecture & KPIs)", level: 80, color: "from-green-500 to-green-700" },
      { name: "Événements simples (clic, scroll…)", level: 70, color: "from-green-500 to-green-700" },
      { name: "Search Console (analyse trafic orga)", level: 85, color: "from-green-500 to-green-700" },
      { name: "Reporting & insights", level: 80, color: "from-green-500 to-green-700" },
      { name: "Tracking e-commerce (bases)", level: 50, color: "from-green-500 to-green-700" },
    ],
  },
  {
    title: "Social Media & Ads",
    emoji: "🟫",
    skills: [
      { name: "Planification social media", level: 70, color: "from-amber-600 to-amber-800" },
      { name: "Rédaction posts", level: 40, color: "from-amber-600 to-amber-800" },
      { name: "Création visuelle simple", level: 35, color: "from-amber-600 to-amber-800" },
      { name: "Meta Ads basiques", level: 25, color: "from-amber-600 to-amber-800" },
      { name: "Google Ads basiques", level: 20, color: "from-amber-600 to-amber-800" },
      { name: "Analyse campagnes", level: 30, color: "from-amber-600 to-amber-800" },
      { name: "Stratégie réseaux sociaux", level: 30, color: "from-amber-600 to-amber-800" },
    ],
  },
  {
    title: "CRO / UX rédactionnelle",
    emoji: "🟫",
    skills: [
      { name: "Amélioration de structure / clarté", level: 80, color: "from-amber-700 to-amber-900" },
      { name: "Analyse parcours utilisateur", level: 65, color: "from-amber-700 to-amber-900" },
      { name: "CTA & microcopy (amélioration)", level: 55, color: "from-amber-700 to-amber-900" },
      { name: "A/B ideation", level: 45, color: "from-amber-700 to-amber-900" },
      { name: "Argumentation / signaux de confiance", level: 60, color: "from-amber-700 to-amber-900" },
    ],
  },
  {
    title: "Email marketing",
    emoji: "🟧",
    skills: [
      { name: "Rédaction newsletter", level: 80, color: "from-orange-600 to-orange-800" },
      { name: "Analyse des performances", level: 70, color: "from-orange-600 to-orange-800" },
      { name: "Segmentation basique", level: 50, color: "from-orange-600 to-orange-800" },
      { name: "Automation simple", level: 40, color: "from-orange-600 to-orange-800" },
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
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
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.5 }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.05 }}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:border-purple-500/50"
              >
                {/* En-tête cliquable */}
                <button
                  onClick={() => toggleCategory(category.title)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors duration-200"
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

