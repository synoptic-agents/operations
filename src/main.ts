import { VM, HOSTS, BOTS, SECTIONS, ORGS } from './data';
import { edgeDiagram, runtimeDiagram } from './diagrams';

const app = document.getElementById('app')!;
const nav = document.getElementById('nav')!;

const links: [string, string][] = [
  ['estate', 'Estate'],
  ['runtime', 'Runtime'],
  ['bots', 'Bots'],
  ['edge', 'Edge & DNS'],
  ['runbooks', 'Runbooks'],
];
nav.innerHTML = links.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('');

const botCards = SECTIONS.map(
  (s) => `<div class="card"><h3>${s}</h3><table>
    ${BOTS.filter((b) => b.section === s)
      .map(
        (b) =>
          `<tr><td><span class="dot" style="background:${b.color}"></span>${b.title}</td><td class="mono muted">${b.slug}</td></tr>`,
      )
      .join('')}
  </table></div>`,
).join('');

app.innerHTML = `
<section id="estate">
  <h2>Estate</h2>
  <p class="sub">One folder per GitHub org in <span class="mono">~/stack</span>. Eight orgs, one box, one edge.</p>
  <div class="card"><h3>Public edge flow</h3>${edgeDiagram()}</div>
  <div class="card"><h3>Organizations</h3><table>
    <tr><th>Org</th><th>Repos</th></tr>
    ${ORGS.map((o) => `<tr><td class="mono">${o.org}</td><td>${o.repos}</td></tr>`).join('')}
  </table></div>
</section>
<section id="runtime">
  <h2>Runtime</h2>
  <p class="sub">OCI VM ${VM.ip} (${VM.name}, ${VM.cpu} / ${VM.ram}). All origins loopback-only.</p>
  <div class="card"><h3>One box</h3>${runtimeDiagram()}</div>
  <div class="card"><h3>Hostnames</h3><table>
    <tr><th>Hostname</th><th>Port</th><th>Serves</th></tr>
    ${HOSTS.map((h) => `<tr><td class="mono">${h.host}</td><td class="mono">${h.port || '—'}</td><td>${h.serves}</td></tr>`).join('')}
  </table></div>
</section>
<section id="bots">
  <h2>Bots</h2>
  <p class="sub">16 profiles on the multiplexed OCI gateway. Dashboard: <span class="mono">agent.synotech.dev</span> · API: <span class="mono">agent.synotech.dev/v1</span>.</p>
  <div class="grid">${botCards}</div>
</section>
<section id="edge">
  <h2>Edge &amp; DNS</h2>
  <p class="sub">Central Cloudflare account. Tunnels dial out from the VM; nothing listens publicly.</p>
  <div class="card"><ul class="tight">
    <li><span class="mono">hermes-oci-dashboard</span> — agent, erp-*, code, metrics, pg-oci</li>
    <li><span class="mono">dr-secondary</span> (+ per-tenant) — be, website, chain mirrors</li>
    <li><span class="mono">rag</span> — dedicated connector for rag.synotech.dev</li>
    <li>Dashboard: username + password only (no Access gate). <span class="mono">/v1/*</span>: Hermes bearer.</li>
  </ul></div>
</section>
<section id="runbooks">
  <h2>Runbooks</h2>
  <p class="sub">Authority lives in <span class="mono">synoptic-infrastructure/infra</span>.</p>
  <div class="card"><ul class="tight">
    <li>oci-production — the live stack map</li>
    <li>oci-always-free — the VM, Hermes server, monitoring</li>
    <li>erp-oci / rag-oci / hermes-server — per-workload ops</li>
    <li>secret-rotation — SSM as truth, Terraform as writer</li>
  </ul></div>
</section>`;
