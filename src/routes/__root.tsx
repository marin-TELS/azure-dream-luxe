import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Villa Rêve d'Azur — Location luxe Saint-Tropez, 10 chambres, plage privée" },
      { name: "description", content: "Villa Rêve d'Azur : villa historique de luxe à Saint-Tropez, domaine des Graniers. 10 chambres, 20 personnes, accès direct plage, piscine privée, bouée d'ancrage. Réservez directement auprès du propriétaire." },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Villa Rêve d'Azur" },
      { property: "og:title", content: "Villa Rêve d'Azur — Location luxe Saint-Tropez, 10 chambres, plage privée" },
      { property: "og:description", content: "Villa Rêve d'Azur : villa historique de luxe à Saint-Tropez, domaine des Graniers. 10 chambres, 20 personnes, accès direct plage, piscine privée, bouée d'ancrage. Réservez directement auprès du propriétaire." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://villarevdazur.fr/" },
      { property: "og:site_name", content: "Villa Rêve d'Azur" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:image", content: "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-102248455669a583357a0882.61075939.1920.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Villa Rêve d'Azur — Location luxe Saint-Tropez, 10 chambres, plage privée" },
      { name: "twitter:description", content: "Villa Rêve d'Azur : villa historique de luxe à Saint-Tropez, domaine des Graniers. 10 chambres, 20 personnes, accès direct plage, piscine privée, bouée d'ancrage." },
      { name: "twitter:image", content: "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-102248455669a583357a0882.61075939.1920.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://villarevdazur.fr/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..600&family=Inter:wght@300..600&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LodgingBusiness",
              "@id": "https://villarevdazur.fr/#lodging",
              name: "Villa Rêve d'Azur",
              description: "Villa historique méditerranéenne de 550 m² dans le domaine privé des Graniers à Saint-Tropez. 10 chambres, accès direct à la plage des Graniers, piscine privée 6×10 m, bouée d'ancrage privée, ménage quotidien inclus. Jusqu'à 20 personnes.",
              url: "https://villarevdazur.fr/",
              image: [
                "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-102248455669a583357a0882.61075939.1920.jpg",
                "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-185480223869a583335db439.37579063.1920.jpg",
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Domaine des Graniers",
                addressLocality: "Saint-Tropez",
                addressRegion: "Var",
                postalCode: "83990",
                addressCountry: "FR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 43.2677,
                longitude: 6.6527,
              },
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "Piscine privée", value: true },
                { "@type": "LocationFeatureSpecification", name: "Accès plage privée", value: true },
                { "@type": "LocationFeatureSpecification", name: "Bouée d'ancrage privée", value: true },
                { "@type": "LocationFeatureSpecification", name: "Ménage quotidien inclus", value: true },
                { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
                { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
                { "@type": "LocationFeatureSpecification", name: "Air conditionné", value: true },
                { "@type": "LocationFeatureSpecification", name: "Salle de sport", value: true },
              ],
              numberOfRooms: 10,
              petsAllowed: false,
              checkinTime: "17:00",
              checkoutTime: "10:00",
              priceRange: "€€€€",
              currenciesAccepted: "EUR",
              containsPlace: {
                "@type": "Accommodation",
                name: "Villa Rêve d'Azur — hébergement complet",
                numberOfRooms: 10,
                occupancy: { "@type": "QuantitativeValue", maxValue: 20 },
              },
            },
            {
              "@type": "FAQPage",
              "@id": "https://villarevdazur.fr/#faq",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Qu'est-ce que la Villa Rêve d'Azur et où se situe-t-elle ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "La Villa Rêve d'Azur est une villa de luxe historique implantée dans le domaine privé des Graniers, à Saint-Tropez, dans le Var (83). Elle occupe un terrain clos de 4 500 m² avec accès direct à la plage des Graniers, à 500 mètres de la place des Lices et des Caves du Roy.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Combien de personnes peut accueillir la Villa Rêve d'Azur ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "La villa peut accueillir jusqu'à 20 personnes réparties dans 10 chambres privées : 2 chambres dans la maison principale et 8 chambres dans la dépendance indépendante. Chaque chambre dispose de sa propre salle de bain.",
                  },
                },
                {
                  "@type": "Question",
                  name: "La villa dispose-t-elle d'un accès direct à la plage ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Oui. La Villa Rêve d'Azur donne directement sur la plage naturelle des Graniers, accessible depuis le jardin sans traverser de voie publique. Une bouée d'ancrage privée est réservée à 50 mètres de la plage pour les embarcations jusqu'à 12 mètres.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quel est l'avantage de réserver directement sans passer par Airbnb ou Booking ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "En réservant directement auprès du propriétaire, vous évitez les commissions de service d'Airbnb (15 à 17 %) et les frais de Booking. Le tarif direct est négocié avec le propriétaire — vous traitez sans intermédiaire. La réponse est garantie sous 24 heures.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Quels services sont inclus dans le tarif de location ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sont inclus : ménage quotidien 10 h/jour (hors dimanche), draps et linge de maison, entretien du jardin, intervention du pisciniste, panier de bienvenue, WiFi haut débit, parking pour 10 voitures, alarme de sécurité.",
                  },
                },
              ],
            },
            {
              "@type": "BreadcrumbList",
              "@id": "https://villarevdazur.fr/#breadcrumb",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil", item: "https://villarevdazur.fr/" },
                { "@type": "ListItem", position: 2, name: "Villa Rêve d'Azur", item: "https://villarevdazur.fr/#la-villa" },
                { "@type": "ListItem", position: 3, name: "Tarifs", item: "https://villarevdazur.fr/#tarifs" },
              ],
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
