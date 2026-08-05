import { useState } from "react";
import { APPLE, AdminStars, Badge, Btn, Card, Field, inputClass, inputStyle } from "./ui";
import { moisCourt } from "./CalendrierTab";
import type { AdminAvis } from "@/lib/adminTypes";

export function AvisTab({
  avis,
  onPublier,
  onRepondre,
  onSupprimer,
  onCreer,
}: {
  avis: AdminAvis[];
  onPublier: (id: string, publie: boolean) => Promise<void>;
  onRepondre: (id: string, reponse: string) => Promise<void>;
  onSupprimer: (id: string) => Promise<void>;
  onCreer: (payload: Record<string, unknown>) => Promise<boolean>;
}) {
  const [showForm, setShowForm] = useState(false);
  const aValider = avis.filter((a) => !a.publie);
  const publies = avis.filter((a) => a.publie);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Btn variant="primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Fermer" : "Ajouter un avis"}
        </Btn>
      </div>

      {showForm && <NouvelAvis onCreer={onCreer} onDone={() => setShowForm(false)} />}

      <Groupe titre={`À valider (${aValider.length})`}>
        {aValider.map((a) => (
          <AvisCard
            key={a.id}
            a={a}
            onPublier={onPublier}
            onRepondre={onRepondre}
            onSupprimer={onSupprimer}
          />
        ))}
      </Groupe>

      <Groupe titre={`Publiés (${publies.length})`}>
        {publies.map((a) => (
          <AvisCard
            key={a.id}
            a={a}
            onPublier={onPublier}
            onRepondre={onRepondre}
            onSupprimer={onSupprimer}
          />
        ))}
      </Groupe>
    </div>
  );
}

function Groupe({ titre, children }: { titre: string; children: React.ReactNode }) {
  const empty = Array.isArray(children) && children.length === 0;
  return (
    <section className="space-y-3">
      <h3 className="text-[17px] font-semibold tracking-tight" style={{ color: APPLE.text }}>
        {titre}
      </h3>
      {empty ? (
        <Card className="p-6 text-[14px]" style={{ color: APPLE.muted }}>
          Aucun avis.
        </Card>
      ) : (
        children
      )}
    </section>
  );
}

function AvisCard({
  a,
  onPublier,
  onRepondre,
  onSupprimer,
}: {
  a: AdminAvis;
  onPublier: (id: string, publie: boolean) => Promise<void>;
  onRepondre: (id: string, reponse: string) => Promise<void>;
  onSupprimer: (id: string) => Promise<void>;
}) {
  const [reponse, setReponse] = useState(a.reponse ?? "");
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <Card className="space-y-4 p-5 md:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <AdminStars note={a.note} />
        {a.source && (
          <Badge color={APPLE.muted} bg="rgba(110,110,115,0.12)">
            {a.source}
          </Badge>
        )}
      </div>
      {a.titre && (
        <p className="text-[16px] font-semibold tracking-tight" style={{ color: APPLE.text }}>
          {a.titre}
        </p>
      )}
      {a.commentaire && (
        <p className="text-[14px] leading-relaxed" style={{ color: APPLE.text }}>
          {a.commentaire}
        </p>
      )}
      <p className="text-[13px]" style={{ color: APPLE.muted }}>
        {a.auteur_nom}
        {a.date_sejour ? ` · ${moisCourt(a.date_sejour)}` : ""}
      </p>

      <Field label="Répondre publiquement">
        <textarea
          rows={2}
          className={`${inputClass} resize-none`}
          style={inputStyle}
          value={reponse}
          onChange={(e) => setReponse(e.target.value)}
        />
      </Field>

      <div className="flex flex-wrap gap-2">
        <Btn variant="primary" onClick={() => onPublier(a.id, !a.publie)}>
          {a.publie ? "Dépublier" : "Publier"}
        </Btn>
        <Btn onClick={() => onRepondre(a.id, reponse)}>Enregistrer la réponse</Btn>
        {confirmDelete ? (
          <>
            <Btn variant="danger" onClick={() => onSupprimer(a.id)}>
              Confirmer la suppression
            </Btn>
            <Btn variant="ghost" onClick={() => setConfirmDelete(false)}>
              Annuler
            </Btn>
          </>
        ) : (
          <Btn variant="danger" onClick={() => setConfirmDelete(true)}>
            Supprimer
          </Btn>
        )}
      </div>
    </Card>
  );
}

function NouvelAvis({
  onCreer,
  onDone,
}: {
  onCreer: (payload: Record<string, unknown>) => Promise<boolean>;
  onDone: () => void;
}) {
  const [auteur, setAuteur] = useState("");
  const [note, setNote] = useState(5);
  const [titre, setTitre] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [dateSejour, setDateSejour] = useState("");
  const [source, setSource] = useState("Direct");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const ok = await onCreer({
      auteur_nom: auteur.trim(),
      note,
      titre: titre.trim() || null,
      commentaire: commentaire.trim() || null,
      date_sejour: dateSejour || null,
      source,
    });
    setBusy(false);
    if (ok) onDone();
  }

  return (
    <Card className="p-5 md:p-6">
      <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
        <Field label="Nom de l'auteur">
          <input
            className={inputClass}
            style={inputStyle}
            value={auteur}
            onChange={(e) => setAuteur(e.target.value)}
            required
          />
        </Field>
        <Field label="Note">
          <select
            className={inputClass}
            style={inputStyle}
            value={note}
            onChange={(e) => setNote(Number(e.target.value))}
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} étoile{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Titre">
          <input
            className={inputClass}
            style={inputStyle}
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
        </Field>
        <Field label="Date du séjour">
          <input
            type="date"
            className={inputClass}
            style={inputStyle}
            value={dateSejour}
            onChange={(e) => setDateSejour(e.target.value)}
          />
        </Field>
        <div className="md:col-span-2">
          <Field label="Commentaire">
            <textarea
              rows={4}
              className={`${inputClass} resize-none`}
              style={inputStyle}
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
            />
          </Field>
        </div>
        <Field label="Source">
          <select
            className={inputClass}
            style={inputStyle}
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            {["Direct", "Airbnb", "Booking", "Google"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <div className="flex items-end">
          <Btn variant="primary" type="submit" disabled={busy} className="w-full">
            {busy ? "Enregistrement…" : "Ajouter l'avis"}
          </Btn>
        </div>
      </form>
    </Card>
  );
}
