
import request from 'superagent'

const rootUrl = '/api/v1'

// --- Greeting ---
export async function getGreeting(): Promise<string> {
  const res = await request.get(`${rootUrl}/greeting`)
  return res.body.greeting
}

// --- Donuts ---
export async function getDonuts(): Promise<any[]> {
  const res = await request.get(`${rootUrl}/donuts`)
  return res.body
}

// --- Frostings (placeholder if you add endpoint later) ---
export async function getFrostings(): Promise<any[]> {
  const res = await request.get(`${rootUrl}/donuts/frostings`)
  return res.body
}

// --- Toppings (placeholder if you add endpoint later) ---
export async function getToppings(): Promise<any[]> {
  const res = await request.get(`${rootUrl}/donuts/toppings`)
  return res.body
}

/**
 
 * - For images, don’t fetch via API. Just use the static route we added in server.ts:
 *   Example: <img src="/storage/lard-lad-store.jpg" alt="Store" />
 * - That way, Express will serve files directly from `storage/`.
 */
