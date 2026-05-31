const SUFFIXES = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc"];

export function formatNumber(n: number): string {
  if (n < 0) return "-" + formatNumber(-n);
  if (n < 1_000_000) return n.toLocaleString("en-US");

  let tier = 0;
  let scaled = n;
  while (scaled >= 1000 && tier < SUFFIXES.length - 1) {
    scaled /= 1000;
    tier++;
  }

  return scaled.toFixed(2) + SUFFIXES[tier];
}
