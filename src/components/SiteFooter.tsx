const links = [
  { label: "La villa", href: "#la-villa" },
  { label: "Galerie", href: "#galerie" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Contact", href: "#contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface px-6 py-16 md:px-12">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
        <div>
          <p className="font-display text-[20px] tracking-[0.05em] text-foreground">
            Villa Rêve d'Azur
          </p>
          <p className="mt-3 text-[14px] text-muted-foreground">Saint-Tropez — Var</p>
        </div>

        <nav aria-label="Navigation pied de page">
          <ul className="space-y-3">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-[14px] text-muted-foreground transition-colors hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="space-y-2 text-[13px] text-muted-foreground">
          <li>Propriétaire [à compléter]</li>
          <li>SIRET [à compléter]</li>
          <li>N° enregistrement [à compléter]</li>
          <li>Email [à compléter]</li>
        </ul>
      </div>

      <p className="mx-auto mt-12 max-w-[1280px] text-center text-[13px] text-muted-foreground">
        © 2026 Villa Rêve d'Azur · Mentions légales · Politique de confidentialité
      </p>
    </footer>
  );
}
