import { renderChrome } from '../src/chrome';
import { runtimeArch } from '../src/diagrams';
import { HOSTS } from '../src/data';

renderChrome('topology');
document.getElementById('app')!.innerHTML = `
<section>
  <h2>Runtime</h2>
  <p class="sub">OCI VM 193.122.242.50 — everything loopback-bound, tunnels dial out.</p>
  <div class="card">${runtimeArch()}</div>
  <div class="card"><h3>Hostnames</h3><table>
    <tr><th>Hostname</th><th>Port</th><th>Serves</th></tr>
    ${HOSTS.map((h) => `<tr><td class="mono">${h.host}</td><td class="mono">${h.port || '—'}</td><td>${h.serves}</td></tr>`).join('')}
  </table></div>
</section>
<section>
  <h2>Edge rules</h2>
  <div class="card"><ul class="tight">
    <li><span class="mono">hermes-oci-dashboard</span> — agent, erp-*, code, metrics, pg-oci</li>
    <li><span class="mono">dr-secondary</span> (+ per-tenant) — be, website, chain</li>
    <li><span class="mono">rag</span> — dedicated connector</li>
    <li>Dashboard: username + password only · <span class="mono">/v1/*</span>: Hermes bearer · <span class="mono">/operations/*</span>: this worker (public)</li>
  </ul></div>
</section>`;
