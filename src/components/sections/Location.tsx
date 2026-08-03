import { Reveal } from "@/components/Reveal";

const distances = [
  ["Plage des Graniers (accès direct)", "0 m"],
  ["Place des Lices", "500 m"],
  ["Caves du Roy", "À pied"],
  ["Port de Saint-Tropez", "~1,5 km"],
  ["Gare de Hyères", "~1 h"],
  ["Gare Les Arcs-Draguignan", "~1 h"],
  ["Aéroport Marseille-Provence", "~110 km / 1h45"],
];

export function Location() {
  return (
    <section id="saint-tropez" className="bg-surface px-6 py-16 md:px-12 md:py-[120px]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-8 lg:grid-cols-[45fr_55fr] lg:gap-14">
        <Reveal>
          <p className="text-[13px] uppercase tracking-[0.2em] text-muted-foreground">
            Saint-Tropez · Var
          </p>
          <h2 className="mt-6 font-display text-[32px] leading-[1.15] text-foreground md:text-[56px]">
            Le lieu
          </h2>
          <p className="mt-8 text-[16px] leading-[1.65] text-foreground/80 md:text-[18px]">
            Saint-Tropez, Var (83). Le domaine privé des Graniers est l'un des rares secteurs
            résidentiels à combiner intimité et accès direct à la mer, à 500 mètres de la place des
            Lices et des Caves du Roy. La plage des Graniers — sable naturel, calme préservé — est
            accessible directement depuis le jardin.
          </p>

          <table className="mt-10 w-full border-collapse text-[15px]">
            <caption className="sr-only">Distances depuis la Villa Rêve d'Azur</caption>
            <tbody>
              {distances.map(([label, value], i) => (
                <tr key={label} className={i % 2 === 0 ? "bg-background" : "bg-surface"}>
                  <th scope="row" className="px-4 py-3 text-left font-normal text-foreground">
                    {label}
                  </th>
                  <td className="px-4 py-3 text-right text-muted-foreground">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal delay={100}>
          <iframe
            title="Carte de Saint-Tropez"
            src="https://www.google.com/maps?q=Saint-Tropez,%20Var,%20France&z=13&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[480px] w-full rounded-[2px] border border-border"
            style={{ filter: "grayscale(1) contrast(1.05)" }}
          />
        </Reveal>
      </div>
    </section>
  );
}
