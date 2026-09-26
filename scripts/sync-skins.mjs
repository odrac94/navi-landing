// Copia las skins reales de la extensión (pip*.html, styles*.css, fonts/)
// a skins/ para que el demo del hero use exactamente el mismo HTML/CSS.
//
// Uso: node scripts/sync-skins.mjs [ruta-a-extension-letras]
// Por defecto busca ../extension-letras junto a este repo.
import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(process.argv[2] ?? join(root, '..', 'extension-letras'));
const dest = join(root, 'skins');

if (!existsSync(join(src, 'manifest.json'))) {
  console.error(`No encuentro la extensión en ${src}`);
  process.exit(1);
}

mkdirSync(join(dest, 'fonts'), { recursive: true });

const files = readdirSync(src).filter(
  (f) => /^pip(\.[\w-]+)?\.html$/.test(f) || /^styles(\.[\w-]+)?\.css$/.test(f),
);
for (const f of files) cpSync(join(src, f), join(dest, f));
cpSync(join(src, 'fonts'), join(dest, 'fonts'), { recursive: true });

console.log(`Copiados ${files.length} archivos + fonts/ desde ${src}`);
