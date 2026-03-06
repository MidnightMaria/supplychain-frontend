"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createWarehouse,
  updateWarehouse,
} from "@/lib/warehouse-api";
import { Warehouse } from "@/types/warehouse";

export default function WarehouseForm({
  initialData,
  isEdit,
}: {
  initialData?: Warehouse;
  isEdit?: boolean;
}) {
  const router = useRouter();

  const [form, setForm] = useState(
    initialData || {
      code: "",
      name: "",
      address: "",
      latitude: "",
      longitude: "",
      isActive: true,
    }
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      ...form,
      latitude:
        form.latitude === "" ? null : Number(form.latitude),
      longitude:
        form.longitude === "" ? null : Number(form.longitude),
    };

    try {
      if (isEdit && initialData) {
        await updateWarehouse(initialData.id, {
          ...payload,
          address: payload.address ?? undefined
        });
        router.push(`/inventory/warehouses/${initialData.id}`);
      } else {
        const created = await createWarehouse(payload);
        router.push(`/inventory/warehouses/${created.id}`);
      }

      router.refresh();
    } catch (err) {
      alert("Error saving warehouse");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 space-y-6 max-w-2xl"
    >
      <div className="grid grid-cols-2 gap-6">
        <Input
          label="Code"
          value={form.code}
          disabled={isEdit}
          onChange={(v) => setForm({ ...form, code: v })}
        />

        <Input
          label="Name"
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
        />

        <Input
          label="Address"
          value={form.address}
          onChange={(v) => setForm({ ...form, address: v })}
        />

        <Input
          label="Latitude"
          value={form.latitude}
          onChange={(v) =>
            setForm({ ...form, latitude: v })
          }
        />

        <Input
          label="Longitude"
          value={form.longitude}
          onChange={(v) =>
            setForm({ ...form, longitude: v })
          }
        />

        <div className="flex items-center gap-3 mt-6">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) =>
              setForm({
                ...form,
                isActive: e.target.checked,
              })
            }
          />
          <label className="text-sm text-gray-700">
            Active
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 rounded-lg border"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 shadow"
        >
          {isEdit ? "Update Warehouse" : "Create Warehouse"}
        </button>
      </div>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: any;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-500">{label}</label>
      <input
        value={value ?? ""}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}