"use client";

import { useEffect, useState } from "react";
import {
  adjustStock,
  getWarehouses,
  getProducts,
} from "@/lib/inventoryApi";

export default function AdjustPage() {
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const [form, setForm] = useState({
    warehouseId: "",
    productSku: "",
    quantity: "",
    movementType: "IN",
    adjustmentReason: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [wh, prod] = await Promise.all([
          getWarehouses(),
          getProducts(),
        ]);
        setWarehouses(wh);
        setProducts(prod);
      } catch (err) {
        console.error(err);
      }
    }

    loadData();
  }, []);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await adjustStock({
        warehouseId: Number(form.warehouseId),
        productSku: form.productSku,
        quantity: Number(form.quantity),
        movementType: form.movementType,
        adjustmentReason: form.adjustmentReason,
      });

      setMessage("Stock updated successfully");

      setForm({
        warehouseId: "",
        productSku: "",
        quantity: "",
        movementType: "IN",
        adjustmentReason: "",
      });
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">
        Adjust Stock
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow"
      >
        {/* WAREHOUSE */}
        <div>
          <label className="block text-sm mb-1">
            Warehouse
          </label>
          <select
            name="warehouseId"
            value={form.warehouseId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select warehouse</option>
            {warehouses.map((w) => (
              <option key={w.id} value={w.id}>
                {w.code} — {w.name}
              </option>
            ))}
          </select>
        </div>

        {/* PRODUCT */}
        <div>
          <label className="block text-sm mb-1">
            Product
          </label>
          <select
            name="productSku"
            value={form.productSku}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select product</option>
            {products.map((p) => (
              <option key={p.sku} value={p.sku}>
                {p.sku} — {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* MOVEMENT TYPE */}
        <div>
          <label className="block text-sm mb-1">
            Movement Type
          </label>
          <select
            name="movementType"
            value={form.movementType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="IN">IN</option>
            <option value="OUT">OUT</option>
            <option value="ADJUST">ADJUST</option>
          </select>
        </div>

        {/* QUANTITY */}
        <div>
          <label className="block text-sm mb-1">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* REASON */}
        <div>
          <label className="block text-sm mb-1">
            Reason
          </label>
          <input
            type="text"
            name="adjustmentReason"
            value={form.adjustmentReason}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Processing..." : "Update Stock"}
        </button>

        {message && (
          <p className="text-sm text-center">{message}</p>
        )}
      </form>
    </div>
  );
}