"use client";

import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "@/lib/product-api";
import ProductTable from "./ProductTable";
import { Product } from "@/types/product";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  async function handleDelete(sku: string) {
    if (!confirm("Delete this product?")) return;
    await deleteProduct(sku);
    loadProducts();
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>

        <Link
          href="/inventory/products/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          Add Product
        </Link>
      </div>

      {/* Table */}
      <ProductTable products={products} onDelete={handleDelete} />
    </div>
  );
}