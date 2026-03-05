"use client";

import Link from "next/link";

export default function EditButton({ sku }: { sku: string }) {
  return (
    <Link
      href={`/inventory/products/${sku}/edit`}
      className="px-5 py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 shadow"
    >
      Edit
    </Link>
  );
}