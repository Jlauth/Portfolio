"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Send } from "lucide-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { submitContactForm } from "@/lib/supabase";

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { executeRecaptcha } = useGoogleReCaptcha() || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // Honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // Générer le token reCAPTCHA
      let recaptchaToken = "";
      if (executeRecaptcha) {
        recaptchaToken = await executeRecaptcha("contact_form");
      }

      await submitContactForm(formData, recaptchaToken);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "", website: "" });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Erreur lors de l'envoi. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
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
              Discuter de votre projet
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300/80 max-w-3xl mx-auto font-light">
            J'interviens aussi bien pour des missions ponctuelles (audit technique, correction de bugs, montée de version) que pour un accompagnement long terme (maintenance, optimisation continue).
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="relative bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl p-10 rounded-2xl border border-gray-700/50 shadow-2xl shadow-black/50 hover:border-green-500/30 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 space-y-6"
          >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  minLength={2}
                  maxLength={100}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3.5 bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-green-500/50 focus:bg-gray-900/80 focus-visible:ring-2 focus-visible:ring-green-400/30 focus-visible:ring-offset-0 transition-all duration-300"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  maxLength={254}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3.5 bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-green-500/50 focus:bg-gray-900/80 focus-visible:ring-2 focus-visible:ring-green-400/30 focus-visible:ring-offset-0 transition-all duration-300"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3.5 bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-green-500/50 focus:bg-gray-900/80 focus-visible:ring-2 focus-visible:ring-green-400/30 focus-visible:ring-offset-0 transition-all duration-300 resize-none"
                  placeholder="Décrivez votre projet PrestaShop, votre problématique ou votre besoin..."
                />
              </div>

              {/* Honeypot field - caché pour les humains, visible pour les bots */}
              <div className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Ne pas remplir ce champ</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full px-8 py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white rounded-xl font-semibold overflow-hidden transition-all duration-500 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:shadow-green-500/30 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-green-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
              >
                <span className="relative z-10">Discuter de votre projet PrestaShop</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              >
                {isSubmitting ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    <Send size={20} />
                    Discuter de votre projet PrestaShop
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <p className="text-green-400 text-sm text-center">
                  Message envoyé avec succès !
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-400 text-sm text-center">
                  {errorMessage || "Erreur lors de l'envoi. Veuillez réessayer."}
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

