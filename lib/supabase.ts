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

  return data || [];
}

