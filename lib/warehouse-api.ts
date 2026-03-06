import { fetcher } from "./api";
import { Warehouse } from "@/types/warehouse";

const BASE = "/api/warehouses";

export async function getWarehouses(): Promise<Warehouse[]> {
  return fetcher(BASE);
}

export async function getWarehouse(id: number): Promise<Warehouse> {
  return fetcher(`${BASE}/${id}`);
}

export async function createWarehouse(data: Warehouse) {
  return fetcher(BASE, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateWarehouse(id: number, data: Warehouse) {
  return fetcher(`${BASE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteWarehouse(id: number) {
  return fetcher(`${BASE}/${id}`, {
    method: "DELETE",
  });
}

export async function toggleWarehouseStatus(id: number) {
  return fetcher(`${BASE}/${id}/status`, {
    method: "PATCH",
  });
}