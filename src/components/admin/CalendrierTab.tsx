import { DayPicker } from "react-day-picker";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { APPLE, Card } from "./ui";
import { EtatVide } from "./EtatVide";
import { periodeLabel } from "./DemandesTab";
import type { PeriodeBloquee, Reservation } from "@/lib/adminTypes";

const CSS = `
.admin-dp { --rdp-cell-size: 38px; color: #1d1d1f; }
.admin-dp .rdp-day_button { width: 38px; height: 38px; border-radius: 10px; font-size: 13px; transition: transform .16s ease; }
.admin-dp .rdp-day_button:not(:disabled):hover { transform: scale(1.15); position: relative; z-index: 2; }
.admin-dp .rdp-weekday { color: #6e6e73; font-size: 11px; font-weight: 500; }
.admin-dp .rdp-month_caption { color: #1d1d1f; font-size: 15px; font-weight: 600; }
.admin-dp .rdp-day.sejour .rdp-day_button { background: #0071e3; color: #fff; }
.admin-dp .rdp-day.bloque .rdp-day_button {
  color: #6e6e73;
  background: repeating-linear-gradient(45deg, #e5e5ea, #e5e5ea 4px, #f5f5f7 4px, #f5f5f7 8px);
}
.admin-dp .rdp-selected .rdp-day_button { background: #0071e3; color: #fff; }
.admin-dp .rdp-range_middle .rdp-day_button { background: rgba(0,113,227,0.12); color: #1d1d1f; }
.admin-dp .rdp-disabled .rdp-day_button { color: #c7c7cc; cursor: not-allowed; }
@media (prefers-reduced-motion: reduce) {
  .admin-dp .rdp-day_button { transition: none !important; transform: none !important; }
}
`;

function toDates(from: string, to: string) {
  const start = new Date(`${from}T00:00:00`);
  const end = new Date(`${to}T00:00:00`);
  const out: Date[] = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) out.push(new Date(d));
  return out;
}

export function CalendrierTab({
  reservations,
  periodes,
}: {
  reservations: Reservation[];
  periodes: PeriodeBloquee[];
}) {
  const [months, setMonths] = useState(1);
  useEffect(() => {
    const update = () => setMonths(window.innerWidth >= 1024 ? 3 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const confirmes = reservations.filter((r) => r.statut === "confirmee");
  const sejourDays = confirmes.flatMap((r) => toDates(r.date_arrivee, r.date_depart));
  const bloqueDays = periodes.flatMap((p) => toDates(p.date_debut, p.date_fin));

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const aVenir = [...confirmes]
    .filter((r) => new Date(`${r.date_depart}T00:00:00`) >= today)
    .sort((a, b) => a.date_arrivee.localeCompare(b.date_arrivee));

  return (
    <div className="space-y-5">
      <style>{CSS}</style>
      <Card className="p-5 md:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-5 text-[13px]" style={{ color: APPLE.muted }}>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded" style={{ background: APPLE.blue }} /> Séjour confirmé
          </span>
          <span className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded"
              style={{
                background:
                  "repeating-linear-gradient(45deg,#e5e5ea,#e5e5ea 3px,#f5f5f7 3px,#f5f5f7 6px)",
              }}
            />{" "}
            Période bloquée
          </span>
        </div>
        <div className="admin-dp overflow-x-auto">
          <DayPicker
            mode="single"
            locale={fr}
            numberOfMonths={months}
            selected={undefined}
            modifiers={{ sejour: sejourDays, bloque: bloqueDays }}
            modifiersClassNames={{ sejour: "sejour", bloque: "bloque" }}
            disabled
          />
        </div>
      </Card>

      <Card className="p-5 md:p-6">
        <h3 className="text-[17px] font-semibold tracking-tight" style={{ color: APPLE.text }}>
          Séjours à venir
        </h3>
        {aVenir.length === 0 ? (
          <EtatVide
            icone={CalendarDays}
            titre="Aucun séjour confirmé"
            texte="Les séjours que vous confirmez apparaîtront en bleu sur ce calendrier."
          />
        ) : (
          <ul className="mt-4 divide-y" style={{ borderColor: APPLE.border }}>
            {aVenir.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <span className="text-[15px] font-medium" style={{ color: APPLE.text }}>
                  {r.nom}
                </span>
                <span className="text-[13px]" style={{ color: APPLE.muted }}>
                  {periodeLabel(r)} · {r.nb_personnes ?? "—"} pers.
                  {r.prix_total ? ` · ${Math.round(r.prix_total).toLocaleString("fr-FR")} €` : ""}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

export function moisCourt(date: string) {
  const d = new Date(`${date}T00:00:00`);
  return Number.isNaN(d.getTime()) ? date : format(d, "d MMM yyyy", { locale: fr });
}
