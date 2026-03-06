const BASE_URL = process.env.NEXT_PUBLIC_RETAIL_API_URL!;

export async function getRetailWarehouses() {
  const res = await fetch(`${BASE_URL}/retail/warehouses`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("API ERROR:", text);
    throw new Error("Failed to fetch warehouses");
  }

  return res.json();
}

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

export async function createRetailWarehouse(data: any) {
  const res = await fetch(`${BASE_URL}/retail/warehouses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create retail warehouse");
  }

  return res.json();
}

export async function deleteRetailWarehouse(id: number) {
  const res = await fetch(`${BASE_URL}/retail/warehouses/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete warehouse");
  }
}

export async function updateRetailWarehouse(id: number, data: any) {
  const res = await fetch(`${BASE_URL}/retail/warehouses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update warehouse");
  }

  return res.json();
}

export async function getWarehouseStock(
  warehouseId: number,
  productId: number
) {
  try {
    const res = await fetch(
      `${BASE_URL}/retail/warehouses/${warehouseId}/stock/${productId}`,
      { cache: "no-store" }
    );

    if (res.status === 404) {
      return null; // belum ada stock → anggap 0
    }

    if (!res.ok) {
      const text = await res.text();
      console.error("Stock API error:", text);
      throw new Error("Failed to fetch stock");
    }

    return res.json();
  } catch (err) {
    console.error("Fetch stock error:", err);
    return null;
  }
}

export async function setWarehouseStock(
  warehouseId: number,
  data: any
) {
  const res = await fetch(
    `${BASE_URL}/retail/warehouses/${warehouseId}/stock`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("Failed to set stock");

  return res.json();
}

export async function getCustomers() {
  const res = await fetch(`${BASE_URL}/customers`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch customers");

  return res.json();
}

export async function createCustomer(data: any) {
  const res = await fetch(`${BASE_URL}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create customer");
  return res.json();
}

export async function updateCustomer(id: number, data: any) {
  const res = await fetch(`${BASE_URL}/customers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update customer");
  return res.json();
}

export async function deleteCustomer(id: number) {
  const res = await fetch(`${BASE_URL}/customers/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete customer");
}

export async function getOrders() {
  const res = await fetch(`${BASE_URL}/orders`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch orders");

  return res.json();
}

export async function createOrder(data: any, warehouseId: number) {
  const res = await fetch(
    `${BASE_URL}/orders?warehouseId=${warehouseId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("Failed to create order");

  return res.json();
}

export async function requestRestock(
  warehouseId: number,
  data: any
) {
  const res = await fetch(
    `${BASE_URL}/retail/warehouses/${warehouseId}/stock/restock`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("Failed to request restock");

  return res.json();
}
