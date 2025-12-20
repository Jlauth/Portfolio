import { supabase } from "./supabase";

const KEEPALIVE_PREFIX = "__keepalive__";
const KEEPALIVE_TABLE = "projects";
const CHECK_INTERVAL_MS = 60 * 60 * 1000; // 1 heure

/**
 * Génère un ID keepalive pour une date donnée
 * Format: __keepalive__YYYY-MM-DD
 */
export function getKeepaliveId(date: Date = new Date()): string {
  const dateStr = date.toISOString().split("T")[0];
  return `${KEEPALIVE_PREFIX}${dateStr}`;
}

/**
 * Vérifie si un ID est un enregistrement keepalive
 */
export function isKeepaliveId(id: string): boolean {
  return typeof id === "string" && id.startsWith(KEEPALIVE_PREFIX);
}

/**
 * Vérifie si un projet est un enregistrement keepalive
 */
export function isKeepaliveProject(project: { id?: string; title?: string }): boolean {
  return isKeepaliveId(project.id || "") || project.title?.startsWith(KEEPALIVE_PREFIX) === true;
}

/**
 * Filtre les enregistrements keepalive d'un tableau
 */
export function filterKeepalive<T extends { id?: string; title?: string }>(items: T[]): T[] {
  return items.filter((item) => !isKeepaliveProject(item));
}

/**
 * Crée l'enregistrement keepalive pour aujourd'hui
 */
async function createKeepaliveRecord(): Promise<void> {
  if (!supabase) {
    console.warn("[Keepalive] Supabase n'est pas configuré");
    return;
  }

  try {
    const todayId = getKeepaliveId();
    const today = new Date().toISOString();

    // Vérifier si l'enregistrement existe déjà (par title car c'est notre identifiant unique)
    const { data: existing } = await supabase
      .from(KEEPALIVE_TABLE)
      .select("title")
      .eq("title", todayId)
      .single();

    if (existing) {
      console.log(`[Keepalive] L'enregistrement pour aujourd'hui existe déjà: ${todayId}`);
      return;
    }

    // Créer l'enregistrement keepalive
    // Note: On utilise title au lieu de id car id est UUID par défaut
    // On va utiliser title comme identifiant unique pour les keepalive
    const { error } = await supabase.from(KEEPALIVE_TABLE).insert({
      title: todayId, // Utiliser title comme identifiant unique
      description: null,
      image_url: null,
      technologies: [],
      github_url: null,
      demo_url: null,
      created_at: today,
    });

    if (error) {
      // Si l'erreur est due à une contrainte unique ou si l'enregistrement existe déjà, c'est OK
      if (error.code === "23505" || error.message.includes("duplicate")) {
        console.log(`[Keepalive] L'enregistrement existe déjà: ${todayId}`);
      } else {
        throw error;
      }
    } else {
      console.log(`[Keepalive] Enregistrement créé avec succès: ${todayId}`);
    }
  } catch (error: any) {
    console.error("[Keepalive] Erreur lors de la création de l'enregistrement:", error);
    // Ne pas bloquer l'application en cas d'erreur
  }
}

/**
 * Supprime l'enregistrement keepalive de la veille
 */
async function deleteOldKeepaliveRecord(): Promise<void> {
  if (!supabase) {
    return;
  }

  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayId = getKeepaliveId(yesterday);

    // Supprimer l'enregistrement d'hier
    const { error } = await supabase
      .from(KEEPALIVE_TABLE)
      .delete()
      .eq("title", yesterdayId);

    if (error) {
      // Si l'enregistrement n'existe pas, ce n'est pas grave
      if (error.code !== "PGRST116") {
        throw error;
      }
    } else {
      console.log(`[Keepalive] Ancien enregistrement supprimé: ${yesterdayId}`);
    }

    // Nettoyer aussi tous les autres enregistrements keepalive qui ne sont pas d'aujourd'hui
    // (au cas où il y aurait des enregistrements orphelins)
    const todayId = getKeepaliveId();
    const { error: cleanupError } = await supabase
      .from(KEEPALIVE_TABLE)
      .delete()
      .like("title", `${KEEPALIVE_PREFIX}%`)
      .neq("title", todayId);

    if (cleanupError && cleanupError.code !== "PGRST116") {
      console.warn("[Keepalive] Erreur lors du nettoyage:", cleanupError);
    }
  } catch (error: any) {
    console.error("[Keepalive] Erreur lors de la suppression de l'ancien enregistrement:", error);
    // Ne pas bloquer l'application en cas d'erreur
  }
}

