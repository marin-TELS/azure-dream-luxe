import {
  Waves,
  Umbrella,
  Anchor,
  Sun,
  Flame,
  Sofa,
  Armchair,
  Target,
  Snowflake,
  Wifi,
  Car,
  Sparkles,
  Home,
  ChefHat,
  CookingPot,
  Dumbbell,
  Footprints,
  Weight,
  ShieldAlert,
  Bell,
  Wine,
  WashingMachine,
  Leaf,
  Droplets,
  Gift,
  BedDouble,
  Baby,
  Languages,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

const items = [
  { Icon: Waves, label: "Piscine privée" },
  { Icon: Umbrella, label: "Accès plage Graniers" },
  { Icon: Anchor, label: "Bouée d'ancrage" },
  { Icon: Sun, label: "Terrasse" },
  { Icon: Flame, label: "Barbecue" },
  { Icon: Sofa, label: "Espace lounge" },
  { Icon: Armchair, label: "Transats" },
  { Icon: Target, label: "Terrain de pétanque" },
  { Icon: Snowflake, label: "Air conditionné" },
  { Icon: Wifi, label: "WiFi" },
  { Icon: Car, label: "Parking 10 voitures" },
  { Icon: Sparkles, label: "Ménage quotidien" },
  { Icon: Home, label: "Véranda" },
  { Icon: ChefHat, label: "Cuisine équipée" },
  { Icon: CookingPot, label: "Cuisine indépendante" },
  { Icon: Dumbbell, label: "Salle de sport" },
  { Icon: Footprints, label: "Tapis de course" },
  { Icon: Weight, label: "Banc de musculation" },
  { Icon: ShieldAlert, label: "Alarme piscine" },
  { Icon: Bell, label: "Système d'alarme" },
  { Icon: Wine, label: "Cave à vin" },
  { Icon: WashingMachine, label: "Buanderie" },
  { Icon: Leaf, label: "Jardinier inclus" },
  { Icon: Droplets, label: "Pisciniste inclus" },
  { Icon: Gift, label: "Panier de bienvenue" },
  { Icon: BedDouble, label: "Draps et linge inclus" },
  { Icon: Baby, label: "Enfants bienvenus" },
  { Icon: Languages, label: "Personnel FR/EN" },
];

export function Amenities() {
  return (
    <section className="bg-surface px-6 py-16 md:px-12 md:py-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="text-center">
          <h2 className="font-display text-[32px] leading-[1.15] text-foreground md:text-[56px]">
            Équipements
          </h2>
          <p className="mt-4 text-[16px] text-muted-foreground">
            Tout est compris pour un séjour sans friction.
          </p>
        </Reveal>

        <Reveal className="mt-12 md:mt-16">
          <ul className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {items.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-4">
                <Icon aria-hidden="true" className="h-6 w-6 shrink-0 text-accent" strokeWidth={1.25} />
                <span className="text-[15px] leading-snug text-foreground">{label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
