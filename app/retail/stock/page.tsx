"use client";

import { useEffect, useState } from "react";
import {
  getProducts,
  getRetailWarehouses,
  getWarehouseStock,
  requestRestock,
} from "@/lib/retailApi";

export default function StockPage() {
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] =
    useState<number | null>(null);

  const [stockMap, setStockMap] = useState<Record<number, number>>(
    {}
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<any>(null);
  const [restockQty, setRestockQty] = useState(10);
  const [loading, setLoading] = useState(false);

  // ==============================
  // Load initial data
  // ==============================
  async function loadInitial() {
    const [w, p] = await Promise.all([
      getRetailWarehouses(),
      getProducts(),
    ]);

    setWarehouses(w);
    setProducts(p);

    if (w.length > 0) {
      setSelectedWarehouse(w[0].id);
    }
  }

  // ==============================
  // Load stock per product
  // ==============================
  async function loadStock(warehouseId: number) {
    const map: Record<number, number> = {};

    for (const product of products) {
      const stock = await getWarehouseStock(
        warehouseId,
        product.id
      );

      map[product.id] = stock?.quantity || 0;
    }

    setStockMap(map);
  }

  useEffect(() => {
    loadInitial();
  }, []);

  useEffect(() => {
    if (selectedWarehouse && products.length > 0) {
      loadStock(selectedWarehouse);
    }
  }, [selectedWarehouse, products]);

  // ==============================
  // Restock logic
  // ==============================
  function openRestock(product: any) {
    setSelectedProduct(product);
    setRestockQty(10);
    setShowModal(true);
  }

  async function confirmRestock() {
    if (!selectedWarehouse || !selectedProduct) return;

    try {
      setLoading(true);

      await requestRestock(selectedWarehouse, {
        fromWarehouseId: 1, // central warehouse
        productSku: selectedProduct.sku,
        quantity: restockQty,
      });

      setShowModal(false);
      await loadStock(selectedWarehouse);
    } catch (err) {
      alert("Restock failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold text-orange-600">
        Stock Management
      </h1>

      {/* Select Warehouse */}
      <select
        className="border rounded-lg px-3 py-2"
        value={selectedWarehouse ?? ""}
        onChange={(e) =>
          setSelectedWarehouse(Number(e.target.value))
        }
      >
        {warehouses.map((w) => (
          <option key={w.id} value={w.id}>
            {w.name}
          </option>
        ))}
      </select>

      {/* Stock Table */}
      <div className="bg-white rounded-xl border border-orange-100 shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-orange-50 border-b">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">SKU</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {products.map((product) => {
              const qty = stockMap[product.id] || 0;
              const low = qty < 5;

              return (
                <tr key={product.id} className="border-b">
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.sku}</td>
                  <td className="p-3 font-medium">
                    {qty}
                  </td>
                  <td className="p-3">
                    {low ? (
                      <span className="text-red-500 font-medium">
                        Low Stock
                      </span>
                    ) : (
                      <span className="text-green-600">
                        OK
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <button
                        onClick={() => openRestock(product)}
                        className={`px-3 py-1 rounded-lg text-white ${
                        low
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-orange-600 hover:bg-orange-700"
                        }`}
                    >
                        Restock
                    </button>
                    </td>
                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      {/* ==============================
          RESTOCK MODAL
      ============================== */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

          <div className="bg-white rounded-xl p-6 w-[400px] space-y-4">

            <h2 className="text-lg font-semibold">
              Restock {selectedProduct.name}
            </h2>

            <div>
              <label className="text-sm text-gray-600">
                Quantity
              </label>

              <input
                type="number"
                value={restockQty}
                min={1}
                onChange={(e) =>
                  setRestockQty(Number(e.target.value))
                }
                className="border rounded-lg px-3 py-2 w-full mt-1"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">

              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={confirmRestock}
                disabled={loading}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg"
              >
                {loading ? "Processing..." : "Confirm"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}