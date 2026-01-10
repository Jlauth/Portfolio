import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Créer le client Supabase seulement si les variables sont définies
export const supabase: SupabaseClient | null = 
  supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData, recaptchaToken?: string) {
  // Utiliser l'API route sécurisée au lieu d'appeler Supabase directement
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      recaptchaToken,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Erreur lors de l'envoi du message");
  }

  return await response.json();
}

export async function getProjects() {
  if (!supabase) {
    // Si Supabase n'est pas configuré, retourner un tableau vide
    return [];
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    // En cas d'erreur, retourner un tableau vide plutôt que de throw
    console.error("Erreur lors de la récupération des projets:", error);
    return [];
  }

  // LOG pour déboguer : voir tous les projets récupérés
  console.log(`[getProjects] ${data?.length || 0} projets récupérés depuis Supabase:`, data?.map(p => ({ id: p.id, title: p.title, created_at: p.created_at })));

  // Filtrer uniquement les keepalive (les projets "Test" n'existent plus)
  const filtered = (data || []).filter((project) => {
    const title = project.title || "";
    const isKeepalive = title.startsWith("__keepalive__");
    return !isKeepalive;
  });
  
  // LOG pour déboguer : voir les projets après filtrage
  console.log(`[getProjects] ${filtered.length} projets après filtrage:`, filtered.map(p => p.title));
  
  // Supprimer les doublons basés sur le titre (garder le premier)
  const seenTitles = new Set<string>();
  const uniqueProjects = filtered.filter((project) => {
    const title = project.title;
    // Normaliser le titre pour détecter les doublons similaires
    const normalizedTitle = title.toLowerCase().trim();
    
    // Détecter les doublons Omniflamme (avec ou sans version)
    if (normalizedTitle.includes("omniflamme")) {
      if (seenTitles.has("omniflamme")) {
        return false; // Doublon, on l'exclut
      }
      // Garder seulement "Omniflamme 9.0.1 - Mise à jour E-commerce"
      if (title === "Omniflamme 9.0.1 - Mise à jour E-commerce") {
        seenTitles.add("omniflamme");
        seenTitles.add(title); // Ajouter aussi le titre exact
        return true;
      }
      // Exclure les autres variantes d'Omniflamme
      return false;
    }
    
    if (seenTitles.has(title)) {
      return false; // Doublon, on l'exclut
    }
    seenTitles.add(title);
    return true;
  });
  
  // LOG pour déboguer : voir les projets finaux
  console.log(`[getProjects] ${uniqueProjects.length} projets finaux:`, uniqueProjects.map(p => p.title));
  
  return uniqueProjects;
}

