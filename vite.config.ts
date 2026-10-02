import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

// Static multi-page: pretty URLs under the /operations/ mount.
// No client JS — pages are self-contained HTML+SVG (diagram-design output).
export default defineConfig({
  base: '/operations/',
  build: {
    outDir: 'dist/operations',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        organization: resolve(root, 'organization/index.html'),
        topology: resolve(root, 'topology/index.html'),
        bots: resolve(root, 'bots/index.html'),
        brand: resolve(root, 'brand/index.html'),
      },
    },
  },
  publicDir: 'public',
});
