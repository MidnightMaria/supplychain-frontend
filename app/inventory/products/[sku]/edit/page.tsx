import { getProduct } from "@/lib/product-api";
import ProductForm from "@/app/inventory/products/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = await params;
  const product = await getProduct(sku);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Product</h1>

      <ProductForm initialData={product} isEdit />
    </div>
  );
}