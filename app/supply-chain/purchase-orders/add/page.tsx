"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Supplier {
  id: number;
  name: string;
}

interface PurchaseOrderItem {
  productSku: string;
  quantity: number;
  unitPrice: number;
}

export default function AddPurchaseOrderPage() {

  const router = useRouter();

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const [order, setOrder] = useState({
    orderNumber: "",
    supplierId: "",
    orderDate: "",
    expectedDeliveryDate: "",
    status: "PENDING"
  });

  const [items, setItems] = useState<PurchaseOrderItem[]>([
    { productSku: "", quantity: 0, unitPrice: 0 }
  ]);

  useEffect(() => {
    fetch("http://localhost:8083/api/suppliers")
      .then(res => res.json())
      .then(data => setSuppliers(data));
  }, []);

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value
    });
  };

  const handleItemChange = (index: number, field: string, value: any) => {

    const updatedItems = [...items];

    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };

    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { productSku: "", quantity: 0, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      orderNumber: order.orderNumber,
      supplier: { id: order.supplierId },
      orderDate: order.orderDate,
      expectedDeliveryDate: order.expectedDeliveryDate,
      status: order.status,
      items: items
    };

    await fetch("http://localhost:8083/api/purchase-orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    router.push("/supply-chain/purchase-orders");
  };

  return (
    <div className="max-w-3xl">

      <h1 className="text-2xl font-bold mb-6">
        Create Purchase Order
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">

        <div className="grid grid-cols-2 gap-4">

          <input
            name="orderNumber"
            placeholder="Order Number"
            value={order.orderNumber}
            onChange={handleOrderChange}
            className="border p-2 rounded"
            required
          />

          <select
            name="supplierId"
            value={order.supplierId}
            onChange={handleOrderChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Supplier</option>

            {suppliers.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}

          </select>

          <input
            type="date"
            name="orderDate"
            value={order.orderDate}
            onChange={handleOrderChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="date"
            name="expectedDeliveryDate"
            value={order.expectedDeliveryDate}
            onChange={handleOrderChange}
            className="border p-2 rounded"
            required
          />

        </div>

        <div>

          <h2 className="text-lg font-semibold mb-4">
            Order Items
          </h2>

          <div className="space-y-3">

            {items.map((item, index) => (

              <div key={index} className="grid grid-cols-4 gap-3">

                <input
                  placeholder="Product SKU"
                  value={item.productSku}
                  onChange={(e) =>
                    handleItemChange(index, "productSku", e.target.value)
                  }
                  className="border p-2 rounded"
                />

                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", Number(e.target.value))
                  }
                  className="border p-2 rounded"
                />

                <input
                  type="number"
                  placeholder="Unit Price"
                  value={item.unitPrice}
                  onChange={(e) =>
                    handleItemChange(index, "unitPrice", Number(e.target.value))
                  }
                  className="border p-2 rounded"
                />

                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="bg-red-500 text-white rounded"
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

          <button
            type="button"
            onClick={addItem}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Item
          </button>

        </div>

        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
        >
          Create Purchase Order
        </button>

      </form>

    </div>
  );
}