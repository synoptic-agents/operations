import { renderChrome } from '../src/chrome';
import { orgOverview } from '../src/diagrams';

renderChrome('home');
document.getElementById('app')!.innerHTML = `
<section>
  <h2>Who serves what</h2>
  <p class="sub">One command center, four lines. Detail per line lives under Organization.</p>
  <div class="card">${orgOverview()}</div>
</section>
<section>
  <h2>Start here</h2>
  <div class="grid">
    <div class="card"><h3>Organization</h3><p>Companies, product lines, teams and who owns what — with escalation paths.</p><p><a href="/operations/organization/">Open →</a></p></div>
    <div class="card"><h3>Bots</h3><p>All 16 gateway profiles by section, with titles and team colors.</p><p><a href="/operations/bots/">Open →</a></p></div>
    <div class="card"><h3>Architecture</h3><p>Edge, VM and data planes — isolated here so it never crowds the org view.</p><p><a href="/operations/topology/">Open →</a></p></div>
    <div class="card"><h3>Brand</h3><p>Logos and palette per tenant, as served.</p><p><a href="/operations/brand/">Open →</a></p></div>
  </div>
</section>`;
