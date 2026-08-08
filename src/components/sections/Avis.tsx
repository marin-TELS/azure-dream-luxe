import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Reveal } from "@/components/Reveal";
import { Stars } from "@/components/Stars";
import { BIEN, publicGet } from "@/lib/villaApi";

type AvisItem = {
  id?: string;
  note: number;
  titre?: string | null;
  commentaire?: string | null;
  auteur_nom?: string | null;
  date_sejour?: string | null;
  reponse?: string | null;
  verifie?: boolean;
};

type AvisResponse = {
  avis?: AvisItem[];
  nombre?: number;
  moyenne?: number;
  repartition?: { note: number; nombre: number }[];
  nombre_verifies?: number;
  moyenne_verifies?: number;
  mention_legale?: string | null;
};

function moisSejour(date?: string | null) {
  if (!date) return "";
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  const label = format(d, "LLLL yyyy", { locale: fr });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function Avis() {
  const [data, setData] = useState<AvisResponse | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    publicGet<AvisResponse>(`/avis?bien=${BIEN}`)
      .then(({ status, data }) => {
        // Réponse d'erreur (404 « Bien introuvable », etc.) : on ignore, la section reste masquée.
        if (!cancelled && status === 200) setData(data);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const nombre = data?.nombre ?? 0;
  if (!data || nombre === 0) return null;

  const avis = data.avis ?? [];
  const moyenne = data.moyenne ?? 0;
  const repartition = data.repartition ?? [];
  const visibles = expanded ? avis : avis.slice(0, 6);

  return (
    <section id="avis" className="bg-surface px-6 py-16 md:px-12 md:py-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="text-center">
          <p className="text-[13px] uppercase tracking-[0.2em] text-accent">Avis</p>
          <h2 className="mt-4 font-display text-[32px] leading-[1.15] text-foreground md:text-[56px]">
            Ils ont séjourné à la villa
          </h2>
        </Reveal>

        <Reveal
          delay={80}
          className="mt-12 flex flex-col items-center gap-10 border-b border-border pb-12 md:flex-row md:items-center md:justify-center md:gap-16"
        >
          <div className="text-center">
            <p className="font-display text-[64px] leading-none text-foreground md:text-[80px]">
              {moyenne.toFixed(1).replace(".", ",")}
            </p>
            <Stars value={moyenne} size={22} className="mt-4 justify-center" />
            <p className="mt-3 text-[14px] tracking-[0.1em] text-muted-foreground">
              {nombre} avis
              {(data.nombre_verifies ?? 0) > 0 ? ` dont ${data.nombre_verifies} vérifiés` : ""}
            </p>
          </div>

          <div className="w-full max-w-[360px] space-y-2">
            {[5, 4, 3, 2, 1].map((note) => {
              const n = repartition.find((r) => r.note === note)?.nombre ?? 0;
              const pct = nombre > 0 ? (n / nombre) * 100 : 0;
              return (
                <div key={note} className="flex items-center gap-3">
                  <span className="w-8 text-[13px] text-muted-foreground">{note}★</span>
                  <span className="h-[6px] flex-1 overflow-hidden rounded-[2px] bg-border">
                    <span
                      className="block h-full bg-accent transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                  <span className="w-6 text-right text-[13px] text-muted-foreground">{n}</span>
                </div>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibles.map((a, i) => (
            <Reveal
              key={a.id ?? i}
              delay={(i % 3) * 80}
              className="flex flex-col rounded-[2px] bg-background p-7 shadow-[0_1px_0_0_var(--color-border)]"
            >
              <Stars value={a.note} size={16} />
              {a.verifie === true && (
                <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-accent">
                  ✓ Séjour vérifié
                </p>
              )}
              {a.titre && (
                <h3 className="mt-4 font-display text-[20px] leading-[1.3] text-foreground md:text-[24px]">
                  {a.titre}
                </h3>
              )}
              {a.commentaire && (
                <p className="mt-3 flex-1 text-[16px] leading-[1.65] text-foreground/80">
                  {a.commentaire}
                </p>
              )}
              {a.reponse && (
                <div className="mt-5 border-l-2 border-accent pl-4">
                  <p className="text-[12px] uppercase tracking-[0.12em] text-accent">
                    Réponse du propriétaire
                  </p>
                  <p className="mt-2 text-[15px] leading-[1.6] text-muted-foreground">
                    {a.reponse}
                  </p>
                </div>
              )}
              <p className="mt-6 text-[13px] uppercase tracking-[0.1em] text-muted-foreground">
                {a.auteur_nom}
                {a.date_sejour ? ` · ${moisSejour(a.date_sejour)}` : ""}
              </p>
            </Reveal>
          ))}
        </div>

        {data.mention_legale && (
          <p className="mx-auto mt-10 max-w-[760px] text-center text-[12px] leading-[1.6] text-muted-foreground">
            {data.mention_legale}
          </p>
        )}



        {!expanded && avis.length > 6 && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="rounded-[2px] border border-foreground px-9 py-[16px] text-[13px] uppercase tracking-[0.12em] text-foreground transition-colors duration-[250ms] hover:bg-foreground hover:text-background"
            >
              Voir les {nombre} avis
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
