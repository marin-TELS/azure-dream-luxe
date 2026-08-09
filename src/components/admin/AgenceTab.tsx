import { CalendarCheck, Home, PiggyBank } from "lucide-react";
import { APPLE, AdminStars, Badge, Btn, Card, StatCard } from "./ui";
import type { Bien, Stats, VueGlobale } from "@/lib/adminTypes";

const euro = (n?: number) => `${Math.round(n ?? 0).toLocaleString("fr-FR")} €`;

export function AgenceTab({
  vue,
  onOuvrirBien,
}: {
  vue: VueGlobale | null;
  onOuvrirBien: (bien: Bien) => void;
}) {
  if (!vue) {
    return (
      <p className="text-[14px]" style={{ color: APPLE.muted }}>
        Chargement…
      </p>
    );
  }

  const totaux = vue.totaux ?? {};
  const enAttente = totaux.en_attente ?? 0;
  const biens = [...(vue.par_bien ?? [])].sort(
    (a, b) => (b.stats?.demandes?.en_attente ?? 0) - (a.stats?.demandes?.en_attente ?? 0),
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Biens actifs" value={totaux.biens ?? biens.length} />
        <StatCard
          label="Demandes en attente"
          value={enAttente}
          accent={enAttente > 0 ? "rgba(255,149,0,0.12)" : undefined}
        />
        <StatCard label="Séjours confirmés" value={totaux.confirmees ?? 0} />
        <StatCard
          label="Commission économisée"
          value={euro(totaux.commission_economisee)}
          accent="rgba(0,113,227,0.08)"
          hint={`${euro(totaux.ca_confirme)} de chiffre d'affaires confirmé`}
        />
      </div>

      <div className="space-y-4">
        {biens.map(({ bien, stats }) => (
          <BienCard key={bien.id} bien={bien} stats={stats ?? {}} onOuvrir={onOuvrirBien} />
        ))}
      </div>
    </div>
  );
}

function BienCard({
  bien,
  stats,
  onOuvrir,
}: {
  bien: Bien;
  stats: Stats;
  onOuvrir: (bien: Bien) => void;
}) {
  const attente = stats.demandes?.en_attente ?? 0;
  const nbAvis = stats.avis?.nombre ?? 0;
  const moyenne = stats.avis?.moyenne ?? 0;

  return (
    <Card className="p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[17px] font-semibold tracking-tight" style={{ color: APPLE.text }}>
              {bien.nom}
            </p>
            {attente > 0 && (
              <Badge color="#a15c00" bg="rgba(255,149,0,0.16)">
                {attente} en attente
              </Badge>
            )}
          </div>
          {bien.ville && (
            <p className="mt-1 text-[13px]" style={{ color: APPLE.muted }}>
              {bien.ville}
            </p>
          )}
        </div>
        <Btn variant="primary" onClick={() => onOuvrir(bien)}>
          Ouvrir
        </Btn>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Chiffre
          icone={<Home size={14} style={{ color: APPLE.muted }} />}
          label="Occupation haute saison"
          value={`${Math.round(stats.occupation?.haute_saison ?? 0)} %`}
        />
        <Chiffre
          icone={<PiggyBank size={14} style={{ color: APPLE.muted }} />}
          label="CA confirmé"
          value={euro(stats.revenu?.ca_confirme)}
        />
        <div>
          <p className="text-[12px]" style={{ color: APPLE.muted }}>
            Note moyenne
          </p>
          {nbAvis > 0 ? (
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[18px] font-semibold tracking-tight" style={{ color: APPLE.text }}>
                {moyenne.toFixed(1)}
              </span>
              <AdminStars note={Math.round(moyenne)} size={14} />
            </div>
          ) : (
            <p className="mt-1 text-[18px] font-semibold" style={{ color: APPLE.muted }}>
              —
            </p>
          )}
        </div>
        <Chiffre
          icone={<CalendarCheck size={14} style={{ color: APPLE.muted }} />}
          label="Délai moyen de réponse"
          value={`${Math.round(stats.demandes?.delai_moyen_heures ?? 0)} h`}
        />
      </div>
    </Card>
  );
}

function Chiffre({
  label,
  value,
  icone,
}: {
  label: string;
  value: string;
  icone?: React.ReactNode;
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-[12px]" style={{ color: APPLE.muted }}>
        {icone}
        {label}
      </p>
      <p className="mt-1 text-[18px] font-semibold tracking-tight" style={{ color: APPLE.text }}>
        {value}
      </p>
    </div>
  );
}
