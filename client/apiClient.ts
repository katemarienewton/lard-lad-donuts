import request from 'superagent'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getGreeting() {
  const res = await request.get(`${rootURL}/greeting`)
  return res.body.greeting as string
}

export async function getFrostings() {
  const res = await request.get(`${rootURL}/donuts`)
  return res.body.frostings as Array<string>
}

export async function getToppings() {
  const res = await request.get(`${rootURL}/donuts`)
  return res.body.toppings as Array<string>
}