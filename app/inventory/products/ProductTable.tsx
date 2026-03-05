"use client";

import Link from "next/link";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils/formatCurrency";

export default function ProductTable({
  products,
  onDelete,
}: {
  products: Product[];
  onDelete: (sku: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-100 text-left text-sm text-gray-600">
          <tr>
            <th className="px-6 py-3">SKU</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {products.map((p) => (
            <tr key={p.sku} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">{p.sku}</td>
              <td className="px-6 py-4">{p.name}</td>
              <td>{formatCurrency(Number(p.price))}</td>
              <td className="px-6 py-4">{p.quantity}</td>

              <td className="px-6 py-4 space-x-3">
                <Link
                  href={`/inventory/products/${p.sku}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>

                <Link
                  href={`/inventory/products/${p.sku}/edit`}
                  className="text-yellow-600 hover:underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => onDelete(p.sku)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}