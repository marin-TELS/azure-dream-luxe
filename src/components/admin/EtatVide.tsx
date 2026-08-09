import type { LucideIcon } from "lucide-react";
import { APPLE, Btn } from "./ui";

export function EtatVide({
  icone: Icone,
  titre,
  texte,
  action,
}: {
  icone: LucideIcon;
  titre: string;
  texte: string;
  action?: { label: string; onClick: () => void } | undefined;
}) {
  return (
    <div className="flex flex-col items-center px-5 py-16 text-center">
      <Icone size={40} strokeWidth={1.5} style={{ color: APPLE.border }} />
      <p className="mt-4 text-[17px] font-semibold tracking-tight" style={{ color: APPLE.text }}>
        {titre}
      </p>
      <p
        className="mt-2 max-w-[380px] text-[14px] leading-relaxed"
        style={{ color: APPLE.muted }}
      >
        {texte}
      </p>
      {action && (
        <div className="mt-5">
          <Btn variant="primary" onClick={action.onClick}>
            {action.label}
          </Btn>
        </div>
      )}
    </div>
  );
}
