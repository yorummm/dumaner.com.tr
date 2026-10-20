// Prepares the site's images from the app project: icon, social card and phone screenshots.
//
//   node src/assets.mjs <app project dir> <screenshots dir>
//
// Screenshots come from the app's scripts/screenshots.mjs (1290×2796 PNG per language).

import { mkdirSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const [appDir, shotsDir] = process.argv.slice(2);
const sharp = createRequire(join(appDir, 'package.json'))('sharp');
const out = join(root, 'assets');
mkdirSync(join(out, 'shots'), { recursive: true });

const icon = join(appDir, 'assets', 'images', 'icon.png');
await sharp(icon).resize(192).png().toFile(join(out, 'icon-192.png'));
await sharp(icon).resize(512).png().toFile(join(out, 'icon-512.png'));

// Social card: icon on the night background with the name.
const card = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<defs><radialGradient id="g" cx="75%" cy="20%" r="80%"><stop offset="0" stop-color="#14473a"/><stop offset="1" stop-color="#071a15"/></radialGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/>
<text x="460" y="300" font-family="Georgia, serif" font-size="110" fill="#f1e8d6">Ünsiyet</text>
<text x="464" y="380" font-family="Georgia, serif" font-size="40" fill="#d3b06a">Kur’an, namaz, dua ve zikir</text>
</svg>`);
const iconCard = await sharp(icon).resize(300).png().toBuffer();
await sharp(card).composite([{ input: iconCard, left: 110, top: 165 }]).png().toFile(join(out, 'og.png'));

for (const lang of ['tr', 'en']) {
  const from = join(shotsDir, lang);
  mkdirSync(join(out, 'shots', lang), { recursive: true });
  for (const file of readdirSync(from).filter((name) => name.endsWith('.png'))) {
    await sharp(join(from, file))
      .resize(645)
      .webp({ quality: 82 })
      .toFile(join(out, 'shots', lang, file.replace('.png', '.webp')));
  }
}
console.log('assets ready');
