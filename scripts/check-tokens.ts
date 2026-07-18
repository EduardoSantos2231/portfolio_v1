import { readFileSync, readdirSync } from 'node:fs';
import { resolve, relative } from 'node:path';

const SRC_DIR = resolve(import.meta.dirname, '..', 'src');
const STYLES_DIR = resolve(SRC_DIR, 'styles');
const TOKENS_FILE = resolve(STYLES_DIR, 'tokens.css');

function findFiles(dir: string, ext: string): string[] {
  const entries = readdirSync(dir, { recursive: true, encoding: 'utf8' });
  return entries
    .filter((e) => e.endsWith(ext))
    .map((e) => resolve(dir, e as string));
}

let failures = 0;

const tokensContent = (() => {
  try {
    return readFileSync(TOKENS_FILE, 'utf8');
  } catch {
    return '';
  }
})();

const foundationTokens = new Set<string>();
const re = /--(foundation-[\w-]*)/g;
let match: RegExpExecArray | null;
while ((match = re.exec(tokensContent)) !== null) {
  foundationTokens.add(`--${match[1]}`);
}

if (foundationTokens.size === 0) {
  console.log('check:tokens: no foundation tokens found (tokens.css may not exist yet) — skipping.');
  process.exit(0);
}

const cssFiles = findFiles(SRC_DIR, '.css').filter(
  (f) => !f.endsWith('tokens.css') && !f.startsWith(STYLES_DIR),
);

for (const file of cssFiles) {
  const content = readFileSync(file, 'utf8');
  for (const token of foundationTokens) {
    if (content.includes(token)) {
      const rel = relative(SRC_DIR, file);
      console.error(`FAIL: ${rel} references foundation token "${token}" — only tokens.css may use foundation tokens.`);
      failures++;
    }
  }
}

if (failures > 0) {
  console.error(`\n${failures} token violation(s) found.`);
  process.exit(1);
}

console.log('check:tokens passed.');
