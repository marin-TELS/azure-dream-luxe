import type { ReactNode } from "react";

/** Palette Apple locale à /admin — volontairement hors design system du site public. */
export const APPLE = {
  bg: "#f5f5f7",
  card: "#ffffff",
  text: "#1d1d1f",
  muted: "#6e6e73",
  border: "#d2d2d7",
  blue: "#0071e3",
  green: "#34c759",
  orange: "#ff9500",
  red: "#ff3b30",
};

export const FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", Inter, "Helvetica Neue", Arial, sans-serif';

export function Card({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-2xl shadow-sm ${className}`}
      style={{ background: APPLE.card, ...(style ?? {}) }}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  accent,
  children,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  accent?: string;
  children?: ReactNode;
}) {
  return (
    <Card className="p-5 md:p-6" style={{ background: accent ?? APPLE.card }}>
      <p className="text-[13px]" style={{ color: APPLE.muted }}>
        {label}
      </p>
      <div
        className="mt-2 text-[28px] font-semibold tracking-tight md:text-[34px]"
        style={{ color: APPLE.text }}
      >
        {value}
      </div>
      {children}
      {hint && (
        <p className="mt-2 text-[12px] leading-snug" style={{ color: APPLE.muted }}>
          {hint}
        </p>
      )}
    </Card>
  );
}

export function Btn({
  children,
  onClick,
  variant = "secondary",
  type = "button",
  disabled,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const styles = {
    primary: { background: APPLE.blue, color: "#fff" },
    secondary: { background: APPLE.bg, color: APPLE.text, border: `1px solid ${APPLE.border}` },
    danger: { background: "#fff", color: APPLE.red, border: `1px solid ${APPLE.border}` },
    ghost: { background: "transparent", color: APPLE.blue },
  } satisfies Record<string, React.CSSProperties>;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full px-5 py-2.5 text-[14px] font-medium transition-opacity hover:opacity-85 disabled:opacity-50 ${className}`}
      style={styles[variant]}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px]" style={{ color: APPLE.muted }}>
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputStyle: React.CSSProperties = {
  background: "#fff",
  border: `1px solid ${APPLE.border}`,
  color: APPLE.text,
};

export const inputClass =
  "w-full rounded-xl px-3.5 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#0071e3]/30";

export function Badge({
  children,
  color,
  bg,
}: {
  children: ReactNode;
  color: string;
  bg: string;
}) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium"
      style={{ color, background: bg }}
    >
      {children}
    </span>
  );
}

export function StatutBadge({ statut }: { statut: string }) {
  if (statut === "confirmee")
    return (
      <Badge color="#1a7f37" bg="rgba(52,199,89,0.14)">
        Confirmée
      </Badge>
    );
  if (statut === "refusee")
    return (
      <Badge color={APPLE.muted} bg="rgba(110,110,115,0.12)">
        Refusée
      </Badge>
    );
  return (
    <Badge color="#a15c00" bg="rgba(255,149,0,0.16)">
      En attente
    </Badge>
  );
}

export function AdminStars({ note, size = 16 }: { note: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${note} sur 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={n <= note ? APPLE.orange : APPLE.border}
        >
          <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.4l-5.81 3-1.11-6.47L.38 9.35l6.5-.95L12 2.5z" />
        </svg>
      ))}
    </span>
  );
}
