// Rasterises the logo SVGs into the PNGs that browsers need.
// Run `pnpm icons` after changing any SVG in assets/images.
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const images = new URL('../assets/images/', import.meta.url);

// [source, output, size in px]
const jobs = [
    ['favicon.svg', 'favicon-64.png', 64],
    ['favicon.svg', 'favicon-128.png', 128],
    ['favicon.svg', 'favicon-256.png', 256],
    ['logo-clean.svg', 'apple-touch-icon.png', 180],
    ['logo.svg', 'logo-1024.png', 1024],
];

for (const [source, output, size] of jobs) {
    // favicon.svg changes colour with the system scheme and a PNG cannot, so the fallbacks get its dark variant.
    const svg = (await readFile(new URL(source, images), 'utf8')).replace('(prefers-color-scheme: light)', 'not all');
    const input = Buffer.from(svg);
    const { width } = await sharp(input).metadata();

    // Density scales the vector before it is rasterised, so every size is drawn directly, not resampled.
    await sharp(input, { density: (72 * size) / width })
        .resize(size, size)
        .removeAlpha()
        .png({ compressionLevel: 9 })
        .toFile(fileURLToPath(new URL(output, images)));

    console.log(`${output}  ${size}x${size}`);
}
