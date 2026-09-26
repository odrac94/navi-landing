// Copia las fuentes de node_modules a assets/fonts/ para servirlas desde
// nuestro dominio (sin fonts.googleapis.com: la IP del visitante no sale a Google).
import { cpSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dest = join(root, 'assets', 'fonts');
mkdirSync(dest, { recursive: true });

const fonts = [
  '@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2',
  '@fontsource-variable/space-grotesk/files/space-grotesk-latin-ext-wght-normal.woff2',
  'material-icons/iconfont/material-icons.woff2',
];
for (const f of fonts) cpSync(join(root, 'node_modules', f), join(dest, f.split('/').pop()));

console.log(`Copiadas ${fonts.length} fuentes a assets/fonts/`);
