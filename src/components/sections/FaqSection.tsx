import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const faqs = [
  {
    q: "Qu'est-ce que la Villa Rêve d'Azur et où se situe-t-elle ?",
    a: "La Villa Rêve d'Azur est une villa de luxe historique implantée dans le domaine privé des Graniers, à Saint-Tropez, dans le Var (83). Elle occupe un terrain clos de 4 500 m² avec accès direct à la plage des Graniers, à 500 mètres de la place des Lices et des Caves du Roy.",
  },
  {
    q: "Combien de personnes peut accueillir la Villa Rêve d'Azur ?",
    a: "La villa peut accueillir jusqu'à 20 personnes réparties dans 10 chambres privées : 2 chambres dans la maison principale et 8 chambres dans la dépendance indépendante. Chaque chambre dispose de sa propre salle de bain.",
  },
  {
    q: "La villa dispose-t-elle d'un accès direct à la plage ?",
    a: "Oui. La Villa Rêve d'Azur donne directement sur la plage naturelle des Graniers, accessible depuis le jardin sans traverser de voie publique. Une bouée d'ancrage privée est réservée à 50 mètres de la plage pour les embarcations jusqu'à 12 mètres.",
  },
  {
    q: "La piscine est-elle privée et ouverte toute la saison ?",
    a: "La villa dispose d'une piscine privée de 6 × 10 mètres, profondeur maximale 3 mètres, exposée plein sud. Elle est entretenue par un pisciniste inclus. L'alarme de piscine réglementaire est en place.",
  },
  {
    q: "Quel est l'avantage de réserver directement sans passer par Airbnb ou Booking ?",
    a: "En réservant directement auprès du propriétaire, vous évitez les commissions de service d'Airbnb (15 à 17 %) et les frais de Booking. Le tarif direct est négocié avec le propriétaire — vous traitez sans intermédiaire. La réponse est garantie sous 24 heures.",
  },
  {
    q: "Quels services sont inclus dans le tarif de location ?",
    a: "Sont inclus : ménage quotidien 10 h/jour (hors dimanche), draps et linge de maison, entretien du jardin, intervention du pisciniste, panier de bienvenue, WiFi haut débit, parking pour 10 voitures, alarme de sécurité.",
  },
  {
    q: "Quelles sont les conditions de réservation et d'annulation ?",
    a: "Check-in à 17h00, check-out à 10h00. Un acompte de 50 % est dû à la réservation (non remboursable). Le solde est exigible 65 jours avant l'arrivée. La caution est de 50 000 € (pré-autorisation bancaire). Le ménage de fin de séjour (1 800 €) et l'état des lieux (1 200 €) sont facturés séparément. La taxe de séjour est de 6,91 €/adulte/nuit.",
  },
  {
    q: "La villa accepte-t-elle les enfants et les animaux de compagnie ?",
    a: "La Villa Rêve d'Azur est adaptée aux familles avec enfants. L'alarme de piscine réglementaire est en place. Concernant les animaux de compagnie, merci de contacter directement le propriétaire pour confirmer les conditions.",
  },
  {
    q: "Quels services optionnels peut-on ajouter à son séjour ?",
    a: "Les options disponibles sur demande incluent : chef privé, service de petit-déjeuner, chauffeur, coach sportif, cours de yoga, massages à domicile, ménage additionnel (30 €/h) et assurance annulation.",
  },
  {
    q: "Comment rejoindre la villa depuis l'aéroport le plus proche ?",
    a: "L'aéroport le plus proche est Toulon-Hyères (TVR), à environ 1 heure. L'aéroport de Nice Côte d'Azur (NCE) est à environ 1h30. Marseille-Provence (MRS) est à environ 1h45. Un service de chauffeur privé peut être organisé sur demande.",
  },
  {
    q: "Est-il possible de louer un bateau ou d'organiser des excursions depuis la villa ?",
    a: "La bouée d'ancrage privée de la villa permet d'accueillir des embarcations jusqu'à 12 mètres. Des prestataires locaux de location de bateaux et d'excursions en mer peuvent être recommandés par le propriétaire.",
  },
  {
    q: "La villa est-elle disponible pour des séminaires ou des événements privés ?",
    a: "La villa peut convenir à des séminaires résidentiels ou des célébrations privées jusqu'à 20 participants en hébergement. Pour les événements de plus grande ampleur, merci de contacter directement le propriétaire afin de définir les conditions spécifiques.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-surface px-6 py-16 md:px-12 md:py-[120px]"
    >
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="text-center">
          <p className="text-[13px] uppercase tracking-[0.2em] text-muted-foreground">
            Questions fréquentes
          </p>
          <h2
            id="faq-heading"
            className="mt-6 font-display text-[32px] leading-[1.15] text-foreground md:text-[56px]"
          >
            FAQ
          </h2>
          <p className="mt-4 text-[16px] text-muted-foreground md:text-[18px]">
            Villa Rêve d'Azur · Saint-Tropez · Location directe propriétaire
          </p>
        </Reveal>

        <Reveal className="mt-12 md:mt-16">
          <dl className="divide-y divide-border">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <dt>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                      id={`faq-question-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-display text-[18px] leading-snug text-foreground md:text-[22px]">
                        {item.q}
                      </span>
                      <span aria-hidden="true" className="mt-1 shrink-0 text-accent">
                        {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                      </span>
                    </button>
                  </dt>
                  <dd
                    id={`faq-answer-${i}`}
                    aria-labelledby={`faq-question-${i}`}
                    role="region"
                    style={{
                      maxHeight: isOpen ? "600px" : "0",
                      overflow: "hidden",
                      transition: "max-height 350ms ease",
                    }}
                  >
                    <p className="pb-6 text-[16px] leading-[1.7] text-foreground/80 md:text-[18px]">
                      {item.a}
                    </p>
                  </dd>
                </div>
              );
            })}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
