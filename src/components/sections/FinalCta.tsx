import { Reveal } from "@/components/Reveal";

export function FinalCta() {
  return (
    <section id="contact" className="bg-foreground px-6 py-16 md:px-12 md:py-[120px]">
      <Reveal className="mx-auto max-w-[760px] text-center">
        <h2 className="font-display text-[32px] leading-[1.15] text-background md:text-[56px]">
          Réservez sans intermédiaire
        </h2>
        <p className="mx-auto mt-6 max-w-[600px] text-[16px] leading-[1.65] text-muted-foreground md:text-[18px]">
          En réservant directement, vous traitez avec le propriétaire. Pas de commission, pas
          d'intermédiaire. Réponse sous 24 heures.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href="mailto:contact@villarevdazur.fr"
            className="font-display text-[24px] text-background transition-colors duration-[250ms] hover:text-accent md:text-[32px]"
          >
            contact@villarevdazur.fr
          </a>
          <a
            href="tel:+33600000000"
            className="text-[16px] tracking-[0.1em] text-muted-foreground transition-colors duration-[250ms] hover:text-accent md:text-[18px]"
          >
            +33 6 00 00 00 00
          </a>
        </div>
        <a
          href="#reserver"
          className="mt-10 inline-block rounded-[2px] bg-accent px-11 py-[18px] text-[13px] uppercase tracking-[0.12em] text-accent-foreground transition-colors duration-[250ms] hover:bg-background hover:text-foreground"
        >
          ↑ Voir le formulaire de réservation
        </a>
      </Reveal>
    </section>
  );
}
