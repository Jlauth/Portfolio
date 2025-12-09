"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = [
  { name: "Next.js", level: 90, color: "from-gray-100 to-gray-900" },
  { name: "React", level: 95, color: "from-blue-400 to-blue-600" },
  { name: "TypeScript", level: 90, color: "from-blue-500 to-blue-700" },
  { name: "Tailwind CSS", level: 95, color: "from-cyan-400 to-cyan-600" },
  { name: "Node.js", level: 85, color: "from-green-400 to-green-600" },
  { name: "Supabase", level: 80, color: "from-green-300 to-green-500" },
  { name: "PostgreSQL", level: 75, color: "from-blue-300 to-blue-500" },
  { name: "Git", level: 90, color: "from-orange-400 to-orange-600" },
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

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold">{skill.name}</span>
                <span className="text-gray-400 text-sm">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

