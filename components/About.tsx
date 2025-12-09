"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Rocket, Users } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Code Propre",
    description:
      "J'écris du code maintenable, testé et suivant les meilleures pratiques.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "Optimisation pour des applications rapides et une excellente expérience utilisateur.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Travail en équipe avec des méthodologies agiles et une communication efficace.",
  },
];

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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            À propos de moi
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionné par le développement web, je crée des solutions
            innovantes avec les technologies les plus récentes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300"
            >
              <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Avec une expertise en développement front-end et back-end, je
            transforme des idées en applications web performantes. Mon approche
            combine créativité, attention aux détails et une passion pour
            l'apprentissage continu des nouvelles technologies.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

