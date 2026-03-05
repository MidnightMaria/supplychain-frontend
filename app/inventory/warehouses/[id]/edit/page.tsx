import { getWarehouse } from "@/lib/warehouse-api";
import WarehouseForm from "@/app/inventory/warehouses/WarehouseForm";

export default async function EditWarehousePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const warehouse = await getWarehouse(Number(id));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Edit Warehouse
      </h1>

      <WarehouseForm initialData={warehouse} isEdit />
    </div>
  );
}