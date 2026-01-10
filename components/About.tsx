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
              À propos
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#9ca3af] max-w-3xl mx-auto font-light">
            Création, reprise et optimisation de sites WordPress et PrestaShop.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-gradient-to-b from-[rgba(255,255,255,0.04)] to-[rgba(255,255,255,0.01)] backdrop-blur-[6px] p-10 rounded-[14px] border border-[rgba(255,255,255,0.06)] shadow-2xl shadow-black/50 hover:border-[#34d399]/20 transition-all duration-500 group">
            <div className="absolute inset-0 bg-[#34d399]/5 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-[#e5e7eb]/90 mb-6 leading-relaxed font-light">
                J'accompagne principalement des <span className="text-[#34d399] font-medium">PME et des artisans</span>, mais aussi des <span className="text-[#10b981] font-medium">indépendants et porteurs de projets</span>, dans la création, la reprise et l'optimisation de leur présence en ligne.
              </p>
              <p className="text-lg md:text-xl text-[#e5e7eb]/90 leading-relaxed font-light">
                J'interviens sur des projets existants ou en refonte, qu'il s'agisse de <span className="text-[#34d399] font-medium">sites vitrines WordPress</span> ou de <span className="text-[#10b981] font-medium">boutiques e-commerce PrestaShop</span>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

