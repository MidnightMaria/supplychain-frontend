export type Warehouse = {
  id: number;
  code: string;
  name: string;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type WarehouseRequest = {
  code: string;
  name: string;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  isActive: boolean;
};