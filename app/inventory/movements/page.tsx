import { getInventoryMovements } from "@/lib/inventoryApi";
import MovementTable from "@/components/inventory/MovementTable";
import { InventoryMovement } from "@/types/movements";

export default async function MovementsPage() {
  const data: InventoryMovement[] = await getInventoryMovements();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Inventory Movements</h1>

      <MovementTable data={data} />
    </div>
  );
}