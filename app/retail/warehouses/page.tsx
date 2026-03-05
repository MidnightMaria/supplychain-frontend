"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getRetailWarehouses,
  createRetailWarehouse,
  deleteRetailWarehouse,
  updateRetailWarehouse,
} from "@/lib/retailApi";

export default function WarehousesPage() {
  const router = useRouter();

  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const [form, setForm] = useState({
    code: "",
    name: "",
    address: "",
  });

  async function loadData() {
    setLoading(true);
    const data = await getRetailWarehouses();
    setWarehouses(data);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm({
      code: "",
      name: "",
      address: "",
    });
    setShowModal(true);
  }

  function openEdit(w: any) {
    setEditing(w);
    setForm({
      code: w.code,
      name: w.name,
      address: w.address || "",
    });
    setShowModal(true);
  }

  async function handleSubmit() {
    if (editing) {
      await updateRetailWarehouse(editing.id, form);
    } else {
      await createRetailWarehouse({
        ...form,
        active: true,
      });
    }

    setShowModal(false);
    loadData();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete warehouse?")) return;
    await deleteRetailWarehouse(id);
    loadData();
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-600">
          Retail Warehouses
        </h1>

        <button
          onClick={openCreate}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
        >
          + New Warehouse
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-orange-100 shadow-sm overflow-hidden">

        {loading ? (
          <div className="p-6 text-gray-500">Loading...</div>
        ) : (
          <table className="w-full">

            <thead className="bg-orange-50 border-b">
              <tr>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3"></th>
              </tr>
            </thead>

            <tbody>

              {warehouses.map((w) => (
                <tr key={w.id} className="border-b">

                  <td className="p-3">{w.code}</td>

                  <td className="p-3 font-medium">
                    {w.name}
                  </td>

                  <td className="p-3 text-gray-500">
                    {w.address || "-"}
                  </td>

                  <td className="p-3 text-right space-x-4">

                    <button
                      onClick={() =>
                        router.push(
                          `/retail/warehouses/${w.id}/stock`
                        )
                      }
                      className="text-blue-600 hover:underline"
                    >
                      Stock
                    </button>

                    <button
                      onClick={() => openEdit(w)}
                      className="text-orange-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(w.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

          <div className="bg-white rounded-xl p-6 w-[420px] space-y-4">

            <h2 className="text-lg font-semibold">
              {editing ? "Edit Warehouse" : "New Warehouse"}
            </h2>

            <input
              placeholder="Code"
              className="border rounded-lg px-3 py-2 w-full"
              value={form.code}
              onChange={(e) =>
                setForm({
                  ...form,
                  code: e.target.value,
                })
              }
            />

            <input
              placeholder="Name"
              className="border rounded-lg px-3 py-2 w-full"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <input
              placeholder="Address"
              className="border rounded-lg px-3 py-2 w-full"
              value={form.address}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-2 pt-2">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}