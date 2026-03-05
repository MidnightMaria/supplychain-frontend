import { getProduct } from "@/lib/product-api";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = await params;
  const product = await getProduct(sku);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Product Details</h1>

        <div className="flex gap-3">
          <EditButton sku={product.sku} />
          <DeleteButton sku={product.sku} />
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="grid grid-cols-2 gap-6">
          <DetailItem label="SKU" value={product.sku} />
          <DetailItem label="Name" value={product.name} />
          <DetailItem label="Description" value={product.description} />
          <DetailItem label="Price" value={`$${product.price}`} />
          <DetailItem label="Quantity" value={product.quantity} />
          <DetailItem label="Min Stock" value={product.minStock} />
          <DetailItem
            label="Dynamic Pricing"
            value={product.dynamicPricing ? "Yes" : "No"}
          />
          <DetailItem
            label="Competitor Price"
            value={`$${product.competitorPrice}`}
          />
        </div>
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  );
}