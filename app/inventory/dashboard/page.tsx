"use client";

import { useEffect, useState } from "react";
import {
  getProducts,
  getWarehouses,
  getCentralInventory,
} from "@/lib/inventoryApi";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    warehouses: 0,
    totalStock: 0,
    lowStock: 0,
  });

  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [products, warehouses, inventory] =
          await Promise.all([
            getProducts(),
            getWarehouses(),
            getCentralInventory(),
          ]);

        const totalStock = inventory.reduce(
          (sum: number, item: any) =>
            sum + (item.currentStock || 0),
          0
        );

        const lowStock = inventory.filter(
          (item: any) => item.currentStock <= 5
        ).length;

        setStats({
          products: products.length,
          warehouses: warehouses.length,
          totalStock,
          lowStock,
        });

        // 📊 group stock by warehouse
        const warehouseMap: Record<string, number> = {};

        inventory.forEach((item: any) => {
          const wh = item.warehouseCode || "Unknown";

          if (!warehouseMap[wh]) {
            warehouseMap[wh] = 0;
          }

          warehouseMap[wh] += item.currentStock || 0;
        });

        const chart = Object.keys(warehouseMap).map(
          (key) => ({
            warehouse: key,
            stock: warehouseMap[key],
          })
        );

        setChartData(chart);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  function Card({
    title,
    value,
  }: {
    title: string;
    value: number;
  }) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-sm text-gray-500">
          {title}
        </h2>
        <p className="text-3xl font-bold mt-2">
          {value}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total Products" value={stats.products} />
        <Card title="Total Warehouses" value={stats.warehouses} />
        <Card title="Total Stock" value={stats.totalStock} />
        <Card title="Low Stock Items" value={stats.lowStock} />
      </div>

      {/* Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          Stock by Warehouse
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="warehouse" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}