import { getWarehouse } from "@/lib/warehouse-api";
import EditButton from "./EditButton";
import DeleteButton from "../DeleteWarehouseButton";

export default async function WarehouseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const warehouse = await getWarehouse(Number(id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Warehouse Details</h1>

        <div className="flex gap-3">
          <EditButton id={warehouse.id} />
          <DeleteButton id={warehouse.id} />
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="grid grid-cols-2 gap-6">
          <DetailItem label="Code" value={warehouse.code} />
          <DetailItem label="Name" value={warehouse.name} />
          <DetailItem label="Address" value={warehouse.address || "-"} />
          <DetailItem
            label="Latitude"
            value={warehouse.latitude ?? "-"}
          />
          <DetailItem
            label="Longitude"
            value={warehouse.longitude ?? "-"}
          />

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <StatusBadge active={warehouse.isActive} />
          </div>
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

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        active
          ? "bg-green-100 text-green-700"
          : "bg-gray-200 text-gray-600"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}