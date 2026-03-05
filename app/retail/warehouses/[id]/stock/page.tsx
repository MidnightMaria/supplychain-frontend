"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getProducts,
  getWarehouseStock,
  setWarehouseStock,
} from "@/lib/retailApi";

export default function WarehouseStockPage() {
  const params = useParams();
  const warehouseId = Number(params.id);

  const [products, setProducts] = useState<any[]>([]);
  const [stock, setStock] = useState<Record<number, number>>({});

  async function loadData() {
    const productList = await getProducts();
    setProducts(productList);

    const stockMap: any = {};

    for (const p of productList) {
      try {
        const s = await getWarehouseStock(warehouseId, p.id);
        stockMap[p.id] = s.quantity;
      } catch {
        stockMap[p.id] = 0;
      }
    }

    setStock(stockMap);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSave(productId: number) {
    await setWarehouseStock(warehouseId, {
      productId,
      quantity: stock[productId] || 0,
    });

    alert("Stock updated");
  }

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold text-orange-600">
        Warehouse Stock
      </h1>

      <div className="bg-white rounded-xl border border-orange-100 shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-orange-50 border-b">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">SKU</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3"></th>
            </tr>
          </thead>

          <tbody>

            {products.map((p) => (
              <tr key={p.id} className="border-b">

                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3 text-gray-500">{p.sku}</td>

                <td className="p-3 w-40">

                  <input
                    type="number"
                    className="border rounded-lg px-3 py-2 w-full"
                    value={stock[p.id] ?? 0}
                    onChange={(e) =>
                      setStock({
                        ...stock,
                        [p.id]: Number(e.target.value),
                      })
                    }
                  />

                </td>

                <td className="p-3">

                  <button
                    onClick={() => handleSave(p.id)}
                    className="bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600"
                  >
                    Save
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}