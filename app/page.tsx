"use client";

import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}

