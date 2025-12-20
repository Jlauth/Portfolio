import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { defaultProjects } from "@/data/projects";
import { filterKeepalive, isKeepaliveProject } from "@/lib/keepalive";

export async function POST(request: Request) {
  try {
    // Vérifier que Supabase est configuré
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase n'est pas configuré" },
        { status: 500 }
      );
    }

    // Récupérer les projets existants dans Supabase (en excluant les keepalive)
    const { data: existingProjects } = await supabase
      .from("projects")
      .select("id, title");

    // Filtrer les keepalive et créer un Set des titres existants
    const filteredProjects = filterKeepalive(existingProjects || []);
    const existingTitles = new Set(
      filteredProjects.map((p) => p.title)
    );

    // Synchroniser les projets
    const results = [];
    for (const project of defaultProjects) {
      if (existingTitles.has(project.title)) {
        // Mettre à jour le projet existant
        const { data, error } = await supabase
          .from("projects")
          .update({
            description: project.description,
            technologies: project.technologies,
            github_url: project.github_url,
            demo_url: project.demo_url,
            image_url: project.image_url,
          })
          .eq("title", project.title)
          .select();

        if (error) {
          results.push({ title: project.title, action: "update", error: error.message });
        } else {
          results.push({ title: project.title, action: "updated", success: true });
        }
      } else {
        // Insérer le nouveau projet
        const { data, error } = await supabase
          .from("projects")
          .insert({
            title: project.title,
            description: project.description,
            technologies: project.technologies,
            github_url: project.github_url,
            demo_url: project.demo_url,
            image_url: project.image_url,
          })
          .select();

        if (error) {
          results.push({ title: project.title, action: "insert", error: error.message });
        } else {
          results.push({ title: project.title, action: "inserted", success: true });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Projets synchronisés avec succès",
      results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erreur lors de la synchronisation" },
      { status: 500 }
    );
  }
}

// GET pour vérifier l'état
export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase n'est pas configuré" },
        { status: 500 }
      );
    }

    const { data, error } = await supabase.from("projects").select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Filtrer les enregistrements keepalive pour qu'ils ne soient jamais visibles
    const filteredProjects = filterKeepalive(data || []);

    return NextResponse.json({
      projects: filteredProjects,
      defaultProjectsCount: defaultProjects.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erreur" },
      { status: 500 }
    );
  }
}

