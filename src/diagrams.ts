// Editorial SVG builders — diagram-design grammar:
// orthogonal connectors only (no diagonals), zones before arrows before nodes,
// one focal node per diagram, legend strip at bottom, density over decoration.
const INK = '#e8edf2';
const MUTED = '#8b98a9';
const ACCENT = '#43ffc0';
const PAPER2 = '#1a2230';
const RULE = 'rgba(139,152,169,0.30)';
const F = "font-family='Inter,-apple-system,Segoe UI,Roboto,sans-serif'";

const defs = `<defs>
  <marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
    <path d="M0,0 L8,4 L0,8" fill="none" stroke="${MUTED}" stroke-width="1.2"/>
  </marker>
</defs>`;

export interface OrgNode { title: string; sub: string; color?: string; focal?: boolean; dashed?: boolean }

function box(x: number, y: number, w: number, h: number, n: OrgNode): string {
  const stroke = n.focal ? ACCENT : n.color ?? RULE;
  const sw = n.focal ? 2 : 1.4;
  const dash = n.dashed ? ' stroke-dasharray="5,4"' : '';
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${PAPER2}" stroke="${stroke}" stroke-width="${sw}"${dash}/>
    ${n.color && !n.focal ? `<rect x="${x}" y="${y}" width="4" height="${h}" rx="2" fill="${n.color}"/>` : ''}
    <text x="${x + 16}" y="${y + 25}" ${F} font-size="13.5" font-weight="600" fill="${n.focal ? ACCENT : INK}">${n.title}</text>
    <text x="${x + 16}" y="${y + 43}" ${F} font-size="11" fill="${MUTED}">${n.sub}</text>
  </g>`;
}

/** Vertical drop from parent bottom-center to a horizontal bus, then drops to each child top-center. */
function bus(px: number, py: number, busY: number, xs: number[], childTop: number): string {
  const min = Math.min(...xs);
  const max = Math.max(...xs);
  let s = `<path d="M ${px},${py} V ${busY}" fill="none" stroke="${MUTED}" stroke-width="1.2"/>`;
  s += `<line x1="${min}" y1="${busY}" x2="${max}" y2="${busY}" stroke="${MUTED}" stroke-width="1.2"/>`;
  for (const x of xs) {
    s += `<path d="M ${x},${busY} V ${childTop}" fill="none" stroke="${MUTED}" stroke-width="1.2" marker-end="url(#ah)"/>`;
  }
  return s;
}

function zone(x: number, y: number, w: number, h: number, label: string): string {
  const lw = label.length * 6.6 + 28;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="rgba(139,152,169,0.05)" stroke="${RULE}" stroke-width="0.8"/>
    <rect x="${x + 14}" y="${y + 5}" width="${lw}" height="16" rx="3" fill="#0f141a"/>
    <text x="${x + 28}" y="${y + 17}" ${F} font-size="10.5" letter-spacing="1.5" fill="${MUTED}">${label.toUpperCase()}</text>`;
}

const legend = (items: [string, string][]): string =>
  `<g>${items.map(([label, color], i) => {
    const x = 14 + i * 210;
    const swatch = color === 'dashed'
      ? `<rect x="${x}" y="0" width="14" height="10" rx="2" fill="none" stroke="${MUTED}" stroke-dasharray="3,2"/>`
      : `<circle cx="${x + 7}" cy="5" r="5" fill="${color}"/>`;
    return `${swatch}<text x="${x + 22}" y="9" ${F} font-size="10.5" fill="${MUTED}">${label}</text>`;
  }).join('')}</g>`;

