"use client";

import { useRouter } from "next/navigation";
import { deleteWarehouse } from "@/lib/warehouse-api";

export default function DeleteWarehouseButton({
  id,
  variant = "button",
}: {
  id: number;
  variant?: "button" | "link";
}) {
  const router = useRouter();

  async function handleDelete() {
      if (!confirm("Delete warehouse?")) return;

      try {
        await deleteWarehouse(id);

        router.push("/inventory/warehouses");
        router.refresh();

      } catch (err) {
        alert("Delete failed");
      }
    }

  if (variant === "link") {
    return (
      <button
        onClick={handleDelete}
        className="text-red-600 hover:underline"
      >
        Delete
      </button>
    );
  }

  return (
    <button
      onClick={handleDelete}
      className="px-5 py-2.5 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 shadow"
    >
      Delete
    </button>
  );
}