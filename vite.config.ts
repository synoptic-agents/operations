import { defineConfig } from 'vite'

// Served from agent.synotech.dev/operations/* — base must match the mount
// path or every asset 404s behind the prefix (same lesson as the consoles).
export default defineConfig({
  base: '/operations/',
  build: {
    // Served from agent.synotech.dev/operations*: edge maps the request path
    // onto the asset path, so files must live under dist/operations/.
    outDir: 'dist/operations',
    emptyOutDir: true,
  },
})
