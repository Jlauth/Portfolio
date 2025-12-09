import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
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
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

