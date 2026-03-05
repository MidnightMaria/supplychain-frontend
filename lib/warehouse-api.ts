import { fetcher } from "./api";

const BASE = "/api/warehouses";

/* =========================
   Types
========================= */

export interface Warehouse {
  id?: number;
  code: string;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  isActive?: boolean;
}

/* =========================
   API Calls
========================= */

// Get all
export async function getWarehouses(): Promise<Warehouse[]> {
  return fetcher(BASE);
}

// Get by ID
export async function getWarehouse(id: number): Promise<Warehouse> {
  return fetcher(`${BASE}/${id}`);
}

// Create
export async function createWarehouse(data: Warehouse) {
  return fetcher(BASE, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Update
export async function updateWarehouse(id: number, data: Warehouse) {
  return fetcher(`${BASE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// Delete (kalau ada endpoint delete)
export async function deleteWarehouse(id: number) {
  return fetcher(`${BASE}/${id}`, {
    method: "DELETE",
  });
}

// Toggle active status
export async function toggleWarehouseStatus(id: number) {
  return fetcher(`${BASE}/${id}/status`, {
    method: "PATCH",
  });
}