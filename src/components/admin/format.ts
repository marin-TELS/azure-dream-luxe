const NF = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

/** 266000 -> "266 000" (espaces insécables fines fournies par Intl) */
export function nombre(n?: number) {
  return NF.format(Math.round(n ?? 0));
}

/** 266000 -> "266 000 €" */
export function euro(n?: number) {
  return `${nombre(n)}\u00a0€`;
}

export function pourcent(n?: number) {
  return `${nombre(n)}\u00a0%`;
}
