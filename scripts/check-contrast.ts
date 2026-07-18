/* ===================================================================
 * check-contrast.ts — WCAG 2.1 contrast verification
 * Contrast pairs from Analog Brutalist Collage design system
 * =================================================================== */

function hexToRgb(hex: string): [number, number, number] {
  const raw = hex.replace('#', '');
  const r = parseInt(raw.substring(0, 2), 16);
  const g = parseInt(raw.substring(2, 4), 16);
  const b = parseInt(raw.substring(4, 6), 16);
  return [r, g, b];
}

function relativeLuminance(r: number, g: number, b: number): number {
  const rsrgb = r / 255;
  const gsrgb = g / 255;
  const bsrgb = b / 255;
  const rl = rsrgb <= 0.04045 ? rsrgb / 12.92 : ((rsrgb + 0.055) / 1.055) ** 2.4;
  const gl = gsrgb <= 0.04045 ? gsrgb / 12.92 : ((gsrgb + 0.055) / 1.055) ** 2.4;
  const bl = bsrgb <= 0.04045 ? bsrgb / 12.92 : ((bsrgb + 0.055) / 1.055) ** 2.4;
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

interface Pair {
  fg: string;
  bg: string;
  label: string;
  minRatio: number;
}

const PAIRS: Pair[] = [
  { fg: '#1C1B1B', bg: '#FDF8F8', label: 'text-primary on page', minRatio: 4.5 },
  { fg: '#000', bg: '#FDF8F8', label: 'border on page', minRatio: 3 },
  { fg: '#1C1B1B', bg: '#D9D2C5', label: 'text-primary on container', minRatio: 4.5 },
  { fg: '#000', bg: '#D9D2C5', label: 'border on container', minRatio: 3 },
  { fg: '#D1FF00', bg: '#000', label: 'text-active on inverse', minRatio: 3 },
  { fg: '#FDF8F8', bg: '#000', label: 'text-inverse on inverse', minRatio: 4.5 },
  { fg: '#FDF8F8', bg: '#1C1B1B', label: 'text-inverse on dark', minRatio: 4.5 },
];

let failures = 0;

for (const { fg, bg, label, minRatio } of PAIRS) {
  const [fr, fgR, fb] = hexToRgb(fg);
  const [br, bgR, bb] = hexToRgb(bg);
  const fl = relativeLuminance(fr, fgR, fb);
  const bl = relativeLuminance(br, bgR, bb);
  const ratio = contrastRatio(fl, bl);
  if (ratio < minRatio) {
    console.error(
      `FAIL ${label}: ratio ${ratio.toFixed(2)} (min ${minRatio}) — fg=${fg} bg=${bg}`,
    );
    failures++;
  }
}

if (failures > 0) {
  console.error(`\n${failures} contrast failure(s) found.`);
  process.exit(1);
}

console.log('check:contrast passed.');
