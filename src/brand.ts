import { renderChrome, BRAND } from '../src/chrome';

renderChrome('brand');

type Line = keyof typeof BRAND;
const lines: { key: Line; apex?: string; note: string }[] = [
  { key: 'synotech', note: 'Operator · estate-wide surfaces' },
  { key: 'ventry', apex: 'ventry.africa', note: 'Events + family wallet' },
  { key: 'vya', apex: 'vya.to', note: 'E-hailing + logistics' },
  { key: 'krugergold', apex: 'kruger.gold', note: 'Gold-backed assets' },
];

const slug = { synotech: 'synotech', ventry: 'ventry', vya: 'yaya', krugergold: 'krugergold' } as const;

document.getElementById('app')!.innerHTML = `
<section>
  <h2>Lines</h2>
  <div class="grid">
    ${lines
      .map(
        (l) => `<div class="card brandline" style="--line:${BRAND[l.key].color}">
          <img src="/operations/brand/${slug[l.key]}/logo.svg" alt="${BRAND[l.key].name} logo" />
          <img src="/operations/brand/${slug[l.key]}/logo-light.svg" alt="${BRAND[l.key].name} logo light" class="on-light" />
          <h3>${BRAND[l.key].name}</h3>
          <p class="muted">${l.apex ?? ''} · ${l.note}</p>
          <p><span class="swatch" style="background:${BRAND[l.key].color}"></span><span class="mono">${BRAND[l.key].color}</span></p>
        </div>`,
      )
      .join('')}
  </div>
</section>
<section>
  <h2>Ops palette</h2>
  <div class="card"><table>
    <tr><th>Role</th><th>Token</th></tr>
    <tr><td>Paper / card</td><td class="mono">#0f141a / #1a2230</td></tr>
    <tr><td>Ink / muted</td><td class="mono">#e8edf2 / #8b98a9</td></tr>
    <tr><td>Accent (focal only)</td><td class="mono">#43ffc0</td></tr>
  </table></div>
</section>`;
