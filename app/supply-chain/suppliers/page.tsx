"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Supplier {
  id: number;
  code: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  active: boolean;
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    fetch("http://localhost:8083/api/suppliers")
      .then((res) => res.json())
      .then((data) => setSuppliers(data));
  }, []);

  return (
    <div className="space-y-6">

      {/* Page Title */}
      <h1 className="text-2xl font-bold">
        Suppliers
      </h1>

      {/* Card Container */}
      <div className="bg-white rounded-lg shadow">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">

          <h2 className="font-semibold text-lg">
            Supplier List
          </h2>

          <Link
            href="/supply-chain/suppliers/add"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add Supplier
          </Link>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100 text-gray-600 text-sm">

              <tr>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Contact</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>

            </thead>

            <tbody>

              {suppliers.map((s) => (

                <tr
                  key={s.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-3">
                    {s.code}
                  </td>

                  <td className="p-3">
                    {s.name}
                  </td>

                  <td className="p-3">
                    {s.contactName}
                  </td>

                  <td className="p-3">
                    {s.email}
                  </td>

                  <td className="p-3">
                    {s.phone}
                  </td>

                  <td className="p-3">

                    {s.active ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
                        Inactive
                      </span>
                    )}

                  </td>

                  <td className="p-3 flex gap-3">

                    <Link
                      href={`/supply-chain/suppliers/${s.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>

                    <Link
                      href={`/supply-chain/suppliers/edit/${s.id}`}
                      className="text-yellow-600 hover:underline"
                    >
                      Edit
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}