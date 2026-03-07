import { fetcher } from "./api";
import { Product } from "@/types/product";

const BASE = "/api/products";

export async function getProducts(): Promise<Product[]> {
  return fetcher(BASE);
}

export async function getProduct(sku: string) {
  return fetcher(`${BASE}/${sku}`);
}

export async function createProduct(product: Product) {
  return fetcher(BASE, {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export async function updateProduct(sku: string, product: Product) {
  return fetcher(`${BASE}/${sku}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
}

export async function deleteProduct(sku: string) {
  return fetcher(`${BASE}/${sku}`, {
    method: "DELETE",
  });
}