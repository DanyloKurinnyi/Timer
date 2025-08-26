const API_BASE_URL = "http://localhost:4000";

export async function startTest() {
  const res = await fetch(`${API_BASE_URL}/start`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error("Failed to start test");
  return res.json();
}
export async function getServerTime() {
  const res = await fetch(`${API_BASE_URL}/time`);
  if (!res.ok) throw new Error("Failed to fetch time");
  return res.json();
}
