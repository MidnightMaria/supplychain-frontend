import { getRetailWarehouses, getProducts } from "@/lib/retailApi";

export default async function RetailDashboard() {
  const warehouses = await getRetailWarehouses();
  const products = await getProducts();

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold text-orange-600">
        Retail Dashboard
      </h1>

      <p className="text-gray-600">
        Manage store warehouses and stock levels across retail locations.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-6">

        <Card
          title="Warehouses"
          value={warehouses.length}
          description="Active retail locations"
        />

        <Card
          title="Products"
          value={products.length}
          description="Products in stores"
        />

        <Card
          title="Low Stock"
          value="—"
          description="Items needing restock"
        />

      </div>

    </div>
  );
}

function Card({
  title,
  value,
  description,
}: {
  title: string;
  value: number | string;
  description: string;
}) {
  return (
    <div
      className="
        bg-white
        rounded-xl
        border border-orange-100
        p-6
        shadow-sm
        hover:shadow-md
        transition
      "
    >
      <p className="text-sm text-gray-500">{title}</p>

      <h2 className="text-3xl font-bold text-orange-500 mt-2">
        {value}
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        {description}
      </p>
    </div>
  );
}