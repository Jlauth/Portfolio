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

export async function submitContactForm(data: ContactFormData) {
  if (!supabase) {
    // Si Supabase n'est pas configuré, simuler un succès ou logger l'erreur
    console.warn("Supabase n'est pas configuré. Le message n'a pas été enregistré.");
    return;
  }

  const { error } = await supabase.from("contacts").insert([
    {
      name: data.name,
      email: data.email,
      message: data.message,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    throw error;
  }
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

