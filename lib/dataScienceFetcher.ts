const BASE_URL =
  process.env.NEXT_PUBLIC_DATA_SCIENCE_API || "http://localhost:8084";

export async function dataScienceFetcher(url: string, options?: RequestInit) {
  const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

  const res = await fetch(fullUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("DATA SCIENCE API ERROR:", text);
    throw new Error(`API Error ${res.status}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}