/** Overview org chart: command center -> 4 product lines + platform. 9 nodes. */
export function orgOverview(): string {
  const W = 200;
  const H = 62;
  const rootX = 500;
  const rootY = 20;
  const kids = [60, 295, 530, 765];
  const kidY = 190;
  return `<svg class="diagram" viewBox="0 0 1000 330" role="img" aria-label="Organization overview">${defs}
    ${box(rootX - 110, rootY, 220, H, { title: 'Synotech Operator', sub: 'command center · owner', focal: true })}
    ${bus(rootX, rootY + H, 140, kids.map((x) => x + W / 2), kidY)}
    ${box(kids[0], kidY, W, H, { title: 'Ventry', sub: 'ventry.africa · events + wallet', color: '#c800c8' })}
    ${box(kids[1], kidY, W, H, { title: 'Vya', sub: 'vya.to · e-hailing + logistics', color: '#C2410C' })}
    ${box(kids[2], kidY, W, H, { title: 'KrugerGold', sub: 'kruger.gold · gold + crypto', color: '#B8860B' })}
    ${box(kids[3], kidY, W, H, { title: 'Platform', sub: 'ERP · syCode · RAG · infra', color: ACCENT })}
    <g transform="translate(0,296)">${legend([['command center', ACCENT], ['product line', MUTED]])}</g>
  </svg>`;
}

/** Bot responsibility chart: sections as zones, bots as chips. */
export function botSections(sections: { name: string; color: string; bots: { title: string; slug: string }[] }[]): string {
  const zoneW = 470;
  const zoneH = 200;
  let s = `<svg class="diagram" viewBox="0 0 1000 ${60 + Math.ceil(sections.length / 2) * (zoneH + 24)}" role="img" aria-label="Bot responsibility map">${defs}`;
  sections.forEach((sec, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 14 + col * (zoneW + 12);
    const y = 14 + row * (zoneH + 24);
    s += zone(x, y, zoneW, zoneH, sec.name);
    sec.bots.forEach((b, j) => {
      const bx = x + 16 + (j % 2) * 222;
      const by = y + 44 + Math.floor(j / 2) * 48;
      s += `<g><rect x="${bx}" y="${by}" width="210" height="38" rx="8" fill="${PAPER2}" stroke="${RULE}"/>
        <circle cx="${bx + 16}" cy="${by + 19}" r="6" fill="${sec.color}"/>
        <text x="${bx + 30}" y="${by + 24}" ${F} font-size="12" fill="${INK}">${b.title}</text></g>`;
    });
  });
  s += `<g transform="translate(0,${30 + Math.ceil(sections.length / 2) * (zoneH + 24)})">${legend([['bot', MUTED], ['section color = team', ACCENT]])}</g></svg>`;
  return s;
}

/** Runtime architecture: zones with elbow connectors, focal gateway. */
export function runtimeArch(): string {
  // Elbow: right+down with r=8, per architecture type rules.
  const elbow = (x1: number, y1: number, x2: number, y2: number): string => {
    const mid = (x1 + x2) / 2;
    return `<path d="M ${x1},${y1} H ${mid - 8} Q ${mid},${y1} ${mid},${y1 + 8} V ${y2 - 8} Q ${mid},${y2} ${mid + 8},${y2} H ${x2}" fill="none" stroke="${MUTED}" stroke-width="1.2" marker-end="url(#ah)"/>`;
  };
  return `<svg class="diagram" viewBox="0 0 1000 420" role="img" aria-label="Runtime architecture">${defs}
    ${zone(10, 10, 980, 120, 'public edge · cloudflare')}
    ${box(40, 58, 200, 56, { title: 'DNS + tunnels', sub: 'zones · tunnel ingress' })}
    ${box(280, 58, 220, 56, { title: 'Access policy', sub: '/v1 bypass · dashboard login' })}
    ${box(540, 58, 200, 56, { title: 'Worker: operations', sub: '/operations/* · this page' })}
    ${zone(10, 150, 980, 220, 'oci vm · 193.122.242.50 · loopback only')}
    ${box(40, 210, 240, 60, { title: 'hermes-server', sub: '16 profiles · :8642 · :9120', focal: true })}
    ${box(310, 210, 200, 60, { title: 'be ×3 + website', sub: ':8101–8105 · nginx' })}
    ${box(540, 210, 200, 60, { title: 'ERP · RAG · syCode', sub: 'compose fleets' })}
    ${box(770, 210, 190, 60, { title: 'db-pg · db-redis', sub: ':5434 · :6380' })}
    ${elbow(640, 114, 160, 210)}
    ${elbow(640, 114, 410, 210)}
    <g transform="translate(0,392)">${legend([['serving gateway', ACCENT], ['origin (loopback)', MUTED]])}</g>
  </svg>`;
}
