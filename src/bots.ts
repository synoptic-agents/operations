import { renderChrome } from '../src/chrome';
import { botSections } from '../src/diagrams';
import { BOTS } from '../src/data';

renderChrome('bots');

const bySection = (name: string, color: string) => ({
  name,
  color,
  bots: BOTS.filter((b) => b.section === name).map((b) => ({ title: b.title, slug: b.slug })),
});

document.getElementById('app')!.innerHTML = `
<section>
  <h2>Responsibility map</h2>
  <p class="sub">Section color is the team. Titles are dashboard-verbatim.</p>
  <div class="card">${botSections([
    bySection('Business Development', 'hsl(115 68% 58%)'),
    bySection('ERP ~ Marketing', 'hsl(201 68% 58%)'),
    bySection('Engineering', 'hsl(217 68% 58%)'),
    bySection('Executive', 'hsl(45 85% 55%)'),
  ])}</div>
</section>
<section>
  <h2>Roster</h2>
  <div class="card"><table>
    <tr><th>Bot</th><th>Slug</th><th>Section</th></tr>
    ${BOTS.map(
      (b) =>
        `<tr><td><span class="dot" style="background:${b.color}"></span>${b.title}</td><td class="mono muted">${b.slug}</td><td>${b.section}</td></tr>`,
    ).join('')}
  </table></div>
</section>`;
