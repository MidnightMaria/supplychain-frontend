export interface InventoryMovement {
  id: number;
  productSku: string;
  productName: string;
  warehouseCode: string;
  movementType: string;
  difference: number;
  reason: string;
  referenceNumber: string;
  performedBy: string;
  createdAt: string;
}