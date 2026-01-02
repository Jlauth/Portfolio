"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="about"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            À propos
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Accompagnement des PME et artisans dans leur présence en ligne, de la création à l'optimisation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              J'accompagne les PME et artisans dans la création, la reprise et l'optimisation de leur présence en ligne, qu'il s'agisse de sites vitrines WordPress ou de boutiques e-commerce PrestaShop.
            </p>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Mon cœur d'expertise reste la reprise de projets existants : sites vieillissants, performances insuffisantes, bugs en production ou SEO perfectible.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              J'interviens aussi bien sur des projets simples que sur des problématiques techniques plus avancées.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

