import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Sparkles } from "lucide-react";
import { APPLE, AdminStars, Card } from "./ui";
import { EtatVide } from "./EtatVide";
import { useCompteur } from "./useCompteur";
import { euro, nombre, pourcent } from "./format";
import type { Stats } from "@/lib/adminTypes";

function moisLabel(mois: string, long = false) {
  const d = new Date(`${mois}-01T00:00:00`);
  if (Number.isNaN(d.getTime())) return mois;
  return format(d, long ? "LLLL yyyy" : "LLL", { locale: fr });
}

type Ligne = {
  mois: string;
  label: string;
  labelLong: string;
  ca: number;
  taux: number;
  demandes: number;
  tauxHaute: number;
  tauxBasse: number;
};

function ChiffreAnime({
  valeur,
  rendu,
  className,
}: {
  valeur: number;
  rendu: (n: number) => string;
  className: string;
}) {
  const v = useCompteur(valeur);
  return (
    <span className={className} style={{ color: APPLE.text }}>
      {rendu(v)}
    </span>
  );
}

function Infobulle({ active, payload }: { active?: boolean; payload?: { payload: Ligne }[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]!.payload;
  return (
    <div
      className="rounded-xl px-4 py-3"
      style={{
        background: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
        border: `1px solid ${APPLE.border}`,
      }}
    >
      <p className="text-[13px] font-semibold capitalize" style={{ color: APPLE.text }}>
        {d.labelLong}
      </p>
      <p className="mt-1.5 text-[12px]" style={{ color: APPLE.muted }}>
        Occupation · <span style={{ color: APPLE.text }}>{pourcent(d.taux)}</span>
      </p>
      <p className="text-[12px]" style={{ color: APPLE.muted }}>
        Chiffre d'affaires · <span style={{ color: APPLE.text }}>{euro(d.ca)}</span>
      </p>
      <p className="text-[12px]" style={{ color: APPLE.muted }}>
        Demandes · <span style={{ color: APPLE.text }}>{nombre(d.demandes)}</span>
      </p>
    </div>
  );
}

export function OverviewTab({
  stats,
  onVoirAvis,
  onVoirDemandes,
}: {
  stats: Stats;
  onVoirAvis?: () => void;
  onVoirDemandes?: () => void;
}) {
  const mensuel: Ligne[] = (stats.mensuel ?? []).map((m) => ({
    mois: m.mois,
    label: moisLabel(m.mois),
    labelLong: moisLabel(m.mois, true),
    ca: m.ca ?? 0,
    taux: m.taux ?? 0,
    demandes: m.demandes ?? 0,
    tauxHaute: m.haute_saison ? m.taux : 0,
    tauxBasse: m.haute_saison ? 0 : m.taux,
  }));
  const enAttente = stats.demandes?.en_attente ?? 0;
  const vide = (stats.sejours?.nombre ?? 0) === 0 && (stats.demandes?.total ?? 0) === 0;

  if (vide) {
    return (
      <Card>
        <EtatVide
          icone={Sparkles}
          titre="Votre tableau de bord se remplira tout seul"
          texte="Taux d'occupation, chiffre d'affaires, note moyenne : ces indicateurs apparaîtront dès votre première réservation confirmée."
        />
      </Card>
    );
  }

  const nuits =
    (stats.sejours?.nombre ?? 0) * (stats.sejours?.duree_moyenne ?? 0);

  return (
    <div className="space-y-6">
      {/* Bloc principal */}
      <Card className="p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="min-w-[240px]">
            <p className="text-[13px]" style={{ color: APPLE.muted }}>
              Chiffre d'affaires confirmé
            </p>
            <div className="mt-2">
              <ChiffreAnime
                valeur={stats.revenu?.ca_confirme ?? 0}
                rendu={euro}
                className="block text-[44px] font-semibold tracking-tight md:text-[56px]"
              />
            </div>
            <p className="mt-2 text-[14px]" style={{ color: APPLE.muted }}>
              sur {nombre(stats.sejours?.nombre)} séjours · {nombre(nuits)} nuits vendues
            </p>
          </div>
          <div className="h-[80px] w-full min-w-[220px] flex-1 md:max-w-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mensuel} margin={{ top: 6, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="ca-spark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={APPLE.blue} stopOpacity={0.28} />
                    <stop offset="100%" stopColor={APPLE.blue} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="ca"
                  stroke={APPLE.blue}
                  strokeWidth={2}
                  fill="url(#ca-spark)"
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 border-t pt-6" style={{ borderColor: "#f0f0f2" }}>
          <div
            className="rounded-2xl px-6 py-5"
            style={{ background: "rgba(0,113,227,0.06)" }}
          >
            <p
              className="text-[20px] font-semibold tracking-tight md:text-[24px]"
              style={{ color: APPLE.text }}
            >
              Vous avez conservé {euro(stats.revenu?.commission_economisee)} de commissions
            </p>
            <p className="mt-1.5 text-[13px]" style={{ color: APPLE.muted }}>
              soit 15 % de votre chiffre d'affaires, qu'une plateforme aurait prélevés
            </p>
          </div>
        </div>
      </Card>

      {/* Trois cartes secondaires */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="p-5 md:p-6">
          <p className="text-[13px]" style={{ color: APPLE.muted }}>
            Occupation haute saison
          </p>
          <div className="mt-2">
            <ChiffreAnime
              valeur={stats.occupation?.haute_saison ?? 0}
              rendu={pourcent}
              className="block text-[32px] font-semibold tracking-tight md:text-[38px]"
            />
          </div>
          <p className="mt-2 text-[12px]" style={{ color: APPLE.muted }}>
            {nombre(stats.occupation?.nuits_haute_saison)} nuits ·{" "}
            {pourcent(stats.occupation?.annee)} sur l'année
          </p>
        </Card>

        <Card className="p-5 md:p-6">
          <p className="text-[13px]" style={{ color: APPLE.muted }}>
            Note moyenne
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span
              className="text-[32px] font-semibold tracking-tight md:text-[38px]"
              style={{ color: APPLE.text }}
            >
              {(stats.avis?.moyenne ?? 0).toFixed(1)}
            </span>
            <AdminStars note={Math.round(stats.avis?.moyenne ?? 0)} />
          </div>
          <p className="mt-2 text-[12px]" style={{ color: APPLE.muted }}>
            {nombre(stats.avis?.nombre)} avis · {nombre(stats.avis?.verifies)} vérifiés
          </p>
          {(stats.avis?.a_valider ?? 0) > 0 && (
            <button
              type="button"
              onClick={onVoirAvis}
              className="mt-3 w-full rounded-full px-4 py-2 text-[13px] font-medium transition-opacity hover:opacity-85"
              style={{ background: "rgba(255,149,0,0.16)", color: "#a15c00" }}
            >
              {stats.avis?.a_valider} avis à valider
            </button>
          )}
        </Card>

        <Card
          className={`admin-card-hover p-5 text-left md:p-6 ${onVoirDemandes ? "cursor-pointer" : ""}`}
          style={enAttente > 0 ? { background: "rgba(255,149,0,0.10)" } : undefined}
        >
          <button
            type="button"
            onClick={onVoirDemandes}
            className="block w-full text-left"
            aria-label="Voir les demandes"
          >
            <p className="text-[13px]" style={{ color: APPLE.muted }}>
              Demandes en attente
            </p>
            <div className="mt-2">
              <ChiffreAnime
                valeur={enAttente}
                rendu={nombre}
                className="block text-[32px] font-semibold tracking-tight md:text-[38px]"
              />
            </div>
            <p className="mt-2 text-[12px]" style={{ color: APPLE.muted }}>
              {stats.demandes?.delai_moyen_heures !== undefined
                ? `Délai de réponse moyen : ${nombre(stats.demandes.delai_moyen_heures)} h`
                : "Répondre vite augmente le taux de transformation"}
            </p>
          </button>
        </Card>
      </div>

      {/* Graphique mensuel */}
      <Card className="p-5 md:p-6">
        <h3 className="text-[17px] font-semibold tracking-tight" style={{ color: APPLE.text }}>
          Occupation et demandes par mois
        </h3>
        <p className="mt-1 text-[13px]" style={{ color: APPLE.muted }}>
          Les mois très demandés mais peu remplis signalent un prix à ajuster.
        </p>
        <div className="mt-6 h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={mensuel} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
              <CartesianGrid stroke="#f0f0f2" vertical={false} />
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
              <Tooltip content={<Infobulle />} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
              <Bar
                yAxisId="left"
                dataKey="tauxHaute"
                name="Occupation haute saison"
                stackId="taux"
                fill={APPLE.blue}
                maxBarSize={38}
                radius={[6, 6, 0, 0]}
              />
              <Bar
                yAxisId="left"
                dataKey="tauxBasse"
                name="Occupation"
                stackId="taux"
                fill="#e8e8ed"
                maxBarSize={38}
                radius={[6, 6, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="demandes"
                name="Demandes"
                stroke={APPLE.orange}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Indicateurs secondaires */}
      <Card className="p-5 md:p-6">
        <div className="grid grid-cols-2 gap-y-6 md:grid-cols-4">
          {[
            {
              valeur: `${(stats.sejours?.duree_moyenne ?? 0).toFixed(1)} nuits`,
              label: "Durée moyenne de séjour",
              hint: `Groupe moyen de ${nombre(stats.sejours?.groupe_moyen)} personnes`,
            },
            {
              valeur: euro(stats.revenu?.prix_moyen_nuit),
              label: "Prix moyen par nuit",
              hint: `${euro(stats.revenu?.revenu_par_nuit_disponible)} par nuit disponible`,
            },
            {
              valeur: `${nombre(stats.sejours?.anticipation_jours)} j`,
              label: "Anticipation moyenne",
              hint: `Vos clients réservent en moyenne ${nombre(
                stats.sejours?.anticipation_jours,
              )} jours à l'avance`,
            },
            {
              valeur: pourcent(stats.demandes?.taux_transformation),
              label: "Taux de transformation",
              hint: "Part des demandes qui deviennent des séjours confirmés",
            },
          ].map((s, i) => (
            <div
              key={s.label}
              className={i % 4 === 0 ? "px-0 md:pr-6" : "px-4 md:px-6"}
              style={{
                borderLeft: i % 4 === 0 ? undefined : `1px solid #f0f0f2`,
              }}
            >
              <p
                className="text-[20px] font-semibold tracking-tight"
                style={{ color: APPLE.text }}
              >
                {s.valeur}
              </p>
              <p className="mt-1 text-[13px]" style={{ color: APPLE.text }}>
                {s.label}
              </p>
              <p className="mt-1 text-[11px] leading-snug" style={{ color: APPLE.muted }}>
                {s.hint}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
