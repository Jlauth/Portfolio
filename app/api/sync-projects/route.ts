import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { defaultProjects } from "@/data/projects";
  {
    id: "1",
    title: "STL CHR - E-commerce PrestaShop 8.2",
    description:
      "Boutique e-commerce complète pour matériel de cuisine professionnel. Développement PrestaShop 8.2 avec personnalisation de modules, rédaction de fiches produit SEO friendly, optimisation des performances (OPcache, cache, etc.) et amélioration de l'expérience utilisateur.",
    image_url: null,
    technologies: ["PrestaShop 8.2", "PHP", "Smarty", "MySQL", "SEO", "OPcache", "Performance"],
    github_url: null,
    demo_url: null,
  },
  {
    id: "2",
    title: "Garage Ottélec - WordPress Elementor Pro",
    description:
      "Site vitrine professionnel pour garage automobile développé avec WordPress et Elementor Pro. Design moderne et responsive, optimisation SEO, intégration de formulaires de contact et gestion de contenu optimisée.",
    image_url: null,
    technologies: ["WordPress", "Elementor Pro", "PHP", "CSS", "SEO", "Responsive"],
    github_url: null,
    demo_url: null,
  },
  {
    id: "3",
    title: "Omniflamme - Mise à jour E-commerce",
    description:
      "Mise à jour et amélioration d'une boutique e-commerce existante avec développement de nombreux modules custom. Inclut un module innovant développé en Three.js pour une expérience 3D interactive et immersive.",
    image_url: null,
    technologies: ["PrestaShop", "PHP", "Three.js", "JavaScript", "Modules Custom", "3D"],
    github_url: null,
    demo_url: null,
  },
];

export async function POST(request: Request) {
  try {
    // Vérifier que Supabase est configuré
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase n'est pas configuré" },
        { status: 500 }
      );
    }

    // Récupérer les projets existants dans Supabase
    const { data: existingProjects } = await supabase
      .from("projects")
      .select("id, title");

    const existingTitles = new Set(
      existingProjects?.map((p) => p.title) || []
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

    return NextResponse.json({
      projects: data,
      defaultProjectsCount: defaultProjects.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erreur" },
      { status: 500 }
    );
  }
}

