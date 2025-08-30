
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

// --- Frostings (placeholder at this stage) ---
export async function getFrostings(): Promise<any[]> {
  const res = await request.get(`${rootUrl}/donuts/frostings`)
  return res.body
}

// --- Toppings (placeholder at this stage) ---
export async function getToppings(): Promise<any[]> {
  const res = await request.get(`${rootUrl}/donuts/toppings`)
  return res.body
}

/**
 
 * - Added static images (not API) that are added in server.ts: Express will serve files directly from `storage/`
 *   e.g .. <img src="/storage/lard-lad-store.jpg" alt="Store" />
 * - something to consider, we don't have backend and frontend servers at the moment. 
 */
