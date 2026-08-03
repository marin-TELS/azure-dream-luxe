import { Reveal } from "@/components/Reveal";

const seasons = [
  ["Basse saison", "Nov. 2026 – Avr. 2027", "[À confirmer]", "5 nuits min."],
  ["Moyenne saison", "Oct. 2026", "[À confirmer]", "7 nuits min."],
  ["Haute saison", "Sep. – Oct. 2026", "[À confirmer]", "7 nuits min."],
  ["Très haute saison", "Fin juin – début sep. 2026", "[À confirmer]", "7 nuits min."],
];

const conditions = [
  "Check-in 17h00",
  "Check-out 10h00",
  "Caution 50 000 € (pré-autorisation)",
  "Ménage fin de séjour 1 800 €",
  "État des lieux 1 200 €",
  "Taxe de séjour 6,91 €/adulte/nuit",
  "Acompte 50 % non remboursable",
  "Solde 65 jours avant arrivée",
];

const options = [
  "Chef privé",
  "Petit-déjeuner",
  "Chauffeur",
  "Coach sportif",
  "Yoga",
  "Massages",
  "Ménage additionnel 30 €/h",
  "Assurance annulation",
];

export function Pricing() {
  return (
    <section id="tarifs" className="bg-background px-6 py-16 md:px-12 md:py-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="text-center">
          <p className="text-[13px] uppercase tracking-[0.2em] text-muted-foreground">
            Réservation directe
          </p>
          <h2 className="mt-6 font-display text-[32px] leading-[1.15] text-foreground md:text-[56px]">
            Tarifs
          </h2>
          <p className="mt-4 text-[16px] text-muted-foreground md:text-[18px]">
            Sans commission d'intermédiaire.
          </p>
        </Reveal>

        <Reveal className="mt-12 md:mt-16">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse border border-border text-[16px]">
              <caption className="sr-only">Tarifs par saison</caption>
              <tbody>
                {seasons.map(([name, period, price, min]) => (
                  <tr key={name} className="border-b border-border last:border-b-0">
                    <th scope="row" className="border-r border-border px-5 py-4 text-left font-normal text-foreground">
                      {name}
                    </th>
                    <td className="border-r border-border px-5 py-4 text-muted-foreground">{period}</td>
                    <td className="border-r border-border px-5 py-4 text-foreground">{price}</td>
                    <td className="px-5 py-4 text-muted-foreground">{min}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[15px] italic text-muted-foreground">
            Tarifs directs propriétaire, sans commission. À remplacer par les tarifs nets confirmés
            avant mise en ligne.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="border-l-[3px] border-accent bg-surface p-6 md:p-8">
            <h3 className="font-display text-[24px] text-foreground md:text-[32px]">Conditions</h3>
            <ul className="mt-6 grid grid-cols-1 gap-3 text-[16px] text-foreground/80 md:grid-cols-2">
              {conditions.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <h3 className="font-display text-[24px] text-foreground md:text-[32px]">Options</h3>
          <ul className="mt-6 grid grid-cols-1 gap-3 text-[16px] text-foreground/80 sm:grid-cols-2">
            {options.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-block rounded-[2px] bg-accent px-11 py-[18px] text-[13px] uppercase tracking-[0.12em] text-accent-foreground transition-colors duration-[250ms] hover:bg-foreground"
          >
            Vérifier les disponibilités
          </a>
        </Reveal>
      </div>
    </section>
  );
}
