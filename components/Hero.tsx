"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0b0f14]"
    >
      {/* Animated background premium */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#34d399]/10 rounded-full mix-blend-soft-light filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#10b981]/10 rounded-full mix-blend-soft-light filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#34d399]/5 rounded-full mix-blend-soft-light filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-semibold mb-8 tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
              Développeur web
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#34d399] via-[#10b981] to-[#34d399] bg-clip-text text-transparent">
              & e-commerce
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl lg:text-2xl text-gray-300/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Sites vitrines WordPress et boutiques e-commerce PrestaShop, avec un focus sur la <span className="text-[#34d399] font-medium">performance</span>, la <span className="text-[#10b981] font-medium">stabilité</span> et le <span className="text-[#34d399] font-medium">référencement</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <Link
              href="#projects"
              className="group relative px-8 py-4 bg-gradient-to-b from-[#34d399] to-[#10b981] text-[#022c22] rounded-xl font-semibold overflow-hidden transition-all duration-500 hover:shadow-[0_10px_30px_rgba(16,185,129,0.25)] hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-[#34d399]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]"
            >
              <span className="relative z-10">Voir mes projets</span>
            </Link>
            <Link
              href="#contact"
              className="px-8 py-4 border border-white/6 text-gray-300 rounded-xl font-normal backdrop-blur-sm bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/10 hover:text-white transition-all duration-500 focus-visible:ring-2 focus-visible:ring-[#34d399]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]"
            >
              Discuter de votre projet
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex justify-center gap-8 mb-20"
          >
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg hover:bg-white/5"
            >
              <Github size={24} className="relative z-10" />
              <div className="absolute inset-0 bg-[#34d399]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg hover:bg-white/5"
            >
              <Linkedin size={24} className="relative z-10" />
              <div className="absolute inset-0 bg-[#34d399]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </Link>
            <Link
              href="mailto:contact@example.com"
              className="group relative p-3 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg hover:bg-white/5"
            >
              <Mail size={24} className="relative z-10" />
              <div className="absolute inset-0 bg-[#34d399]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Flèche de scroll - positionnée en dehors du conteneur principal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
          >
            <ArrowDown size={32} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

