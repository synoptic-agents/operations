// Estate facts. Curated from the infra registry + live box state 2026-10-02.
// Volatile values (health, versions) are intentionally absent — this page
// documents structure, not momentary status.

export interface Host { host: string; port: number; serves: string }
export interface Bot { slug: string; title: string; section: string; color: string }

export const VM = { ip: '193.122.242.50', name: 'instance-20260822-1654', cpu: '4 OCPU', ram: '24 GB' };

export const HOSTS: Host[] = [
  { host: 'be-ventry-secondary.synotech.dev', port: 8101, serves: 'Parse be/ ventry (/api/health)' },
  { host: 'be-yaya-secondary.synotech.dev', port: 8102, serves: 'Parse be/ yaya (/api/health)' },
  { host: 'be-krugergold-secondary.synotech.dev', port: 8103, serves: 'Parse be/ krugergold (/api/health)' },
  { host: 'chain-krugergold-secondary.synotech.dev', port: 8104, serves: 'KGR chain ledger (/health)' },
  { host: 'website-secondary.synotech.dev', port: 8105, serves: 'PayloadCMS website + media (nginx)' },
  { host: 'agent.synotech.dev', port: 9120, serves: 'Hermes dashboard (this page lives at /operations)' },
  { host: 'agent.synotech.dev/v1/*', port: 8642, serves: 'Hermes OpenAI API (bearer)' },
  { host: 'rag.synotech.dev', port: 0, serves: 'synoptic-rag MCP (dedicated tunnel)' },
  { host: 'code.synotech.dev', port: 13377, serves: 'syCode commercial backend' },
  { host: 'metrics.synotech.dev', port: 19999, serves: 'netdata + container board (Access-gated)' },
];

export const BOTS: Bot[] = [
  { slug: 'ventry-business', title: 'Ventry Business', section: 'Business Development', color: 'hsl(115 68% 58%)' },
  { slug: 'kruger-gold-finance', title: 'Kruger Gold Finance', section: 'Business Development', color: 'hsl(115 68% 58%)' },
  { slug: 'vya-finance', title: 'Vya Finance', section: 'Business Development', color: 'hsl(115 68% 58%)' },
  { slug: 'erp-leads-africa', title: 'ERP Leads ~ Africa', section: 'ERP ~ Marketing', color: 'hsl(14 68% 58%)' },
  { slug: 'erp-leads-za', title: 'ERP Leads ~ South Africa', section: 'ERP ~ Marketing', color: 'hsl(201 68% 58%)' },
  { slug: 'erp-leads-zw', title: 'ERP Leads ~ Zimbabwe', section: 'ERP ~ Marketing', color: 'hsl(201 68% 58%)' },
  { slug: 'erp-leads-bw', title: 'ERP Leads ~ Botswana', section: 'ERP ~ Marketing', color: 'hsl(201 68% 58%)' },
  { slug: 'erp-leads-zm', title: 'ERP Leads ~ Zambia', section: 'ERP ~ Marketing', color: 'hsl(201 68% 58%)' },
  { slug: 'erp-leads-nm', title: 'ERP Leads ~ Namibia', section: 'ERP ~ Marketing', color: 'hsl(201 68% 58%)' },
  { slug: 'fullstack-engineer', title: 'Full Stack Engineer', section: 'Engineering', color: 'hsl(217 68% 58%)' },
  { slug: 'devops-engineer', title: 'DevOps Engineer', section: 'Engineering', color: 'hsl(217 68% 58%)' },
  { slug: 'tech-lead', title: 'Tech Lead', section: 'Engineering', color: 'hsl(217 68% 58%)' },
  { slug: 'chief-executive', title: 'Chief Executive', section: 'Executive', color: 'hsl(45 85% 55%)' },
  { slug: 'chief-finance', title: 'Chief Finance', section: 'Executive', color: 'hsl(45 85% 55%)' },
  { slug: 'chief-operations', title: 'Chief Operations', section: 'Executive', color: 'hsl(45 85% 55%)' },
];

export const SECTIONS = ['Business Development', 'ERP ~ Marketing', 'Engineering', 'Executive'];

export const ORGS = [
  { org: 'synoptic-agents', repos: 'synoptic (CLI+daemon, browser, be), operations (this app), hermes bots' },
  { org: 'synoptic-core', repos: 'wallet program: auth, kyc, workers, provider, translations, skills' },
  { org: 'synoptic-ventry / -vya / -krugergold', repos: 'one workspace each: base runner + be, mobile, provider, ui' },
  { org: 'synoptic-packages', repos: 'components, components-native, icons, flags, qrcode, os-print' },
  { org: 'synoptic-technologies', repos: 'website (PayloadCMS), typora, synotech_theme' },
  { org: 'synoptic-erp', repos: 'frappe — ERPNext v16 multisite fleet' },
  { org: 'synoptic-infrastructure', repos: 'infra — all Terraform IaC, registry, runbooks' },
  { org: 'synoptic-rag', repos: 'rag — segmented RAG + MCP server' },
];
