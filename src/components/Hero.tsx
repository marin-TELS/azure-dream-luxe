import { ChevronDown } from "lucide-react";

const HERO_IMAGE =
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-102248455669a583357a0882.61075939.1920.jpg";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex h-[92vh] items-center justify-center overflow-hidden lg:h-screen"
    >
      <img
        src={HERO_IMAGE}
        alt="Façade principale de la Villa Rêve d'Azur à Saint-Tropez, vue sur la mer Méditerranée"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "var(--hero-overlay)" }}
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center md:px-12">
        <p className="text-[13px] uppercase tracking-[0.2em] text-background/85">
          Saint-Tropez · Var
        </p>

        <h1 className="mt-6 font-display text-[42px] leading-[1.05] tracking-[-0.02em] text-background md:text-[64px] lg:text-[88px]">
          Villa Rêve d'Azur
        </h1>

        <p className="mt-6 max-w-[640px] font-display text-[18px] italic leading-snug text-background/90 md:text-[24px]">
          Plage privée, bouée d'ancrage, vue mer — à 500 m de la place des Lices.
        </p>

        <span aria-hidden="true" className="my-8 block h-px w-[60px] bg-background/40" />

        <p className="text-[14px] tracking-[0.1em] text-background/85">
          <span className="block md:inline">20 personnes · 10 chambres</span>
          <span className="hidden md:inline"> · </span>
          <span className="block md:inline">550 m²</span>
        </p>

        <a
          href="#contact"
          className="mt-10 w-full rounded-[2px] border border-accent bg-accent px-11 py-[18px] text-[13px] uppercase tracking-[0.12em] text-accent-foreground transition-all duration-[250ms] hover:bg-background hover:text-accent sm:w-auto"
        >
          Réserver directement
        </a>
      </div>

      <a
        href="#la-villa"
        aria-label="Faire défiler vers le bas"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-background/70"
      >
        <ChevronDown className="h-6 w-6 animate-hero-bounce" />
      </a>
    </section>
  );
}
