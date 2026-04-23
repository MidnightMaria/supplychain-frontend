"use client";

import { useEffect, useMemo, useState } from "react";
import { dataScienceFetcher } from "@/lib/dataScienceFetcher";

export default function InventoryOptimizationPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    dataScienceFetcher("/api/data-science/inventory-optimization")
      .then(setData)
      .catch(console.error);
  }, []);

  const normalized = useMemo(() => {
    return data.map((row) => ({
      ...row,
      currentStock: row.current_stock_proxy ?? row.current_stock ?? 0,
      status: row.inventory_status ?? row.status ?? "SAFE",
    }));
  }, [data]);

  const reorderCount = normalized.filter((r) => r.status === "REORDER").length;
  const safeCount = normalized.filter((r) => r.status === "SAFE").length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Inventory Optimization</h1>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <p>Reorder</p>
          <p className="text-2xl text-red-500">{reorderCount}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p>Safe</p>
          <p className="text-2xl text-green-500">{safeCount}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Store</th>
              <th className="p-3">Item</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Safety</th>
              <th className="p-3">ROP</th>
              <th className="p-3">EOQ</th>
              <th className="p-3">Order</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {normalized.map((row, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{row.store}</td>
                <td className="p-3">{row.item}</td>
                <td className="p-3">{row.currentStock}</td>
                <td className="p-3">{row.safety_stock}</td>
                <td className="p-3">{row.reorder_point}</td>
                <td className="p-3">{row.eoq}</td>
                <td className="p-3">{row.recommended_order_qty}</td>

                <td className="p-3">
                  {row.status === "REORDER" ? (
                    <span className="text-red-600">REORDER</span>
                  ) : (
                    <span className="text-green-600">SAFE</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}