const DEFAULT_API =
  process.env.NEXT_PUBLIC_INVENTORY_API || "http://inventory-service:8080";

export async function fetcher(url: string, options?: RequestInit) {

  // if URL already absolute, use it directly
  const fullUrl = url.startsWith("http") ? url : `${DEFAULT_API}${url}`;

  const res = await fetch(fullUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("API ERROR:", text);
    throw new Error(`API Error ${res.status}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}