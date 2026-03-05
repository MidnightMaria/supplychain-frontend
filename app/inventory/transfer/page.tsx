"use client";

import { useEffect, useState } from "react";
import {
  transferStock,
  getWarehouses,
  getProducts,
} from "@/lib/inventoryApi";

export default function TransferPage() {
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const [form, setForm] = useState({
    fromWarehouseId: "",
    toWarehouseId: "",
    productSku: "",
    quantity: "",
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
      await transferStock({
        fromWarehouseId: Number(form.fromWarehouseId),
        toWarehouseId: Number(form.toWarehouseId),
        productSku: form.productSku,
        quantity: Number(form.quantity),
      });

      setMessage("✅ Stock transferred successfully");

      setForm({
        fromWarehouseId: "",
        toWarehouseId: "",
        productSku: "",
        quantity: "",
      });
    } catch (err: any) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">
        Transfer Stock
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow"
      >
        {/* FROM WAREHOUSE */}
        <div>
          <label className="block text-sm mb-1">
            From Warehouse
          </label>
          <select
            name="fromWarehouseId"
            value={form.fromWarehouseId}
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

        {/* TO WAREHOUSE */}
        <div>
          <label className="block text-sm mb-1">
            To Warehouse
          </label>
          <select
            name="toWarehouseId"
            value={form.toWarehouseId}
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

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Processing..." : "Transfer Stock"}
        </button>

        {message && (
          <p className="text-sm text-center">{message}</p>
        )}
      </form>
    </div>
  );
}