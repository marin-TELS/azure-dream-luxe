import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { adminCall, ADMIN_KEY_STORAGE } from "@/lib/villaApi";
import type {
  AdminAvis,
  ListResponse,
  PeriodeBloquee,
  Reservation,
  Stats,
} from "@/lib/adminTypes";
import { APPLE, Btn, Card, FONT_STACK, inputClass, inputStyle } from "@/components/admin/ui";
import { OverviewTab } from "@/components/admin/OverviewTab";
import { DemandesTab } from "@/components/admin/DemandesTab";
import { CalendrierTab } from "@/components/admin/CalendrierTab";
import { AvisTab } from "@/components/admin/AvisTab";
import { BloquerTab } from "@/components/admin/BloquerTab";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Espace propriétaire — Villa Rêve d'Azur" },
      { name: "description", content: "Gestion des réservations, du calendrier et des avis de la Villa Rêve d'Azur." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Espace propriétaire — Villa Rêve d'Azur" },
      { property: "og:description", content: "Gestion des réservations, du calendrier et des avis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

type Tab = "apercu" | "demandes" | "calendrier" | "avis" | "bloquer";

const TABS: { key: Tab; label: string }[] = [
  { key: "apercu", label: "Vue d'ensemble" },
  { key: "demandes", label: "Demandes" },
  { key: "calendrier", label: "Calendrier" },
  { key: "avis", label: "Avis" },
  { key: "bloquer", label: "Bloquer des dates" },
];

function AdminPage() {
  const [key, setKey] = useState<string | null>(null);
  const [keyInput, setKeyInput] = useState("");
  const [checking, setChecking] = useState(false);
  const [booted, setBooted] = useState(false);

  const [tab, setTab] = useState<Tab>("apercu");
  const [data, setData] = useState<ListResponse | null>(null);
  const [bienId, setBienId] = useState<string | undefined>(undefined);
  const [avis, setAvis] = useState<AdminAvis[]>([]);
  const [caduques, setCaduques] = useState<Reservation[] | null>(null);

  const call = useCallback(
    async <T,>(body: Record<string, unknown>) => {
      const k = key ?? "";
      return adminCall<T>(k, bienId ? { ...body, bien_id: bienId } : body);
    },
    [key, bienId],
  );

  const refresh = useCallback(async () => {
    if (!key) return;
    const { status, data } = await call<ListResponse>({ action: "list" });
    if (status === 200) setData(data);
    else if (status === 401) {
      toast.error("Clé incorrecte");
      localStorage.removeItem(ADMIN_KEY_STORAGE);
      setKey(null);
    }
  }, [key, call]);

  useEffect(() => {
    const stored = localStorage.getItem(ADMIN_KEY_STORAGE);
    if (stored) setKey(stored);
    setBooted(true);
  }, []);

  useEffect(() => {
    if (key) void refresh();
  }, [key, bienId, refresh]);

  const loadAvis = useCallback(async () => {
    const { status, data } = await call<{ avis?: AdminAvis[] }>({ action: "avis_list" });
    if (status === 200) setAvis(data?.avis ?? []);
  }, [call]);

  useEffect(() => {
    if (key && tab === "avis") void loadAvis();
  }, [key, tab, loadAvis]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    const { status } = await adminCall(keyInput, { action: "list" });
    setChecking(false);
    if (status === 200) {
      localStorage.setItem(ADMIN_KEY_STORAGE, keyInput);
      setKey(keyInput);
    } else {
      toast.error("Clé incorrecte");
    }
  }

  function logout() {
    localStorage.removeItem(ADMIN_KEY_STORAGE);
    setKey(null);
    setData(null);
    setKeyInput("");
  }

  async function handleStatut(
    r: Reservation,
    statut: string,
    prix_total: number | null,
    notes_internes: string | null,
  ) {
    const { status, data: res } = await call<{
      error?: string;
      code?: string;
      caduques?: Reservation[];
    }>({ action: "statut", id: r.id, statut, prix_total, notes_internes });
    if (status === 409) {
      toast.error(res?.error ?? "Ces dates sont déjà réservées.");
      return;
    }
    if (status !== 200) {
      toast.error(res?.error ?? "Impossible de mettre à jour la demande.");
      return;
    }
    toast.success("Demande mise à jour");
    await refresh();
    if (statut === "confirmee" && res?.caduques && res.caduques.length > 0) {
      setCaduques(res.caduques);
    }
  }

  async function refuserLot(ids: string[]) {
    const { status, data: res } = await call<{ error?: string }>({
      action: "refuser_lot",
      ids,
    });
    if (status === 200) toast.success("Les autres demandes ont été refusées.");
    else toast.error(res?.error ?? "Échec du refus groupé.");
    setCaduques(null);
    await refresh();
  }

  async function bloquer(date_debut: string, date_fin: string, raison: string | null) {
    const { status, data: res } = await call<{ error?: string; code?: string }>({
      action: "bloquer",
      date_debut,
      date_fin,
      raison,
    });
    if (status === 200) {
      toast.success("Dates bloquées");
      await refresh();
      return true;
    }
    toast.error(res?.error ?? "Impossible de bloquer ces dates.");
    return false;
  }

  async function debloquer(id: string) {
    const { status, data: res } = await call<{ error?: string }>({ action: "debloquer", id });
    if (status === 200) {
      toast.success("Période débloquée");
      await refresh();
    } else toast.error(res?.error ?? "Échec du déblocage.");
  }

  if (!booted) return null;

  if (!key) {
    return (
      <div
        className="flex min-h-screen items-center justify-center px-6"
        style={{ background: APPLE.bg, fontFamily: FONT_STACK, color: APPLE.text }}
      >
        <Toaster position="top-center" richColors />
        <Card className="w-full max-w-[400px] p-8">
          <h1 className="text-[24px] font-semibold tracking-tight">Espace propriétaire</h1>
          <form onSubmit={login} className="mt-6 space-y-4">
            <input
              type="password"
              placeholder="Clé d'accès"
              className={inputClass}
              style={inputStyle}
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              required
            />
            <Btn variant="primary" type="submit" disabled={checking} className="w-full">
              {checking ? "Vérification…" : "Entrer"}
            </Btn>
          </form>
        </Card>
      </div>
    );
  }

  const stats: Stats = data?.stats ?? {};
  const reservations: Reservation[] = data?.reservations ?? [];
  const periodes: PeriodeBloquee[] = data?.periodes ?? [];
  const acces = data?.acces;

  return (
    <div
      className="min-h-screen"
      style={{ background: APPLE.bg, fontFamily: FONT_STACK, color: APPLE.text }}
    >
      <Toaster position="top-center" richColors />

      <header className="border-b" style={{ borderColor: APPLE.border, background: "#fff" }}>
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div>
            <h1 className="text-[20px] font-semibold tracking-tight">Espace propriétaire</h1>
            <p className="text-[13px]" style={{ color: APPLE.muted }}>
              {data?.bien?.nom ?? "Villa Rêve d'Azur"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {acces?.multi && (acces.biens?.length ?? 0) > 0 && (
              <select
                className="rounded-xl px-3 py-2 text-[14px]"
                style={inputStyle}
                value={bienId ?? ""}
                onChange={(e) => setBienId(e.target.value || undefined)}
              >
                <option value="">Tous les biens</option>
                {acces.biens?.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.nom}
                  </option>
                ))}
              </select>
            )}
            <button type="button" onClick={logout} className="text-[14px]" style={{ color: APPLE.blue }}>
              Déconnexion
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-[1100px] px-5">
          <div className="-mx-1 flex gap-1 overflow-x-auto px-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className="whitespace-nowrap border-b-2 px-3 py-3 text-[14px] font-medium transition-colors"
                style={{
                  borderColor: tab === t.key ? APPLE.blue : "transparent",
                  color: tab === t.key ? APPLE.blue : APPLE.muted,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-5 py-6 md:py-10">
        {!data ? (
          <p className="text-[14px]" style={{ color: APPLE.muted }}>
            Chargement…
          </p>
        ) : (
          <>
            {tab === "apercu" && <OverviewTab stats={stats} />}
            {tab === "demandes" && (
              <DemandesTab
                reservations={reservations}
                concurrentes={data.concurrentes ?? []}
                enRetard={data.en_retard ?? []}
                onStatut={handleStatut}
              />
            )}
            {tab === "calendrier" && (
              <CalendrierTab reservations={reservations} periodes={periodes} />
            )}
            {tab === "avis" && (
              <AvisTab
                avis={avis}
                onPublier={async (id, publie) => {
                  const { status } = await call({ action: "avis_publier", id, publie });
                  if (status === 200) {
                    toast.success(publie ? "Avis publié" : "Avis dépublié");
                    await loadAvis();
                  } else toast.error("Action impossible.");
                }}
                onRepondre={async (id, reponse) => {
                  const { status } = await call({ action: "avis_repondre", id, reponse });
                  if (status === 200) {
                    toast.success("Réponse enregistrée");
                    await loadAvis();
                  } else toast.error("Action impossible.");
                }}
                onSupprimer={async (id) => {
                  const { status } = await call({ action: "avis_supprimer", id });
                  if (status === 200) {
                    toast.success("Avis supprimé");
                    await loadAvis();
                  } else toast.error("Suppression impossible.");
                }}
                onCreer={async (payload) => {
                  const { status, data: res } = await call<{ error?: string }>({
                    action: "avis_creer",
                    ...payload,
                  });
                  if (status === 200) {
                    toast.success("Avis ajouté");
                    await loadAvis();
                    return true;
                  }
                  toast.error(res?.error ?? "Ajout impossible.");
                  return false;
                }}
              />
            )}
            {tab === "bloquer" && (
              <BloquerTab periodes={periodes} onBloquer={bloquer} onDebloquer={debloquer} />
            )}
          </>
        )}
      </main>

      {caduques && caduques.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-5">
          <Card className="w-full max-w-[440px] p-6">
            <h2 className="text-[18px] font-semibold tracking-tight">
              {caduques.length} autres demandes portent sur ces dates
            </h2>
            <p className="mt-2 text-[14px]" style={{ color: APPLE.muted }}>
              Les refuser et prévenir ces clients ?
            </p>
            <ul className="mt-4 space-y-1 text-[14px]">
              {caduques.map((c) => (
                <li key={c.id}>{c.nom}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <Btn variant="primary" onClick={() => refuserLot(caduques.map((c) => c.id))}>
                Refuser et prévenir
              </Btn>
              <Btn onClick={() => setCaduques(null)}>Laisser en attente</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
