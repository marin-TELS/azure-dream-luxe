type StarsProps = {
  value: number;
  size?: number;
  className?: string;
};

/** Étoiles dorées avec support des étoiles partielles. */
export function Stars({ value, size = 18, className = "" }: StarsProps) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-label={`${value} sur 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span
            key={i}
            className="relative inline-block"
            style={{ width: size, height: size }}
            aria-hidden="true"
          >
            <StarSvg size={size} className="absolute inset-0 text-accent/25" filled />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <StarSvg size={size} className="text-accent" filled />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function StarSvg({
  size,
  className,
  filled,
}: {
  size: number;
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.4l-5.81 3-1.11-6.47L.38 9.35l6.5-.95L12 2.5z" />
    </svg>
  );
}
