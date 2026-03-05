const API_URL = process.env.NEXT_PUBLIC_INVENTORY_API;

export async function fetcher(url: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("API ERROR:", text);
    throw new Error(`API Error ${res.status}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}