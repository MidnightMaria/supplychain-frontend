"use client";

import { useEffect, useState } from "react";
import {
  getOrders,
  getCustomers,
  getProducts,
  getRetailWarehouses,
  createOrder,
} from "@/lib/retailApi";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);

  const [showModal, setShowModal] = useState(false);

  const [warehouseId, setWarehouseId] = useState<number | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);

  const [items, setItems] = useState<any[]>([]);

  async function loadData() {
    const [o, c, p, w] = await Promise.all([
      getOrders(),
      getCustomers(),
      getProducts(),
      getRetailWarehouses(),
    ]);

    setOrders(o);
    setCustomers(c);
    setProducts(p);
    setWarehouses(w);
  }

  useEffect(() => {
    loadData();
  }, []);

  function addItem() {
    setItems([...items, { productId: "", quantity: 1 }]);
  }

  function removeItem(index: number) {
    const copy = [...items];
    copy.splice(index, 1);
    setItems(copy);
  }

  function updateItem(index: number, field: string, value: any) {
    const copy = [...items];
    copy[index][field] = value;
    setItems(copy);
  }

  function getProduct(productId: number) {
    return products.find((p) => p.id === productId);
  }

  function calculateTotal() {
    let total = 0;

    for (const item of items) {
      const product = getProduct(item.productId);
      if (product) {
        total += product.price * item.quantity;
      }
    }

    return total;
  }

  async function handleCreate() {
    if (!warehouseId || !customerId || items.length === 0) {
      alert("Please complete order data");
      return;
    }

    await createOrder(
      {
        customerId,
        items,
      },
      warehouseId
    );

    setShowModal(false);
    setItems([]);
    loadData();
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-orange-600">
          Orders
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg"
        >
          + New Order
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-orange-100 shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-orange-50 border-b">
            <tr>
              <th className="p-3 text-left">Order #</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>

            {orders.map((o) => (
              <tr key={o.id} className="border-b">
                <td className="p-3">{o.orderNumber}</td>
                <td className="p-3">{o.customerName}</td>
                <td className="p-3 font-medium">
                  Rp {o.totalAmount}
                </td>
                <td className="p-3">
                  {new Date(o.orderDate).toLocaleString()}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-[700px] space-y-4">

            <h2 className="text-lg font-semibold">
              Create Order
            </h2>

            {/* Warehouse */}
            <select
              className="border rounded-lg px-3 py-2 w-full"
              onChange={(e) =>
                setWarehouseId(Number(e.target.value))
              }
            >
              <option>Select Warehouse</option>
              {warehouses.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>

            {/* Customer */}
            <select
              className="border rounded-lg px-3 py-2 w-full"
              onChange={(e) =>
                setCustomerId(Number(e.target.value))
              }
            >
              <option>Select Customer</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* ITEMS */}
            <div className="space-y-3">

              {items.map((item, i) => {
                const product = getProduct(item.productId);

                const subtotal = product
                  ? product.price * item.quantity
                  : 0;

                return (
                  <div key={i} className="flex gap-2 items-center">

                    <select
                      className="border rounded-lg px-3 py-2 flex-1"
                      onChange={(e) =>
                        updateItem(
                          i,
                          "productId",
                          Number(e.target.value)
                        )
                      }
                    >
                      <option>Select Product</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      className="border rounded-lg px-3 py-2 w-24"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(
                          i,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                    />

                    <div className="w-32 text-right text-sm">
                      {product && (
                        <div>
                          Rp {subtotal}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeItem(i)}
                      className="text-red-500"
                    >
                      Remove
                    </button>

                  </div>
                );
              })}

            </div>

            <button
              onClick={addItem}
              className="text-orange-600"
            >
              + Add Item
            </button>

            {/* TOTAL */}
            <div className="flex justify-end pt-4 border-t">

              <div className="text-right">

                <div className="text-sm text-gray-500">
                  Total
                </div>

                <div className="text-xl font-bold text-orange-600">
                  Rp {calculateTotal()}
                </div>

              </div>

            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-2">

              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleCreate}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg"
              >
                Create Order
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}