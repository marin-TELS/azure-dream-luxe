import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "La Villa", href: "#la-villa" },
  { label: "Galerie", href: "#galerie" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Saint-Tropez", href: "#saint-tropez" },
  { label: "Contact", href: "#contact" },
];

export function SiteNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const light = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
        light ? "bg-background/95 backdrop-blur-xl shadow-[0_1px_0_0_var(--color-border)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 transition-all duration-300 lg:h-20 lg:px-12">
        <a
          href="#top"
          className={`font-display text-[20px] tracking-[0.05em] transition-colors duration-300 ${
            light ? "text-foreground" : "text-background"
          }`}
        >
          Villa Rêve d'Azur
        </a>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={`text-[14px] uppercase tracking-[0.12em] transition-colors duration-300 hover:text-accent ${
                    light ? "text-foreground" : "text-background"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden rounded-[2px] bg-accent px-7 py-[14px] text-[13px] uppercase tracking-[0.12em] text-accent-foreground transition-all duration-300 hover:bg-background hover:text-accent hover:shadow-[inset_0_0_0_1px_var(--color-accent)] lg:inline-block"
          >
            Réserver
          </a>
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`transition-colors duration-300 lg:hidden ${
              light ? "text-foreground" : "text-background"
            }`}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden">
          <div className="flex h-16 items-center justify-between px-6">
            <span className="font-display text-[20px] tracking-[0.05em] text-foreground">
              Villa Rêve d'Azur
            </span>
            <button
              type="button"
              aria-label="Fermer le menu"
              onClick={() => setOpen(false)}
              className="text-foreground"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav aria-label="Navigation mobile" className="flex flex-1 flex-col items-center justify-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-[28px] text-foreground transition-colors duration-300 hover:text-accent"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-[2px] bg-accent px-7 py-[14px] text-[13px] uppercase tracking-[0.12em] text-accent-foreground"
            >
              Réserver
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
