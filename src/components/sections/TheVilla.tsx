import { Waves, Droplets, Anchor, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const IMAGE =
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-128780682069a58338a3aee0.32460866.1920.jpg";

const highlights = [
  { Icon: Waves, text: "Accès direct · plage privée des Graniers" },
  { Icon: Droplets, text: "Piscine 6 × 10 m · 3 m de profondeur" },
  { Icon: Anchor, text: "Bouée d'ancrage privée · bateaux jusqu'à 12 m" },
  { Icon: Sparkles, text: "Ménage quotidien · 10 h/jour inclus" },
];

export function TheVilla() {
  return (
    <section id="la-villa" className="bg-surface px-6 py-16 md:px-12 md:py-[120px]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 lg:grid-cols-[55fr_45fr] lg:gap-14">
        <Reveal>
          <p className="text-[13px] uppercase tracking-[0.2em] text-muted-foreground">La Villa</p>
          <h2 className="mt-6 font-display text-[32px] leading-[1.15] tracking-[-0.01em] text-foreground md:text-[56px]">
            550 m² dans un domaine privé de Saint-Tropez
          </h2>
          <p className="mt-8 text-[16px] leading-[1.65] text-foreground/80 md:text-[18px]">
            Villa historique méditerranéenne implantée dans le domaine privé des Graniers — l'un des
            rares terrains clos de Saint-Tropez à offrir un accès direct à la plage. La maison
            principale (2 chambres, salon avec cheminée, salle à manger sous verrière) et la
            dépendance indépendante (8 chambres avec salon et kitchenette propres) permettent à deux
            familles ou à un groupe d'amis de cohabiter sans se perdre. La piscine 6 × 10 m plein sud
            ouvre sur le jardin de 4 500 m². Chaque chambre dispose de sa salle de bain privée. Une
            bouée d'ancrage est réservée à 50 mètres de la plage pour les bateaux jusqu'à 12 m. Le
            ménage quotidien (10 h/jour, hors dimanche) libère chaque heure pour profiter.
          </p>
          <ul className="mt-10 space-y-5">
            {highlights.map(({ Icon, text }) => (
              <li key={text} className="flex items-start gap-4">
                <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.25} />
                <span className="text-[15px] leading-relaxed text-foreground">{text}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <img
            src={IMAGE}
            alt="Vue extérieure de la Villa Rêve d'Azur et de son jardin méditerranéen"
            loading="lazy"
            decoding="async"
            className="aspect-4/5 w-full rounded-[2px] object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
