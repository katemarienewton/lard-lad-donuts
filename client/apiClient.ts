import router from "./router";
// const API_URL = "http://localhost:5000/api/v1";

export async function getGreeting(): Promise<string> {
  const res = await fetch(`${router}/greeting`);
  if (!res.ok) throw new Error("Failed to fetch greeting");
  const data = await res.json();
  return data.greeting; // 👈 matches server response { greeting: "..." }
}

export async function getFrostings() {
  const res = await fetch(`${router}/donuts`);
  if (!res.ok) throw new Error("Failed to fetch Frosting");
  return res.json();
}

export async function getToppings() {
  const res = await fetch(`${router}/donuts`);
  if (!res.ok) throw new Error("Failed to fetch Toppings");
  return res.json();
}