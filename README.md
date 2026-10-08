# operations

Synotech operations observability. Public Vite SPA served by a Cloudflare
Worker at `agent.synotech.dev/operations` (static docs, zero backends).

- `src/` — page, editorial SVG diagrams (`diagrams.ts`), estate data (`data.ts`)
- `vendor/diagram-design/` — vendored diagram skill + Synotech skin profile
- Diagrams follow `vendor/diagram-design/synotech.profile.md` (resolves the
  upstream style-guide gate — never ship default-skinned diagrams here).

## Develop

```bash
npm install
npm run dev     # local
npm run build   # -> dist/
```

## Deploy

```bash
npx wrangler deploy   # worker upload works with the SSM API token; the
                      # agent.synotech.dev/operations* route was attached once
                      # via dashboard (token lacks workers_routes:write).
                      # Re-deploys only re-upload; route persists.
```

Route (`wrangler.jsonc`): `agent.synotech.dev/operations*` (public, no Access
gate — owner decision). Canary: `/operations/__health`. `base: '/operations/'`
in `vite.config.ts` must match the mount path.

## Formatting (estate standard)

- Prettier is `{ useTabs: true, singleQuote: true, semi: false, printWidth: 120, trailingComma: "all" }` (tabs, indent width 4 via `.editorconfig`), in `.prettierrc`. Do not restyle it.
- Husky pre-commit runs `lint-staged`. Manual: `npm run format` / `npm run format:check`.
- `.editorconfig` at the repo root is authoritative for indent/line-endings. Do not add competing indent rules.
