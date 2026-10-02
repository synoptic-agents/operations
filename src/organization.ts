import { renderChrome } from '../src/chrome';
import { orgOverview } from '../src/diagrams';

renderChrome('organization');
document.getElementById('app')!.innerHTML = `
<section>
  <h2>Command &amp; lines</h2>
  <p class="sub">Invoke by line, not by person. Ambiguous work goes to the command center.</p>
  <div class="card">${orgOverview()}</div>
</section>
<section>
  <h2>Ownership</h2>
  <div class="grid">
    <div class="card brand-ventry"><h3>Ventry</h3><p class="muted">ventry.africa · smart cashless events + family wallet</p><p>Product bots: <a href="/operations/bots/">Ventry Business</a> · Console + mobile + be per tenant workspace.</p></div>
    <div class="card brand-vya"><h3>Vya</h3><p class="muted">vya.to · e-hailing + logistics</p><p>Product bots: <a href="/operations/bots/">Vya Finance</a> · Rides, courier, merchants, geo.</p></div>
    <div class="card brand-kg"><h3>KrugerGold</h3><p class="muted">kruger.gold · gold-backed assets + chain ledger</p><p>Product bots: <a href="/operations/bots/">Kruger Gold Finance</a> · KGR custody via workers/custody.</p></div>
    <div class="card brand-synotech"><h3>Platform</h3><p class="muted">ERP fleet · syCode · RAG · infra</p><p>Ops bots: <a href="/operations/bots/">Engineering + Executive</a> · IaC owns everything.</p></div>
  </div>
</section>
<section>
  <h2>Escalation</h2>
  <div class="card"><ul class="tight">
    <li>Product incident → owning line bot → <strong>Chief Operations</strong></li>
    <li>Scope or spend decision → <strong>Chief Executive</strong> (decision with numbers)</li>
    <li>Quality or architecture dispute → <strong>Tech Lead</strong> (evidence, not opinion)</li>
    <li>Overruns → <strong>Chief Finance</strong> (numbers + options, early)</li>
  </ul></div>
</section>`;
