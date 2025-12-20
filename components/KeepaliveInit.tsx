"use client";

import { useEffect } from "react";
import { initKeepalive } from "@/lib/keepalive";

/**
 * Composant client pour initialiser le système de keepalive
 * Doit être utilisé dans un composant client car il utilise useEffect
 */
export function KeepaliveInit() {
  useEffect(() => {
    // Initialiser le keepalive au montage du composant
    initKeepalive();

    // Cleanup à la destruction du composant (optionnel, mais bon pour le développement)
    return () => {
      // Note: On ne nettoie pas vraiment car on veut que le keepalive continue
      // même si le composant est démonté (dans le cas d'un hot reload)
    };
  }, []);

  // Ce composant ne rend rien
  return null;
}
