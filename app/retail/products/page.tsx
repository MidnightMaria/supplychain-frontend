"use client";

import { useEffect, useState } from "react";
import {
  getProducts,
} from "@/lib/retailApi";
import { formatCurrency } from "@/lib/utils/formatCurrency";

const BASE_URL =
  process.env.NEXT_PUBLIC_RETAIL_API_URL ||
  "http://localhost:8081/api";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    sku: "",
    name: "",
    description: "",
    price: "",
    stock: "0",
    active: true,
  });

  // =========================
  // LOAD PRODUCTS
  // =========================
  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  // =========================
  // OPEN MODAL
  // =========================
  function openAdd() {
    setEditing(null);
    setForm({
      sku: "",
      name: "",
      description: "",
      price: "",
      stock: "0",
      active: true,
    });
    setShowModal(true);
  }

  function openEdit(product: any) {
    setEditing(product);
    setForm({
      sku: product.sku,
      name: product.name,
      description: product.description || "",
      price: product.price,
      stock: product.stock || 0,
      active: product.active,
    });
    setShowModal(true);
  }

  // =========================
  // SAVE PRODUCT
  // =========================
  async function handleSave() {
    try {
      setLoading(true);

      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      if (editing) {
        await fetch(`${BASE_URL}/products/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${BASE_URL}/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setShowModal(false);
      await loadProducts();
    } catch (err) {
      alert("Failed to save product");
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // DELETE
  // =========================
  async function handleDelete(id: number) {
    if (!confirm("Delete this product?")) return;

    await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
    });

    loadProducts();
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-600">
          Products
        </h1>

        <button
          onClick={openAdd}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl border border-orange-100 shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-orange-50 border-b">
            <tr>
              <th className="p-3 text-left">SKU</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Active</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-3">{product.sku}</td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">
                  {formatCurrency(Number(product.price))}
                </td>
                <td className="p-3">
                  {product.active ? (
                    <span className="text-green-600">
                      Active
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="p-3 space-x-3">
                  <button
                    onClick={() => openEdit(product)}
                    className="text-orange-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ========================= MODAL ========================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[500px] space-y-4">

            <h2 className="text-lg font-semibold">
              {editing ? "Edit Product" : "Add Product"}
            </h2>

            <input
              placeholder="SKU"
              value={form.sku}
              onChange={(e) =>
                setForm({ ...form, sku: e.target.value })
              }
              className="border rounded-lg px-3 py-2 w-full"
            />

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="border rounded-lg px-3 py-2 w-full"
            />

            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border rounded-lg px-3 py-2 w-full"
            />

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              className="border rounded-lg px-3 py-2 w-full"
            />

            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: e.target.value })
              }
              className="border rounded-lg px-3 py-2 w-full"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) =>
                  setForm({ ...form, active: e.target.checked })
                }
              />
              Active
            </label>

            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}