/**
 * Exécute le keepalive (supprime l'ancien et crée le nouveau)
 */
export async function runKeepalive(): Promise<void> {
  if (!supabase) {
    console.warn("[Keepalive] Supabase n'est pas configuré, keepalive ignoré");
    return;
  }

  try {
    console.log("[Keepalive] Exécution du keepalive...");
    await deleteOldKeepaliveRecord();
    await createKeepaliveRecord();
    console.log("[Keepalive] Keepalive exécuté avec succès");
  } catch (error: any) {
    console.error("[Keepalive] Erreur lors de l'exécution du keepalive:", error);
    // Ne pas bloquer l'application en cas d'erreur
  }
}

/**
 * Vérifie l'état actuel du keepalive
 */
export async function checkKeepalive(): Promise<{
  isActive: boolean;
  todayRecord: any | null;
  yesterdayRecord: any | null;
  error?: string;
}> {
  if (!supabase) {
    return {
      isActive: false,
      todayRecord: null,
      yesterdayRecord: null,
      error: "Supabase n'est pas configuré",
    };
  }

  try {
    const todayId = getKeepaliveId();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayId = getKeepaliveId(yesterday);

    // Récupérer l'enregistrement d'aujourd'hui
    const { data: todayData, error: todayError } = await supabase
      .from(KEEPALIVE_TABLE)
      .select("*")
      .eq("title", todayId)
      .single();

    // Récupérer l'enregistrement d'hier
    const { data: yesterdayData, error: yesterdayError } = await supabase
      .from(KEEPALIVE_TABLE)
      .select("*")
      .eq("title", yesterdayId)
      .single();

    return {
      isActive: true,
      todayRecord: todayData || null,
      yesterdayRecord: yesterdayData || null,
      error: todayError && todayError.code !== "PGRST116" ? todayError.message : undefined,
    };
  } catch (error: any) {
    return {
      isActive: false,
      todayRecord: null,
      yesterdayRecord: null,
      error: error.message || "Erreur inconnue",
    };
  }
}

let keepaliveInterval: NodeJS.Timeout | null = null;
let isInitialized = false;

/**
 * Initialise le système de keepalive
 * - Vérifie si Supabase est activé
 * - Exécute le keepalive au démarrage
 * - Programme une vérification toutes les heures
 * - Expose les fonctions de debug dans la console
 */
export function initKeepalive(): void {
  // Éviter la double initialisation
  if (isInitialized) {
    console.warn("[Keepalive] Le système est déjà initialisé");
    return;
  }

  // Vérifier si Supabase est configuré
  if (!supabase) {
    console.warn("[Keepalive] Supabase n'est pas configuré, le keepalive ne sera pas actif");
    return;
  }

  console.log("[Keepalive] Initialisation du système de keepalive...");

  // Exécuter immédiatement au démarrage
  runKeepalive().catch((error) => {
    console.error("[Keepalive] Erreur lors de l'exécution initiale:", error);
  });

  // Programmer une vérification toutes les heures
  keepaliveInterval = setInterval(() => {
    runKeepalive().catch((error) => {
      console.error("[Keepalive] Erreur lors de l'exécution périodique:", error);
    });
  }, CHECK_INTERVAL_MS);

  // Exposer les fonctions de debug dans la console (uniquement côté client)
  if (typeof window !== "undefined") {
    (window as any).checkKeepalive = checkKeepalive;
    (window as any).runKeepalive = runKeepalive;
    console.log(
      "[Keepalive] Système initialisé. Utilisez checkKeepalive() et runKeepalive() dans la console pour le debug."
    );
  }

  isInitialized = true;
}

/**
 * Arrête le système de keepalive
 */
export function stopKeepalive(): void {
  if (keepaliveInterval) {
    clearInterval(keepaliveInterval);
    keepaliveInterval = null;
  }
  isInitialized = false;
  console.log("[Keepalive] Système arrêté");
}
