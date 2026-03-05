import { getCentralInventory } from "@/lib/inventoryApi";
import CentralInventoryTable from "@/components/inventory/CentralInventoryTable";
import { CentralInventoryItem } from "@/types/inventory";

export default async function InventoryPage() {
  const data: CentralInventoryItem[] = await getCentralInventory();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Central Inventory</h1>
      
      <CentralInventoryTable data={data} />
    </div>
  );
}