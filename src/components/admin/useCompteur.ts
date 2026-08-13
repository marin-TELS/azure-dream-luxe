import { useEffect, useState } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Compte de 0 à `valeur` en `duree` ms avec une courbe easeOutExpo. */
export function useCompteur(valeur: number, duree = 900) {
  const [affiche, setAffiche] = useState(() => (prefersReducedMotion() ? valeur : 0));

  useEffect(() => {
    if (prefersReducedMotion() || typeof requestAnimationFrame === "undefined") {
      setAffiche(valeur);
      return;
    }
    let raf = 0;
    const depart = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - depart) / duree);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setAffiche(valeur * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [valeur, duree]);

  return affiche;
}
