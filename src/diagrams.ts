// Editorial inline-SVG diagrams (diagram-design philosophy: flat, no shadows,
// accent reserved for the focal node, density over decoration).
const INK = '#e8edf2';
const MUTED = '#8b98a9';
const ACCENT = '#43ffc0';
const PAPER2 = '#1a2230';
const RULE = 'rgba(139,152,169,0.28)';
const F = "font-family='Inter,-apple-system,Segoe UI,Roboto,sans-serif'";

function node(x: number, y: number, w: number, h: number, title: string, sub: string, focal = false): string {
  const stroke = focal ? ACCENT : RULE;
  const sw = focal ? 2 : 1;
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${PAPER2}" stroke="${stroke}" stroke-width="${sw}"/>
    <text x="${x + 14}" y="${y + 24}" ${F} font-size="13" font-weight="600" fill="${focal ? ACCENT : INK}">${title}</text>
    <text x="${x + 14}" y="${y + 42}" ${F} font-size="11" fill="${MUTED}">${sub}</text>
  </g>`;
}

function arrow(x1: number, y1: number, x2: number, y2: number, label = ''): string {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MUTED}" stroke-width="1.2" marker-end="url(#ah)"/>
    ${label ? `<text x="${(x1 + x2) / 2 + 6}" y="${(y1 + y2) / 2 - 6}" ${F} font-size="10" fill="${MUTED}">${label}</text>` : ''}`;
}

const defs = `<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="none" stroke="${MUTED}" stroke-width="1.2"/></marker></defs>`;

/** Public edge: client -> Cloudflare -> tunnel -> VM loopback origins. */
export function edgeDiagram(): string {
  return `<svg class="diagram" viewBox="0 0 1000 250" role="img" aria-label="Public edge flow">${defs}
    ${node(10, 90, 170, 60, 'Client', 'browser · CLI · app')}
    ${arrow(180, 120, 230, 120)}
    ${node(230, 90, 200, 60, 'Cloudflare edge', 'DNS · tunnel · /v1 bypass')}
    ${arrow(430, 120, 480, 120)}
    ${node(480, 90, 230, 60, 'OCI VM · 193.122.242.50', 'loopback only, no open ports')}
    ${arrow(710, 120, 760, 120)}
    ${node(760, 40, 230, 60, 'hermes-server :8642/:9120', 'gateway + dashboard', true)}
    ${node(760, 150, 230, 60, 'be ×3 · website · RAG', ':8101–8105 + tunnels')}
  </svg>`;
}

/** Runtime: one box, loopback services, outbound-only tunnels. */
export function runtimeDiagram(): string {
  return `<svg class="diagram" viewBox="0 0 1000 300" role="img" aria-label="Runtime topology">${defs}
    <rect x="10" y="10" width="980" height="280" rx="12" fill="none" stroke="${RULE}" stroke-dasharray="6 5"/>
    <text x="26" y="36" ${F} font-size="12" fill="${MUTED}">OCI Always Free VM — everything loopback-bound, tunnels dial out</text>
    ${node(30, 60, 210, 60, 'hermes-server', '16 profiles · :8642 · :9120', true)}
    ${node(260, 60, 210, 60, 'dr-secondary', 'be ×3 · chain · website')}
    ${node(490, 60, 210, 60, 'ERP fleet', '12 sites · MariaDB · Redis')}
    ${node(720, 60, 210, 60, 'rag · sycode · pg', 'dedicated tunnels')}
    ${node(30, 150, 300, 60, 'hermes-oci-dashboard', 'agent · erp-* · code · metrics')}
    ${node(350, 150, 300, 60, 'dr-secondary-*', 'per-tenant + central')}
    ${node(670, 150, 260, 60, 'rag tunnel', 'rag.synotech.dev')}
    ${arrow(360, 210, 360, 236)}${arrow(640, 210, 640, 236)}${arrow(880, 210, 880, 236)}
    <text x="30" y="262" ${F} font-size="12" fill="${MUTED}">egress 193.122.242.50 · secrets in SSM · zero GitHub secrets on wallet trains</text>
  </svg>`;
}
