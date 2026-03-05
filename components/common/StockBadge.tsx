import { getStockStatus, getStockLabel } from "@/lib/utils/stock";

interface Props {
  quantity: number;
}

export default function StockBadge({ quantity }: Props) {
  const status = getStockStatus(quantity);

  const colorMap = {
    out: "bg-red-700",
    low: "bg-red-500",
    medium: "bg-yellow-500",
    healthy: "bg-green-600",
  };

  return (
    <span
      className={`px-2 py-1 text-xs text-white rounded ${colorMap[status]}`}
    >
      {getStockLabel(status)}
    </span>
  );
}