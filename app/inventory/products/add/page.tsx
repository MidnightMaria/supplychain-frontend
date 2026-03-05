"use client";

import { useRouter } from "next/navigation";
import ProductForm from "../ProductForm";

export default function AddProductPage() {
  const router = useRouter();

  function handleSuccess() {
    router.push("/inventory/products");
  }

  return (
    <div>
      <h1>Add Product</h1>

      <ProductForm onSuccess={handleSuccess} />
    </div>
  );
}