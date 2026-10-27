import { access, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const indexHtml = path.join(distDir, 'index.html');
const notFoundHtml = path.join(distDir, '404.html');

try {
  await access(indexHtml);
} catch {
  console.error(
    `[ERROR] Missing required file: ${indexHtml}. Ensure 'vite build' completed successfully before running copy-404.`
  );
  process.exit(1);
}

try {
  await copyFile(indexHtml, notFoundHtml);
} catch (err) {
  console.error(`[ERROR] Failed to copy 404.html: ${err.message}`);
  process.exit(1);
}
