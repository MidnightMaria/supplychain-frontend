const BASE_URL =
  process.env.NEXT_PUBLIC_INVENTORY_API || "http://inventory-service:8080";

export async function getCentralInventory() {
  const res = await fetch(`${BASE_URL}/api/inventory/export`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch inventory");
  }

  return res.json();
}

export async function getInventoryMovements() {
  const res = await fetch(`${BASE_URL}/api/inventory/movements`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch movements");
  }

  return res.json();
}

export async function transferStock(data: {
  fromWarehouseId: number;
  toWarehouseId: number;
  productSku: string;
  quantity: number;
  reference?: string;
}) {
  const res = await fetch(`${BASE_URL}/api/inventory/transfer-stock`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to transfer stock");
  }

  return res.json();
}

export async function getWarehouses() {
  const res = await fetch(`${BASE_URL}/api/warehouses`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch warehouses");
  }

  return res.json();
}

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function adjustStock(data: {
  productSku: string;
  warehouseId: number;
  quantity: number;
  adjustmentReason: string;
  movementType: string;
  referenceNumber?: string;
}) {
  const res = await fetch(`${BASE_URL}/api/inventory/adjust-stock`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Adjust failed");
  }

  return res.json();
}