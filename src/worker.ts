export interface Env {}

// Static docs worker: assets do all the work. /__health is the deploy canary.
export default {
  async fetch(request: Request, _env: Env): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname === '/operations/__health' || url.pathname === '/operations/__health/') {
      return Response.json({ ok: true, app: 'synoptic-operations', version: '0.1.0' })
    }
    return new Response('not found', { status: 404 })
  },
}
