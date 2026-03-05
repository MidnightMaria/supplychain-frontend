"use client";

import { useState } from "react";
import { createProduct, updateProduct } from "@/lib/product-api";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

export default function ProductForm({
  onSuccess,
  initialData,
  isEdit,
}: {
  onSuccess?: () => void;
  initialData?: Product;
  isEdit?: boolean;
}) {
  const router = useRouter();

  const [form, setForm] = useState(
    initialData || {
      sku: "",
      name: "",
      description: "",
      price: 0,
      minStock: 0,
      quantity: 0,
      dynamicPricing: false,
      competitorPrice: 0,
    }
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      let sku = form.sku;

      if (isEdit) {
        await updateProduct(form.sku, form);
      } else {
        const created = await createProduct(form);
        // kalau backend return object product
        if (created?.sku) {
          sku = created.sku;
        }
      }
      router.push(`/inventory/products/${sku}`);
      router.refresh();

      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 space-y-6 max-w-2xl"
    >
      <div className="grid grid-cols-2 gap-6">
        <Input
          label="SKU"
          value={form.sku}
          disabled={isEdit}
          onChange={(v) => setForm({ ...form, sku: v })}
        />

        <Input
          label="Name"
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
        />

        <Input
          label="Description"
          value={form.description}
          onChange={(v) => setForm({ ...form, description: v })}
        />

        <Input
          label="Price"
          type="number"
          value={form.price}
          onChange={(v) => setForm({ ...form, price: Number(v) })}
        />

        <Input
          label="Min Stock"
          type="number"
          value={form.minStock}
          onChange={(v) => setForm({ ...form, minStock: Number(v) })}
        />

        <Input
          label="Quantity"
          type="number"
          value={form.quantity}
          onChange={(v) => setForm({ ...form, quantity: Number(v) })}
        />

        <Input
          label="Competitor Price"
          type="number"
          value={form.competitorPrice}
          onChange={(v) =>
            setForm({ ...form, competitorPrice: Number(v) })
          }
        />

        <div className="flex items-center gap-3 mt-6">
          <input
            type="checkbox"
            checked={form.dynamicPricing}
            onChange={(e) =>
              setForm({ ...form, dynamicPricing: e.target.checked })
            }
          />
          <label className="text-sm text-gray-700">
            Dynamic Pricing
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
          {isEdit ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  disabled,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-500">{label}</label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}