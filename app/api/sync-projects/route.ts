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

    // Filtrer les keepalive et les projets "Test"
    const filteredProjects = filterKeepalive(existingProjects || []).filter((p) => {
      const title = p.title?.toLowerCase() || "";
      return !title.includes("test") && title !== "projet test";
    });
    
    // Supprimer les doublons : garder seulement le premier projet pour chaque titre unique
    const titleToId = new Map<string, string>();
    const duplicateIds: string[] = [];
    
    for (const project of filteredProjects) {
      const title = project.title;
      if (titleToId.has(title)) {
        // C'est un doublon, on le marque pour suppression
        duplicateIds.push(project.id);
      } else {
        // Premier projet avec ce titre, on le garde
        titleToId.set(title, project.id);
      }
    }
    
    // Supprimer les doublons
    if (duplicateIds.length > 0) {
      const { error: deleteDuplicatesError } = await supabase
        .from("projects")
        .delete()
        .in("id", duplicateIds);
      
      if (deleteDuplicatesError && deleteDuplicatesError.code !== "PGRST116") {
        console.warn("Erreur lors de la suppression des doublons:", deleteDuplicatesError);
      }
    }
    
    // Supprimer le projet "Test" s'il existe dans Supabase
    const { error: deleteError } = await supabase
      .from("projects")
      .delete()
      .or("title.ilike.%test%,title.eq.Projet Test");
    
    if (deleteError && deleteError.code !== "PGRST116") {
      console.warn("Erreur lors de la suppression du projet Test:", deleteError);
    }
    
    // AVANT la synchronisation, supprimer tous les projets qui ne sont plus dans defaultProjects
    const validTitles = new Set(defaultProjects.map(p => p.title));
    const { data: allProjects } = await supabase
      .from("projects")
      .select("id, title");
    
    if (allProjects) {
      const projectsToDelete = allProjects
        .filter(p => {
          const title = p.title?.toLowerCase() || "";
          const isKeepalive = p.title?.startsWith("__keepalive__");
          const isTest = title.includes("test") || title === "projet test";
          const isValid = validTitles.has(p.title);
          return !isKeepalive && !isTest && !isValid;
        })
        .map(p => p.id);
      
      if (projectsToDelete.length > 0) {
        const { error: deleteOrphansError } = await supabase
          .from("projects")
          .delete()
          .in("id", projectsToDelete);
        
        if (deleteOrphansError && deleteOrphansError.code !== "PGRST116") {
          console.warn("Erreur lors de la suppression des projets orphelins:", deleteOrphansError);
        }
      }
    }

    // RÉACTUALISER la liste des projets existants APRÈS le nettoyage
    const { data: refreshedProjects } = await supabase
      .from("projects")
      .select("id, title");
    
    const refreshedTitles = new Set(
      filterKeepalive(refreshedProjects || [])
        .filter((p) => {
          const title = p.title?.toLowerCase() || "";
          return !title.includes("test") && title !== "projet test";
        })
        .map((p) => p.title)
    );

    // Synchroniser les projets
    const results = [];
    for (const project of defaultProjects) {
      if (refreshedTitles.has(project.title)) {
        // Mettre à jour le projet existant
        const { data, error } = await supabase
          .from("projects")
          .update({
            description: project.description,
            technologies: project.technologies,
            github_url: project.github_url,
            demo_url: project.demo_url,
            image_url: project.image_url,
            role: project.role || null,
            date: project.date || null,
            highlights: project.highlights || null,
            results: project.results || null,
            category: project.category || null,
            shortDescription: project.shortDescription || null,
            context: project.context || null,
            problem: project.problem || null,
            interventions: project.interventions || null,
            result: project.result || null,
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
        console.log(`[Sync] Insertion du projet: ${project.title}`);
        
        // D'abord insérer avec les champs de base uniquement
        const baseData: any = {
          title: project.title,
          description: project.description,
          technologies: project.technologies,
          github_url: project.github_url,
          demo_url: project.demo_url,
          image_url: project.image_url,
        };
        
        // Ajouter les champs optionnels seulement s'ils existent (pour éviter les erreurs de colonnes manquantes)
        if (project.role !== undefined) baseData.role = project.role;
        if (project.date !== undefined) baseData.date = project.date;
        if (project.highlights !== undefined) baseData.highlights = project.highlights;
        if (project.results !== undefined) baseData.results = project.results;
        if (project.category !== undefined) baseData.category = project.category;
        if (project.shortDescription !== undefined) baseData.shortDescription = project.shortDescription;
        if (project.context !== undefined) baseData.context = project.context;
        if (project.problem !== undefined) baseData.problem = project.problem;
        if (project.interventions !== undefined) baseData.interventions = project.interventions;
        if (project.result !== undefined) baseData.result = project.result;
        
        const { data, error } = await supabase
          .from("projects")
          .insert(baseData)
          .select();

        if (error) {
          console.error(`[Sync] Erreur lors de l'insertion de ${project.title}:`, error);
          // Si erreur de colonne manquante, réessayer avec seulement les champs de base
          if (error.message.includes("column") || error.code === "42703") {
            console.log(`[Sync] Réessai avec champs de base uniquement pour ${project.title}`);
            const { data: retryData, error: retryError } = await supabase
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
            
            if (retryError) {
              results.push({ title: project.title, action: "insert", error: retryError.message });
            } else {
              results.push({ title: project.title, action: "inserted", success: true });
            }
          } else {
            results.push({ title: project.title, action: "insert", error: error.message });
          }
        } else {
          console.log(`[Sync] Projet ${project.title} inséré avec succès`);
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

    // Filtrer les enregistrements keepalive et les projets "Test"
    const filteredProjects = filterKeepalive(data || []).filter((p) => {
      const title = p.title?.toLowerCase() || "";
      return !title.includes("test") && title !== "projet test";
    });

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

