import { Card } from "./ui";

export function Shimmer({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`admin-shimmer rounded-xl ${className}`}
      style={{ background: "#f5f5f7", ...(style ?? {}) }}
      aria-hidden="true"
    />
  );
}

export const SHIMMER_CSS = `
.admin-shimmer { position: relative; overflow: hidden; }
.admin-shimmer::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0) 100%);
  animation: admin-sweep 1.8s ease-in-out infinite;
}
@keyframes admin-sweep { 100% { transform: translateX(100%); } }
.admin-fade { animation: admin-fade-in 250ms ease-out both; }
@keyframes admin-fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
.admin-card-hover { transition: box-shadow 200ms ease, transform 200ms ease; }
.admin-card-hover:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
@media (prefers-reduced-motion: reduce) {
  .admin-shimmer::after { animation: none; }
  .admin-fade { animation: none; }
  .admin-card-hover { transition: none; }
}
`;

/** Squelette de la vue d'ensemble — mêmes hauteurs que le contenu chargé. */
export function OverviewSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="p-6 md:p-8">
        <Shimmer className="h-4 w-40" />
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Shimmer className="h-[56px] w-[260px]" />
            <Shimmer className="mt-3 h-4 w-[220px]" />
          </div>
          <Shimmer className="h-[80px] w-full max-w-[320px]" />
        </div>
        <Shimmer className="mt-6 h-[92px] w-full rounded-2xl" />
      </Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Card key={i} className="p-5 md:p-6">
            <Shimmer className="h-4 w-28" />
            <Shimmer className="mt-3 h-9 w-24" />
            <Shimmer className="mt-3 h-3 w-32" />
          </Card>
        ))}
      </div>
      <Card className="p-5 md:p-6">
        <Shimmer className="h-5 w-64" />
        <Shimmer className="mt-2 h-3 w-96 max-w-full" />
        <Shimmer className="mt-6 h-[300px] w-full rounded-2xl" />
      </Card>
      <Card className="p-5 md:p-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <Shimmer className="h-7 w-24" />
              <Shimmer className="mt-2 h-3 w-28" />
              <Shimmer className="mt-2 h-3 w-32" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
