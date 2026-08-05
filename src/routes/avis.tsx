import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Check } from "lucide-react";
import { Toaster, toast } from "sonner";
import { publicGet, publicPost } from "@/lib/villaApi";

export const Route = createFileRoute("/avis")({
  head: () => ({
    meta: [
      { title: "Déposer un avis — Villa Rêve d'Azur" },
      { name: "description", content: "Partagez votre expérience après votre séjour à la Villa Rêve d'Azur." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Déposer un avis — Villa Rêve d'Azur" },
      { property: "og:description", content: "Partagez votre expérience après votre séjour à la Villa Rêve d'Azur." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AvisPage,
});

type TokenState =
  | { kind: "loading" }
  | { kind: "invalide"; message: string }
  | {
      kind: "ok";
      bien: { nom: string; ville?: string };
      sejour: { nom: string; date_arrivee: string; date_depart: string };
    };

function fmt(d: string) {
  const date = new Date(`${d}T00:00:00`);
  if (Number.isNaN(date.getTime())) return d;
  return format(date, "d MMMM yyyy", { locale: fr });
}

function AvisPage() {
  const [state, setState] = useState<TokenState>({ kind: "loading" });
  const [token, setToken] = useState("");
  const [note, setNote] = useState(0);
  const [hover, setHover] = useState(0);
  const [titre, setTitre] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("token") ?? "";
    setToken(t);
    if (!t) {
      setState({ kind: "invalide", message: "Ce lien n'est plus valide." });
      return;
    }
    publicGet<{ deja?: boolean; bien?: any; sejour?: any }>(
      `/avis?token=${encodeURIComponent(t)}`,
    )
      .then(({ status, data }) => {
        if (status === 409 || data?.deja) {
          setState({ kind: "invalide", message: "Vous avez déjà déposé votre avis. Merci !" });
        } else if (status === 200 && data?.bien && data?.sejour) {
          setState({ kind: "ok", bien: data.bien, sejour: data.sejour });
        } else {
          setState({ kind: "invalide", message: "Ce lien n'est plus valide." });
        }
      })
      .catch(() => setState({ kind: "invalide", message: "Ce lien n'est plus valide." }));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (note < 1) {
      toast.error("Merci d'attribuer une note.");
      return;
    }
    setSending(true);
    try {
      const { status, data } = await publicPost<{ error?: string }>("/avis", {
        token,
        note,
        titre: titre.trim() || null,
        commentaire: commentaire.trim() || null,
      });
      if (status >= 200 && status < 300) setDone(true);
      else toast.error(data?.error ?? "Une erreur est survenue.");
    } catch {
      toast.error("Impossible d'envoyer votre avis.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface px-6 py-20">
      <Toaster position="top-center" richColors />
      <main className="mx-auto w-full max-w-[560px] rounded-[2px] bg-background p-8 shadow-[0_1px_0_0_var(--color-border)] md:p-12">
        {state.kind === "loading" && (
          <p className="text-center text-[16px] text-muted-foreground">Chargement…</p>
        )}

        {state.kind === "invalide" && (
          <div className="text-center">
            <h1 className="font-display text-[28px] leading-[1.2] text-foreground md:text-[32px]">
              {state.message}
            </h1>
          </div>
        )}

        {state.kind === "ok" && !done && (
          <>
            <h1 className="font-display text-[28px] leading-[1.2] text-foreground md:text-[36px]">
              Votre séjour à {state.bien.nom}
            </h1>
            <p className="mt-3 text-[16px] text-muted-foreground">
              Du {fmt(state.sejour.date_arrivee)} au {fmt(state.sejour.date_depart)}
              {state.bien.ville ? ` · ${state.bien.ville}` : ""}
            </p>

            <form onSubmit={submit} className="mt-10 flex flex-col gap-6">
              <div>
                <span className="mb-3 block text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
                  Votre note *
                </span>
                <div className="flex gap-2" onMouseLeave={() => setHover(0)}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
                      onClick={() => setNote(n)}
                      onMouseEnter={() => setHover(n)}
                      className={`transition-colors duration-200 ${
                        (hover || note) >= n ? "text-accent" : "text-border"
                      }`}
                    >
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.4l-5.81 3-1.11-6.47L.38 9.35l6.5-.95L12 2.5z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="avis-titre"
                  className="mb-2 block text-[12px] uppercase tracking-[0.12em] text-muted-foreground"
                >
                  Titre
                </label>
                <input
                  id="avis-titre"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  maxLength={120}
                  className="w-full rounded-[2px] border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none transition-colors focus:border-accent"
                />
              </div>

              <div>
                <label
                  htmlFor="avis-commentaire"
                  className="mb-2 block text-[12px] uppercase tracking-[0.12em] text-muted-foreground"
                >
                  Votre commentaire
                </label>
                <textarea
                  id="avis-commentaire"
                  rows={6}
                  value={commentaire}
                  onChange={(e) => setCommentaire(e.target.value)}
                  maxLength={2000}
                  className="w-full resize-none rounded-[2px] border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none transition-colors focus:border-accent"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-[2px] bg-accent px-11 py-[18px] text-[13px] uppercase tracking-[0.12em] text-accent-foreground transition-colors duration-[250ms] hover:opacity-90 disabled:opacity-60"
              >
                {sending ? "Envoi en cours…" : "Envoyer mon avis"}
              </button>
            </form>
          </>
        )}

        {state.kind === "ok" && done && (
          <div className="flex flex-col items-center py-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
              <Check className="h-8 w-8 text-accent-foreground" />
            </span>
            <h1 className="mt-8 font-display text-[28px] text-foreground md:text-[32px]">
              Merci ! Votre avis a bien été enregistré.
            </h1>
            <p className="mt-4 text-[16px] leading-[1.65] text-muted-foreground">
              Il sera publié sur le site après relecture du propriétaire.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
