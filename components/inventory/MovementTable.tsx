import { InventoryMovement } from "@/types/movements";

interface Props {
  data: InventoryMovement[];
}

export default function MovementTable({ data }: Props) {
  function getColor(type: string) {
    if (type.includes("IN")) return "bg-green-100 text-green-700";
    if (type.includes("OUT")) return "bg-red-100 text-red-700";
    return "bg-blue-100 text-blue-700";
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">SKU</th>
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-left">Warehouse</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Qty</th>
            <th className="p-3 text-left">Reference</th>
            <th className="p-3 text-left">By</th>
          </tr>
        </thead>

        <tbody>
          {data.map((m) => (
            <tr key={m.id} className="border-t">
              <td className="p-3">
                {new Date(m.createdAt).toLocaleString()}
              </td>

              <td className="p-3 font-mono">{m.productSku}</td>

              <td className="p-3">{m.productName}</td>

              <td className="p-3">{m.warehouseCode}</td>

              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs ${getColor(
                    m.movementType
                  )}`}
                >
                  {m.movementType}
                </span>
              </td>

              <td className="p-3 font-semibold">{m.difference}</td>

              <td className="p-3">{m.referenceNumber}</td>

              <td className="p-3">{m.performedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}