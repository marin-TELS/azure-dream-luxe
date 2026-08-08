export type Acces = {
  multi?: boolean;
  biens?: { id: string; nom: string }[];
};

export type Reservation = {
  id: string;
  nom: string;
  email?: string | null;
  telephone?: string | null;
  message?: string | null;
  nb_personnes?: number | null;
  date_arrivee: string;
  date_depart: string;
  statut: "confirmee" | "refusee" | "en_attente" | string;
  prix_total?: number | null;
  notes_internes?: string | null;
  created_at?: string | null;
};

export type PeriodeBloquee = {
  id: string;
  date_debut: string;
  date_fin: string;
  raison?: string | null;
};

export type Stats = {
  occupation?: { haute_saison?: number; annee?: number; nuits_haute_saison?: number };
  revenu?: {
    ca_confirme?: number;
    prix_moyen_nuit?: number;
    revenu_par_nuit_disponible?: number;
    commission_economisee?: number;
  };
  sejours?: { duree_moyenne?: number; groupe_moyen?: number; anticipation_jours?: number };
  demandes?: {
    taux_transformation?: number;
    delai_moyen_heures?: number;
    en_attente?: number;
  };
  avis?: { moyenne?: number; nombre?: number; verifies?: number; a_valider?: number };
  mensuel?: {
    mois: string;
    nuits: number;
    ca: number;
    taux: number;
    demandes: number;
    haute_saison: boolean;
  }[];
};

export type ListResponse = {
  acces?: Acces;
  bien?: { id?: string; nom?: string };
  reservations?: Reservation[];
  periodes?: PeriodeBloquee[];
  concurrentes?: string[];
  en_retard?: string[];
  stats?: Stats;
  error?: string;
};

export type AdminAvis = {
  id: string;
  auteur_nom?: string | null;
  note: number;
  titre?: string | null;
  commentaire?: string | null;
  date_sejour?: string | null;
  source?: string | null;
  publie?: boolean;
  reponse?: string | null;
  /** Calculé en base, non modifiable. */
  verifie?: boolean;
  /** Lien envoyé, avis pas encore déposé. */
  sollicite_sans_reponse?: boolean;
};
