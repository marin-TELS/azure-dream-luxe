import { Reveal } from "@/components/Reveal";

const cards = [
  {
    title: "Salon",
    image:
      "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-64007441469a58342bf3319.02616563.1920.jpg",
    text: "Pièce maîtresse de la maison principale. Cheminée décorative, canapés larges, lumière naturelle. Accès direct sur la terrasse couverte et la salle à manger.",
  },
  {
    title: "Salle à manger",
    image:
      "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-28891630769a5832f8c9b65.36278620.1920.jpg",
    text: "Table pour 18 à 20 personnes sous une verrière lumineuse. Prolongée par la terrasse extérieure pour les dîners au barbecue.",
  },
  {
    title: "Cuisine",
    image:
      "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-89575872269a5833a43da87.97167594.1920.jpg",
    text: "Entièrement équipée dans la maison principale. La dépendance dispose de sa propre cuisine indépendante — deux équipes cuisinent simultanément sans se croiser.",
  },
  {
    title: "Véranda",
    image:
      "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-190089435869a5833d687503.75039197.1920.jpg",
    text: "Espace de transition entre intérieur et jardin. Lumière filtrée, mobilier lounge. Troisième espace de repas pour les matinées calmes.",
  },
  {
    title: "Piscine",
    image:
      "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-185480223869a583335db439.37579063.1920.jpg",
    text: "6 × 10 m, profondeur maximale 3 m, plein sud. Entourée de chaises longues et végétation méditerranéenne. Pisciniste hebdomadaire inclus.",
  },
  {
    title: "Terrasse & jardin",
    image:
      "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-170579129269a583392db3c5.08915544.1920.jpg",
    text: "4 500 m² de terrain luxuriant. Barbecue, espace repas extérieur, terrain de pétanque. Accès direct à la plage privée des Graniers.",
  },
  {
    title: "10 chambres privées",
    image:
      "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-147696116669a5833bcb1cf2.42245264.1920.jpg",
    text: "Deux chambres dans la maison principale (lits 180 cm, baignoire), huit dans la dépendance (lits 160-180 cm, douche privative). Deux suites avec salon et kitchenette attenants.",
  },
  {
    title: "Plage privée des Graniers",
    image:
      "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-178954105369a583367ef6b6.64711366.1920.jpg",
    text: "Accès direct depuis le jardin. Bouée d'ancrage privée à 50 m pour embarcations jusqu'à 12 m. Sable naturel, calme préservé.",
  },
];

export function Spaces() {
  return (
    <section className="bg-background px-6 py-16 md:px-12 md:py-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="text-center">
          <p className="text-[13px] uppercase tracking-[0.2em] text-muted-foreground">
            Intérieur · Extérieur
          </p>
          <h2 className="mt-6 font-display text-[32px] leading-[1.15] text-foreground md:text-[56px]">
            Les espaces
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={(i % 2) * 80}>
              <article className="group h-full overflow-hidden rounded-[2px] border border-border bg-background transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  decoding="async"
                  className="aspect-3/2 w-full object-cover"
                />
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-[24px] leading-tight text-foreground md:text-[32px]">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-[16px] leading-[1.65] text-foreground/75 md:text-[18px]">
                    {card.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
