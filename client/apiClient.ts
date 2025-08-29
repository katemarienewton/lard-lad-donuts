export async function getGreeting() {
  const res = await fetch("/api/v1/greeting");
  if (!res.ok) throw new Error("Failed to fetch greeting");
  return res.json();
}

export async function getFrostings() {
  const res = await fetch("/api/v1/frostings");
  if (!res.ok) throw new Error("Failed to fetch frostings");
  return res.json();
}

export async function getToppings() {
  const res = await fetch("/api/v1/toppings");
  if (!res.ok) throw new Error("Failed to fetch toppings");
  return res.json();
}

export async function getDonuts() {
  const res = await fetch("/api/v1/donuts");
  if (!res.ok) throw new Error("Failed to fetch donuts");
  return res.json();
}
