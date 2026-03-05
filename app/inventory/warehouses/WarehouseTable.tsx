"use client";

import Link from "next/link";
import { Warehouse } from "@/types/warehouse";
import DeleteWarehouseButton from "./DeleteWarehouseButton";

export default function WarehouseTable({
  warehouses,
}: {
  warehouses: Warehouse[];
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
          <tr>
            <th className="px-6 py-3">Code</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Address</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {warehouses.map((w) => (
            <tr key={w.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">{w.code}</td>
              <td className="px-6 py-4">{w.name}</td>
              <td className="px-6 py-4">{w.address}</td>

              <td className="px-6 py-4">
                <StatusBadge active={w.isActive} />
              </td>

              <td className="px-6 py-4 space-x-3">
                <Link
                  href={`/inventory/warehouses/${w.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>

                <Link
                  href={`/inventory/warehouses/${w.id}/edit`}
                  className="text-yellow-600 hover:underline"
                >
                  Edit
                </Link>

                <DeleteWarehouseButton id={w.id} variant="link" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        active
          ? "bg-green-100 text-green-700"
          : "bg-gray-200 text-gray-600"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}