import { fetcher } from "./api";
import { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  return fetcher("/api/products");
}

export async function createProduct(product: Product) {
  return fetcher("/api/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export async function updateProduct(sku: string, product: Product) {
  return fetcher(`/api/products/${sku}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
}

export async function deleteProduct(sku: string) {
  return fetcher(`/api/products/${sku}`, {
    method: "DELETE",
  });
}

export async function getProduct(sku: string) {
  return fetcher(`/api/products/${sku}`);
}