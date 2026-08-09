import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { fr } from "date-fns/locale";
import { format } from "date-fns";
import { CalendarOff } from "lucide-react";
import { APPLE, Btn, Card, Field, inputClass, inputStyle } from "./ui";
import { EtatVide } from "./EtatVide";
import { moisCourt } from "./CalendrierTab";
import type { PeriodeBloquee } from "@/lib/adminTypes";

export function BloquerTab({
  periodes,
  onBloquer,
  onDebloquer,
}: {
  periodes: PeriodeBloquee[];
  onBloquer: (date_debut: string, date_fin: string, raison: string | null) => Promise<boolean>;
  onDebloquer: (id: string) => Promise<void>;
}) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [raison, setRaison] = useState("");
  const [busy, setBusy] = useState(false);

  async function bloquer() {
    if (!range?.from || !range?.to) return;
    setBusy(true);
    const ok = await onBloquer(
      format(range.from, "yyyy-MM-dd"),
      format(range.to, "yyyy-MM-dd"),
      raison.trim() || null,
    );
    if (ok) {
      setRange(undefined);
      setRaison("");
    }
    setBusy(false);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card className="p-5 md:p-6">
        <div className="admin-dp">
          <DayPicker
            mode="range"
            locale={fr}
            numberOfMonths={1}
            selected={range}
            onSelect={setRange}
            disabled={{ before: new Date() }}
          />
        </div>
        <div className="mt-5 space-y-4">
          <Field label="Raison (optionnel) — ex : travaux piscine">
            <input
              className={inputClass}
              style={inputStyle}
              value={raison}
              onChange={(e) => setRaison(e.target.value)}
              maxLength={200}
            />
          </Field>
          <Btn
            variant="primary"
            disabled={busy || !range?.from || !range?.to}
            onClick={bloquer}
            className="w-full"
          >
            {busy ? "Blocage…" : "Bloquer ces dates"}
          </Btn>
        </div>
      </Card>

      <Card className="p-5 md:p-6">
        <h3 className="text-[17px] font-semibold tracking-tight" style={{ color: APPLE.text }}>
          Périodes bloquées
        </h3>
        {periodes.length === 0 ? (
          <EtatVide
            icone={CalendarOff}
            titre="Aucune date bloquée"
            texte="Bloquez vos congés, des travaux, ou une réservation prise par téléphone : ces dates disparaîtront du calendrier de votre site."
          />
        ) : (
          <ul className="mt-4 divide-y" style={{ borderColor: APPLE.border }}>
            {periodes.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-[15px]" style={{ color: APPLE.text }}>
                    {moisCourt(p.date_debut)} → {moisCourt(p.date_fin)}
                  </p>
                  {p.raison && (
                    <p className="text-[13px]" style={{ color: APPLE.muted }}>
                      {p.raison}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onDebloquer(p.id)}
                  className="text-[14px]"
                  style={{ color: APPLE.blue }}
                >
                  Débloquer
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
