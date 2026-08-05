import { useState } from "react";
import { differenceInCalendarDays, format } from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronDown } from "lucide-react";
import { APPLE, Badge, Btn, Card, Field, StatutBadge, inputClass, inputStyle } from "./ui";
import type { Reservation } from "@/lib/adminTypes";

type Filtre = "en_attente" | "confirmee" | "refusee" | "toutes";

const FILTRES: { key: Filtre; label: string }[] = [
  { key: "en_attente", label: "En attente" },
  { key: "confirmee", label: "Confirmées" },
  { key: "refusee", label: "Refusées" },
  { key: "toutes", label: "Toutes" },
];

function d(date: string) {
  const dt = new Date(`${date}T00:00:00`);
  return Number.isNaN(dt.getTime()) ? date : dt;
}

export function periodeLabel(r: Reservation) {
  const from = d(r.date_arrivee);
  const to = d(r.date_depart);
  if (typeof from === "string" || typeof to === "string") {
    return `${r.date_arrivee} → ${r.date_depart}`;
  }
  const nuits = differenceInCalendarDays(to, from);
  return `${format(from, "d")} → ${format(to, "d MMMM yyyy", { locale: fr })} · ${nuits} nuit${
    nuits > 1 ? "s" : ""
  }`;
}

export function DemandesTab({
  reservations,
  concurrentes,
  enRetard,
  onStatut,
}: {
  reservations: Reservation[];
  concurrentes: string[];
  enRetard: string[];
  onStatut: (
    r: Reservation,
    statut: string,
    prix_total: number | null,
    notes_internes: string | null,
  ) => Promise<void>;
}) {
  const [filtre, setFiltre] = useState<Filtre>("en_attente");
  const [openId, setOpenId] = useState<string | null>(null);

  const liste = reservations.filter((r) => (filtre === "toutes" ? true : r.statut === filtre));

  return (
    <div className="space-y-5">
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {FILTRES.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFiltre(f.key)}
            className="whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-medium transition-colors"
            style={
              filtre === f.key
                ? { background: APPLE.text, color: "#fff" }
                : { background: "#fff", color: APPLE.muted, border: `1px solid ${APPLE.border}` }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {concurrentes.length > 0 && (
        <div
          className="rounded-2xl px-5 py-4 text-[14px]"
          style={{ background: "rgba(255,149,0,0.14)", color: "#8a4b00" }}
        >
          {concurrentes.length} demandes portent sur les mêmes dates. Confirmer l'une permettra de
          refuser les autres d'un geste.
        </div>
      )}

      {liste.length === 0 && (
        <Card className="p-8 text-center text-[14px]" style={{ color: APPLE.muted }}>
          Aucune demande dans cette catégorie.
        </Card>
      )}

      {liste.map((r) => (
        <DemandeCard
          key={r.id}
          r={r}
          open={openId === r.id}
          onToggle={() => setOpenId(openId === r.id ? null : r.id)}
          concurrente={concurrentes.includes(r.id)}
          retard={enRetard.includes(r.id)}
          onStatut={onStatut}
        />
      ))}
    </div>
  );
}

function DemandeCard({
  r,
  open,
  onToggle,
  concurrente,
  retard,
  onStatut,
}: {
  r: Reservation;
  open: boolean;
  onToggle: () => void;
  concurrente: boolean;
  retard: boolean;
  onStatut: (
    r: Reservation,
    statut: string,
    prix_total: number | null,
    notes_internes: string | null,
  ) => Promise<void>;
}) {
  const [prix, setPrix] = useState(r.prix_total != null ? String(r.prix_total) : "");
  const [notes, setNotes] = useState(r.notes_internes ?? "");
  const [busy, setBusy] = useState(false);

  async function apply(statut: string) {
    setBusy(true);
    await onStatut(r, statut, prix.trim() === "" ? null : Number(prix), notes.trim() || null);
    setBusy(false);
  }

  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[16px] font-semibold tracking-tight" style={{ color: APPLE.text }}>
              {r.nom}
            </span>
            <StatutBadge statut={r.statut} />
            {concurrente && (
              <Badge color="#8a4b00" bg="rgba(255,149,0,0.16)">
                En concurrence
              </Badge>
            )}
            {retard && (
              <Badge color="#b3261e" bg="rgba(255,59,48,0.14)">
                En retard
              </Badge>
            )}
          </div>
          <p className="mt-1 truncate text-[13px]" style={{ color: APPLE.muted }}>
            {periodeLabel(r)} · {r.nb_personnes ?? "—"} pers.
          </p>
        </div>
        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          style={{ color: APPLE.muted }}
        />
      </button>

      {open && (
        <div className="space-y-4 border-t px-5 py-5 md:px-6" style={{ borderColor: APPLE.border }}>
          <div className="flex flex-wrap gap-4 text-[14px]">
            {r.email && (
              <a href={`mailto:${r.email}`} style={{ color: APPLE.blue }}>
                {r.email}
              </a>
            )}
            {r.telephone && (
              <a href={`tel:${r.telephone}`} style={{ color: APPLE.blue }}>
                {r.telephone}
              </a>
            )}
          </div>

          {r.message && (
            <p
              className="rounded-xl px-4 py-3 text-[14px] leading-relaxed"
              style={{ background: APPLE.bg, color: APPLE.text }}
            >
              {r.message}
            </p>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Prix total (€)">
              <input
                className={inputClass}
                style={inputStyle}
                inputMode="numeric"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
              />
            </Field>
            <Field label="Notes internes (jamais envoyées au client)">
              <input
                className={inputClass}
                style={inputStyle}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Field>
          </div>

          <div className="flex flex-wrap gap-2">
            <Btn variant="primary" disabled={busy} onClick={() => apply("confirmee")}>
              Confirmer
            </Btn>
            <Btn variant="danger" disabled={busy} onClick={() => apply("refusee")}>
              Refuser
            </Btn>
            <Btn disabled={busy} onClick={() => apply("en_attente")}>
              Remettre en attente
            </Btn>
          </div>
        </div>
      )}
    </Card>
  );
}
