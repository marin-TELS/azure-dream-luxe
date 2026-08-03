import { Reveal } from "@/components/Reveal";

export function Introduction() {
  return (
    <section className="bg-background px-6 py-16 md:px-12 md:py-[120px]">
      <Reveal className="mx-auto max-w-[760px] text-center">
        <p className="text-[13px] uppercase tracking-[0.2em] text-muted-foreground">
          Saint-Tropez · Côte d'Azur
        </p>
        <h2 className="mt-6 font-display text-[32px] leading-[1.15] tracking-[-0.01em] text-foreground md:text-[56px]">
          Une propriété historique au cœur du domaine des Graniers
        </h2>
        <p className="mt-8 text-[16px] leading-[1.65] text-foreground/80 md:text-[18px]">
          Dans le domaine privé des Graniers, à 500 mètres de la place des Lices, Villa Rêve d'Azur
          réunit dix chambres privées sur 550 m² et un terrain de 4 500 m² ouvrant sur la plage des
          Graniers. La piscine 6 × 10 m, la bouée d'ancrage privée et le ménage quotidien composent
          un séjour sans contrainte pour vingt personnes.
        </p>
      </Reveal>
    </section>
  );
}
