import { useEffect, useMemo, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { fr } from "date-fns/locale";
import { differenceInCalendarDays, format } from "date-fns";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { BIEN, publicGet, publicPost } from "@/lib/villaApi";

type Periode = { date_debut: string; date_fin: string };
type DispoResponse = {
  periodes?: Periode[];
  nuits_minimum?: number;
  capacite_max?: number;
};

const CALENDAR_CSS = `
.villa-dp { --rdp-cell-size: 40px; color: rgba(255,255,255,0.9); }
.villa-dp .rdp-months { justify-content: center; }
.villa-dp .rdp-month_caption, .villa-dp .rdp-caption_label {
  color: #fff; font-size: 15px; letter-spacing: 0.08em; text-transform: uppercase;
}
.villa-dp .rdp-weekday { color: rgba(255,255,255,0.45); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 400; }
.villa-dp .rdp-day_button {
  width: 40px; height: 40px; min-width: 40px; min-height: 40px; border-radius: 2px; font-size: 14px;
  color: rgba(255,255,255,0.88); transition: transform .16s ease, background-color .16s ease, color .16s ease;
}
.villa-dp .rdp-day_button:not(:disabled):hover { transform: scale(1.18); position: relative; z-index: 2; }
.villa-dp .rdp-day:not(.rdp-selected) .rdp-day_button:not(:disabled):hover { background: rgba(184,150,90,0.28); }
.villa-dp .rdp-disabled .rdp-day_button { color: rgba(255,255,255,0.18); text-decoration: line-through; cursor: not-allowed; }
.villa-dp .rdp-outside .rdp-day_button { color: rgba(255,255,255,0.15); }
.villa-dp .rdp-range_middle .rdp-day_button { background: rgba(184,150,90,0.22); color: rgba(250,250,248,0.9); border-radius: 0; }
.villa-dp .rdp-range_start .rdp-day_button { background: var(--color-accent); color: #0f0f0f; font-weight: 600; border-radius: 8px 0 0 8px; }
.villa-dp .rdp-range_end .rdp-day_button { background: var(--color-accent); color: #0f0f0f; font-weight: 600; border-radius: 0 8px 8px 0; }
.villa-dp .rdp-range_start.rdp-range_end .rdp-day_button { border-radius: 8px; }
.villa-dp .rdp-today:not(.rdp-selected) .rdp-day_button { box-shadow: inset 0 0 0 1px rgba(255,255,255,0.3); }
.villa-dp .rdp-button_previous, .villa-dp .rdp-button_next { color: #fff; }
.villa-dp .rdp-chevron { fill: #fff; }
@media (prefers-reduced-motion: reduce) {
  .villa-dp .rdp-day_button { transition: none !important; transform: none !important; }
}
`;

const fieldClass =
  "w-full rounded-[2px] border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-background outline-none transition-colors duration-200 placeholder:text-muted-foreground focus:border-accent";

export function BookingSection() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [periodes, setPeriodes] = useState<Periode[]>([]);
  const [nuitsMinimum, setNuitsMinimum] = useState(1);
  const [capaciteMax, setCapaciteMax] = useState(20);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const [nom, setNom] = useState("");
  const [personnes, setPersonnes] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    publicGet<DispoResponse>(`/disponibilites?bien=${BIEN}`)
      .then(({ data }) => {
        if (cancelled || !data) return;
        setPeriodes(data.periodes ?? []);
        if (data.nuits_minimum) setNuitsMinimum(data.nuits_minimum);
        if (data.capacite_max) setCapaciteMax(data.capacite_max);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const disabled = useMemo(() => {
    const ranges = periodes.map((p) => ({
      from: new Date(`${p.date_debut}T00:00:00`),
      to: new Date(`${p.date_fin}T00:00:00`),
    }));
    return [{ before: new Date() }, ...ranges];
  }, [periodes]);

  const nights =
    range?.from && range?.to ? differenceInCalendarDays(range.to, range.from) : 0;

  const personnesOptions = useMemo(() => {
    const out: number[] = [];
    for (let i = 2; i <= capaciteMax; i += 2) out.push(i);
    return out;
  }, [capaciteMax]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!range?.from || !range?.to) {
      toast.error("Sélectionnez vos dates d'arrivée et de départ.");
      return;
    }
    if (nights < nuitsMinimum) {
      toast.error(`Le séjour minimum est de ${nuitsMinimum} nuits.`);
      return;
    }
    if (!nom.trim()) {
      toast.error("Merci d'indiquer votre nom complet.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Merci d'indiquer une adresse email valide.");
      return;
    }
    if (!personnes) {
      toast.error("Merci d'indiquer le nombre de personnes.");
      return;
    }
    if (Number(personnes) > capaciteMax) {
      toast.error(`La villa accueille au maximum ${capaciteMax} personnes.`);
      return;
    }

    setSending(true);
    try {
      const { status, data } = await publicPost<{ error?: string }>("/reserve", {
        bien: BIEN,
        date_arrivee: format(range.from, "yyyy-MM-dd"),
        date_depart: format(range.to, "yyyy-MM-dd"),
        nom: nom.trim(),
        email: email.trim(),
        telephone: telephone.trim() || null,
        nb_personnes: Number(personnes),
        message: message.trim() || null,
      });
      if (status >= 200 && status < 300) {
        setSent(true);
      } else {
        toast.error(data?.error ?? "Une erreur est survenue. Merci de réessayer.");
      }
    } catch {
      toast.error("Impossible d'envoyer la demande. Vérifiez votre connexion.");
    } finally {
      setSending(false);
    }
  }

  function resetForm() {
    setSent(false);
    setRange(undefined);
    setNom("");
    setPersonnes("");
    setEmail("");
    setTelephone("");
    setMessage("");
  }

  return (
    <section id="reserver" className="bg-foreground px-6 py-16 md:px-12 md:py-[120px]">
      <style>{CALENDAR_CSS}</style>
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="text-center">
          <p className="text-[13px] uppercase tracking-[0.2em] text-accent">Disponibilités</p>
          <h2 className="mt-4 font-display text-[32px] leading-[1.15] text-background md:text-[56px]">
            Réserver sans intermédiaire
          </h2>
          <p className="mx-auto mt-6 max-w-[620px] text-[16px] leading-[1.65] text-muted-foreground md:text-[18px]">
            Sélectionnez vos dates et envoyez votre demande. Réponse garantie sous 24h.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col items-center">
            <div className="villa-dp w-full max-w-[420px] rounded-[2px] border border-white/10 bg-white/5 p-4 md:p-6">
              <DayPicker
                mode="range"
                locale={fr}
                numberOfMonths={1}
                selected={range}
                onSelect={setRange}
                disabled={disabled}
              />
            </div>
            <p className="mt-6 text-center text-[15px] text-muted-foreground">
              {range?.from && range?.to ? (
                <span className="text-background">
                  {format(range.from, "d MMMM", { locale: fr })} →{" "}
                  {format(range.to, "d MMMM yyyy", { locale: fr })}
                  <span className="text-muted-foreground">
                    {" "}
                    · {nights} nuit{nights > 1 ? "s" : ""}
                  </span>
                </span>
              ) : (
                "Cliquez sur la date d'arrivée puis la date de départ"
              )}
            </p>
          </Reveal>

          <Reveal delay={100}>
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center rounded-[2px] border border-white/10 bg-white/5 px-6 py-16 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                  <Check className="h-8 w-8 text-accent-foreground" />
                </span>
                <h3 className="mt-8 font-display text-[24px] text-background md:text-[32px]">
                  Demande envoyée !
                </h3>
                <p className="mt-4 max-w-[420px] text-[16px] leading-[1.65] text-muted-foreground">
                  Un email de confirmation vous a été envoyé. Nous vous répondons dans les 24
                  heures.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-8 text-[13px] uppercase tracking-[0.12em] text-accent underline-offset-4 hover:underline"
                >
                  Faire une nouvelle demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="booking-nom"
                      className="mb-2 block text-[12px] uppercase tracking-[0.12em] text-muted-foreground"
                    >
                      Nom complet *
                    </label>
                    <input
                      id="booking-nom"
                      className={fieldClass}
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      maxLength={120}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="booking-personnes"
                      className="mb-2 block text-[12px] uppercase tracking-[0.12em] text-muted-foreground"
                    >
                      Personnes *
                    </label>
                    <select
                      id="booking-personnes"
                      className={`${fieldClass} appearance-none`}
                      value={personnes}
                      onChange={(e) => setPersonnes(e.target.value)}
                      required
                    >
                      <option value="" className="bg-foreground">
                        Sélectionner
                      </option>
                      {personnesOptions.map((n) => (
                        <option key={n} value={n} className="bg-foreground">
                          {n} personnes
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="booking-email"
                      className="mb-2 block text-[12px] uppercase tracking-[0.12em] text-muted-foreground"
                    >
                      Email *
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      className={fieldClass}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      maxLength={255}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="booking-tel"
                      className="mb-2 block text-[12px] uppercase tracking-[0.12em] text-muted-foreground"
                    >
                      Téléphone
                    </label>
                    <input
                      id="booking-tel"
                      type="tel"
                      className={fieldClass}
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      maxLength={40}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="booking-message"
                    className="mb-2 block text-[12px] uppercase tracking-[0.12em] text-muted-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="booking-message"
                    rows={5}
                    className={`${fieldClass} resize-none`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={1500}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="mt-2 w-full rounded-[2px] bg-accent px-11 py-[18px] text-[13px] uppercase tracking-[0.12em] text-accent-foreground transition-colors duration-[250ms] hover:bg-background hover:text-foreground disabled:opacity-60"
                >
                  {sending ? "Envoi en cours…" : "Envoyer ma demande"}
                </button>
                <p className="text-center text-[14px] text-muted-foreground">
                  Aucun paiement immédiat · Réponse garantie sous 24h
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
