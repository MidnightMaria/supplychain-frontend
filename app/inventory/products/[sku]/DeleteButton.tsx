"use client";

import { useRouter } from "next/navigation";
import { deleteProduct } from "@/lib/product-api";

export default function DeleteButton({ sku }: { sku: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this product?")) return;

    await deleteProduct(sku);

    alert("Product deleted");
    router.push("/inventory/products");
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
    >
      Delete
    </button>
  );
}