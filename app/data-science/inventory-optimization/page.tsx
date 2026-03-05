"use client";

import { useEffect, useState } from "react";

export default function InventoryOptimizationPage() {

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {

    fetch("http://localhost:8084/api/data-science/inventory-optimization")
      .then(res => res.json())
      .then(result => {
        console.log("DATA FROM API:", result);
        setData(result);
      });

  }, []);

  return (

    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Inventory Optimization
      </h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3 text-left">Store</th>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Safety Stock</th>
              <th className="p-3 text-left">ROP</th>
              <th className="p-3 text-left">EOQ</th>
              <th className="p-3 text-left">Order Qty</th>
              <th className="p-3 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {data.map((row, i) => (

              <tr key={i} className="border-t">

                <td className="p-3">{row.store}</td>
                <td className="p-3">{row.item}</td>
                <td className="p-3">{row.current_stock}</td>
                <td className="p-3">{row.safety_stock}</td>
                <td className="p-3">{row.reorder_point}</td>
                <td className="p-3">{row.eoq}</td>
                <td className="p-3">{row.recommended_order_qty}</td>

                <td className="p-3">

                  {row.status === "ORDER NOW" && (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
                      ORDER NOW
                    </span>
                  )}

                  {row.status === "SAFE" && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                      SAFE
                    </span>
                  )}

                  {row.status === "OVERSTOCK" && (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      OVERSTOCK
                    </span>
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