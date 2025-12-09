"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
];

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

        <div className="space-y-12 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <span>{category.emoji}</span>
                <span>{category.title}</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: categoryIndex * 0.1 + skillIndex * 0.05 
                    }}
                    className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white text-sm font-medium">{skill.name}</span>
                      <span className="text-gray-400 text-xs">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ 
                          duration: 1, 
                          delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3 
                        }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

