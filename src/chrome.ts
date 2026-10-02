// Shared chrome: nav + footer, tenant-aware accents.
export interface Page { id: string; path: string; label: string }

export const PAGES: Page[] = [
  { id: 'home', path: '/operations/', label: 'Overview' },
  { id: 'organization', path: '/operations/organization/', label: 'Organization' },
  { id: 'topology', path: '/operations/topology/', label: 'Architecture' },
  { id: 'bots', path: '/operations/bots/', label: 'Bots' },
  { id: 'brand', path: '/operations/brand/', label: 'Brand' },
];

export function renderChrome(active: string): void {
  const nav = document.getElementById('nav');
  if (nav) {
    nav.innerHTML = PAGES.map((p) =>
      `<a href="${p.path}"${p.id === active ? ' aria-current="page" class="on"' : ''}>${p.label}</a>`,
    ).join('');
  }
}

export const BRAND = {
  synotech: { color: '#43ffc0', name: 'Synotech' },
  ventry: { color: '#c800c8', name: 'Ventry', apex: 'ventry.africa' },
  vya: { color: '#C2410C', name: 'Vya', apex: 'vya.to' },
  krugergold: { color: '#B8860B', name: 'KrugerGold', apex: 'kruger.gold' },
} as const;
