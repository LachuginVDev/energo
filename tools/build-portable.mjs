import { build } from 'esbuild';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const portableDir = path.join(rootDir, 'portable');
const assetsDir = path.join(portableDir, 'assets');

async function buildPortable() {
  await rm(portableDir, { recursive: true, force: true });
  await mkdir(assetsDir, { recursive: true });

  await build({
    entryPoints: [path.join(rootDir, 'src', 'main.js')],
    outfile: path.join(assetsDir, 'main.js'),
    bundle: true,
    format: 'iife',
    platform: 'browser',
    target: ['es2018'],
    minify: false,
    sourcemap: false,
    charset: 'utf8',
    assetNames: 'media/[hash]',
    loader: {
      '.svg': 'file',
      '.mp4': 'file',
      '.png': 'file',
    },
    logLevel: 'info',
  });

  const sourceHtml = await readFile(path.join(rootDir, 'index.html'), 'utf8');

  // Удаляем dev-скрипт Vite и вставляем переносимые css/js.
  const withoutDevScript = sourceHtml.replace(
    /<script\s+type="module"\s+src="\/src\/main\.js"><\/script>/,
    ''
  );

  const withCss = withoutDevScript.replace(
    '</head>',
    '    <link rel="stylesheet" href="./assets/main.css" />\n  </head>'
  );

  const finalHtml = withCss.replace(
    '</body>',
    '    <script src="./assets/main.js"></script>\n  </body>'
  );

  await writeFile(path.join(portableDir, 'index.html'), finalHtml, 'utf8');

  console.log('Portable build created in ./portable');
}

buildPortable().catch((error) => {
  console.error(error);
  process.exit(1);
});

