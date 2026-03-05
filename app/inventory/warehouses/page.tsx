import { getWarehouses } from "@/lib/warehouse-api";
import WarehouseTable from "./WarehouseTable";
import Link from "next/link";

export default async function WarehousesPage() {
  const warehouses = await getWarehouses();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Warehouses</h1>

        <Link
          href="/inventory/warehouses/add"
          className="px-5 py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 shadow"
        >
          Add Warehouse
        </Link>
      </div>

      {/* Table */}
      <WarehouseTable warehouses={warehouses} />
    </div>
  );
}