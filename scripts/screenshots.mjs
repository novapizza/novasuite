#!/usr/bin/env node
// Turns raw window captures into the WebP files the detail page loads:
//   node scripts/screenshots.mjs novapad mac ~/Desktop/novapad-mac
// Each PNG/JPG in the folder becomes public/screenshots/<slug>/<platform>/<name>.webp,
// scaled to at most 2880 px wide. Capture at Retina 2x (Cmd+Shift+4, then Space on
// a built-in display) or Windows at 200% scale: 1x captures look soft on the page.
// Name the captures after the scenes in src/lib/products.ts (editor.png,
// json-records.png, ...). Restart `npm run dev` afterwards: Vite only picks up
// new public/ files at startup.
import { mkdirSync, readdirSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.error("sharp is missing. Install it with: npm i -D sharp");
  process.exit(1);
}

const [slug, platform, inputDir] = process.argv.slice(2);
if (!slug || !["mac", "windows"].includes(platform) || !inputDir) {
  console.error("Usage: node scripts/screenshots.mjs <slug> <mac|windows> <folder>");
  process.exit(1);
}

const outDir = fileURLToPath(
  new URL(`../public/screenshots/${slug}/${platform}/`, import.meta.url),
);
mkdirSync(outDir, { recursive: true });

const inputs = readdirSync(inputDir).filter((f) => /\.(png|jpe?g)$/i.test(f));
if (inputs.length === 0) {
  console.error(`No PNG or JPG files in ${inputDir}`);
  process.exit(1);
}

for (const file of inputs) {
  const name = basename(file, extname(file));
  const out = join(outDir, `${name}.webp`);
  // Keeps the alpha channel, so macOS window shadows stay transparent.
  const info = await sharp(join(inputDir, file))
    .resize({ width: 2880, withoutEnlargement: true })
    // High quality and full-resolution chroma keep small UI text crisp.
    .webp({ quality: 92, smartSubsample: true, effort: 6 })
    .toFile(out);
  const note = info.width < 2000 ? "  (1x capture, will look soft; recapture at 2x)" : "";
  console.log(
    `${name}.webp  ${info.width}×${info.height}  ${Math.round(info.size / 1024)} KB${note}`,
  );
}
