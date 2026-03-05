import { CentralInventoryItem } from "@/types/inventory";

interface Props {
  data: CentralInventoryItem[];
}

export default function CentralInventoryTable({ data }: Props) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">SKU</th>
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-left">Warehouse</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-left">Updated</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        
        <tbody>
          {data.map((item, index) => {
            const low = item.currentStock <= 10;

            return (
              <tr key={index} className="border-t">
                <td className="p-3 font-mono">{item.productSku}</td>
                <td className="p-3">{item.productName}</td>
                <td className="p-3">{item.warehouseCode}</td>
                <td className="p-3 font-semibold">{item.currentStock}</td>
                <td className="p-3">
                  {new Date(item.updatedAt).toLocaleString()}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      low ? "bg-red-500" : "bg-green-600"
                    }`}
                  >
                    {low ? "Low" : "Healthy"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}