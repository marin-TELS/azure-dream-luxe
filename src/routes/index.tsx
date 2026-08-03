import { createFileRoute } from "@tanstack/react-router";
import { SiteNavigation } from "@/components/SiteNavigation";
import { Hero } from "@/components/Hero";

const HERO_IMAGE =
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-102248455669a583357a0882.61075939.1920.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Villa Rêve d'Azur — Villa d'exception à Saint-Tropez" },
      {
        name: "description",
        content:
          "Villa historique méditerranéenne à Saint-Tropez : plage privée, vue mer, 10 chambres, 550 m². Réservation directe.",
      },
      { property: "og:title", content: "Villa Rêve d'Azur — Saint-Tropez" },
      {
        property: "og:description",
        content:
          "Plage privée, bouée d'ancrage, vue mer — à 500 m de la place des Lices. 20 personnes, 10 chambres.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: HERO_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: HERO_IMAGE },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavigation />
      <main>
        <Hero />
      </main>
    </div>
  );
}
