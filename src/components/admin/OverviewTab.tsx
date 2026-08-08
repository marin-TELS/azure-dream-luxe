import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { APPLE, AdminStars, Card, StatCard } from "./ui";
import type { Stats } from "@/lib/adminTypes";

const euro = (n?: number) =>
  `${Math.round(n ?? 0).toLocaleString("fr-FR")} €`;

function moisLabel(mois: string) {
  const d = new Date(`${mois}-01T00:00:00`);
  if (Number.isNaN(d.getTime())) return mois;
  return format(d, "LLL", { locale: fr });
}

export function OverviewTab({
  stats,
  onVoirAvis,
}: {
  stats: Stats;
  onVoirAvis?: () => void;
}) {
  const mensuel = (stats.mensuel ?? []).map((m) => ({
    ...m,
    label: moisLabel(m.mois),
    tauxHaute: m.haute_saison ? m.taux : 0,
    tauxBasse: m.haute_saison ? 0 : m.taux,
  }));
  const enAttente = stats.demandes?.en_attente ?? 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Occupation haute saison"
          value={`${Math.round(stats.occupation?.haute_saison ?? 0)} %`}
          hint={`${stats.occupation?.nuits_haute_saison ?? 0} nuits · ${Math.round(
            stats.occupation?.annee ?? 0,
          )} % sur l'année`}
        />
        <StatCard
          label="CA confirmé"
          value={euro(stats.revenu?.ca_confirme)}
          hint={`${euro(stats.revenu?.revenu_par_nuit_disponible)} par nuit disponible`}
        />
        <div className="space-y-2">
          <StatCard label="Note moyenne" value={(stats.avis?.moyenne ?? 0).toFixed(1)}>
            <div className="mt-2 flex items-center gap-2">
              <AdminStars note={Math.round(stats.avis?.moyenne ?? 0)} />
            </div>
            <p className="mt-2 text-[12px]" style={{ color: APPLE.muted }}>
              {stats.avis?.nombre ?? 0} avis · {stats.avis?.verifies ?? 0} vérifiés
            </p>
          </StatCard>
          {(stats.avis?.a_valider ?? 0) > 0 && (
            <button
              type="button"
              onClick={onVoirAvis}
              className="w-full rounded-full px-4 py-2 text-[13px] font-medium transition-opacity hover:opacity-85"
              style={{ background: "rgba(255,149,0,0.16)", color: "#a15c00" }}
            >
              {stats.avis?.a_valider} avis à valider
            </button>
          )}
        </div>
        <StatCard
          label="Demandes en attente"
          value={enAttente}
          accent={enAttente > 0 ? "rgba(255,149,0,0.12)" : undefined}
          hint={
            stats.demandes?.delai_moyen_heures !== undefined
              ? `Délai de réponse moyen : ${Math.round(stats.demandes.delai_moyen_heures)} h`
              : undefined
          }
        />
      </div>

      <Card className="p-6 md:p-8" style={{ background: "rgba(0,113,227,0.08)" }}>
        <p
          className="text-[20px] font-semibold tracking-tight md:text-[26px]"
          style={{ color: APPLE.text }}
        >
          Vous avez économisé {euro(stats.revenu?.commission_economisee)} de commissions cette
          année
        </p>
        <p className="mt-2 text-[14px]" style={{ color: APPLE.muted }}>
          soit 15 % de votre chiffre d'affaires, conservés
        </p>
      </Card>

      <Card className="p-5 md:p-6">
        <h3 className="text-[17px] font-semibold tracking-tight" style={{ color: APPLE.text }}>
          Occupation et demandes par mois
        </h3>
        <p className="mt-1 text-[13px]" style={{ color: APPLE.muted }}>
          Barres bleues : haute saison. L'écart entre la courbe et les barres montre la demande
          non convertie.
        </p>
        <div className="mt-6 h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={mensuel} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
              <CartesianGrid stroke={APPLE.border} strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: APPLE.muted, fontSize: 12 }}
              />
              <YAxis
                yAxisId="left"
                tickLine={false}
                axisLine={false}
                tick={{ fill: APPLE.muted, fontSize: 12 }}
                unit="%"
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false}
                axisLine={false}
                tick={{ fill: APPLE.muted, fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: `1px solid ${APPLE.border}`,
                  fontSize: 13,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: APPLE.muted }} />
              <Bar
                yAxisId="left"
                dataKey="tauxHaute"
                name="Occupation haute saison"
                stackId="taux"
                fill={APPLE.blue}
                radius={[6, 6, 0, 0]}
              />
              <Bar
                yAxisId="left"
                dataKey="tauxBasse"
                name="Occupation"
                stackId="taux"
                fill="#e5e5ea"
                radius={[6, 6, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="demandes"
                name="Demandes"
                stroke={APPLE.orange}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <SecondaryStat
          value={`${(stats.sejours?.duree_moyenne ?? 0).toFixed(1)} nuits`}
          label="Durée moyenne de séjour"
          hint={`Groupe moyen de ${Math.round(stats.sejours?.groupe_moyen ?? 0)} personnes`}
        />
        <SecondaryStat
          value={euro(stats.revenu?.prix_moyen_nuit)}
          label="Prix moyen par nuit"
          hint="Moyenne des séjours confirmés"
        />
        <SecondaryStat
          value={`${Math.round(stats.sejours?.anticipation_jours ?? 0)} j`}
          label="Anticipation moyenne"
          hint={`Vos clients réservent en moyenne ${Math.round(
            stats.sejours?.anticipation_jours ?? 0,
          )} jours à l'avance`}
        />
        <SecondaryStat
          value={`${Math.round(stats.demandes?.taux_transformation ?? 0)} %`}
          label="Taux de transformation"
          hint="Part des demandes qui deviennent des séjours confirmés"
        />
      </div>
    </div>
  );
}

function SecondaryStat({
  value,
  label,
  hint,
}: {
  value: string;
  label: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl px-4 py-4" style={{ background: "rgba(255,255,255,0.6)" }}>
      <p className="text-[20px] font-semibold tracking-tight" style={{ color: APPLE.text }}>
        {value}
      </p>
      <p className="mt-1 text-[13px]" style={{ color: APPLE.text }}>
        {label}
      </p>
      <p className="mt-1 text-[12px] leading-snug" style={{ color: APPLE.muted }}>
        {hint}
      </p>
    </div>
  );
}
