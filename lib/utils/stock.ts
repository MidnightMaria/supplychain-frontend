export type StockStatus = "out" | "low" | "medium" | "healthy";

export function getStockStatus(qty: number): StockStatus {
  if (qty === 0) return "out";
  if (qty <= 10) return "low";
  if (qty <= 50) return "medium";
  return "healthy";
}

export function getStockLabel(status: StockStatus): string {
  switch (status) {
    case "out":
      return "Out";
    case "low":
      return "Low";
    case "medium":
      return "Medium";
    case "healthy":
      return "Healthy";
  }
}