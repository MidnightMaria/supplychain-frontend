"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { dataScienceFetcher } from "@/lib/dataScienceFetcher";

type DashboardSummary = {
  totalSeries: number;
  improvedSeries: number;
  improvementPct: number;
  reorder: number;
  safe: number;
  overstock: number;
  avgSafetyStock: number;
  avgReorderPoint: number;
  avgEoq: number;
};

const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];

export default function DataScienceDashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError(null);

        const data = await dataScienceFetcher("/api/data-science/dashboard-summary");
        setSummary(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard summary.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const inventoryData = useMemo(() => {
    if (!summary) return [];

    return [
      { name: "Safe", value: summary.safe ?? 0 },
      { name: "Reorder", value: summary.reorder ?? 0 },
      { name: "Overstock", value: summary.overstock ?? 0 },
    ].filter((item) => item.value > 0);
  }, [summary]);

  const inventoryTotal = useMemo(() => {
    if (!summary) return 0;
    return (summary.safe ?? 0) + (summary.reorder ?? 0) + (summary.overstock ?? 0);
  }, [summary]);

  const reorderPct = useMemo(() => {
    if (!inventoryTotal) return 0;
    return ((summary?.reorder ?? 0) / inventoryTotal) * 100;
  }, [summary, inventoryTotal]);

  const safePct = useMemo(() => {
    if (!inventoryTotal) return 0;
    return ((summary?.safe ?? 0) / inventoryTotal) * 100;
  }, [summary, inventoryTotal]);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Data Science Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Data Science Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-red-600">{error ?? "Dashboard data is unavailable."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Data Science Dashboard</h1>
        <p className="text-gray-500 mt-2">
          End-to-end demand forecasting and inventory optimization using a
          Hybrid Prophet + XGBoost approach.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Total Series</p>
          <p className="text-2xl font-bold">{summary.totalSeries}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Hybrid Improvement Rate</p>
          <p className="text-2xl font-bold text-blue-600">
            {summary.improvementPct.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {summary.improvedSeries} of {summary.totalSeries} series improved
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Items Requiring Reorder</p>
          <p className="text-2xl font-bold text-red-500">{summary.reorder}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Items in Safe Condition</p>
          <p className="text-2xl font-bold text-green-600">{summary.safe}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-6">Inventory Status Distribution</h2>

        <div className="h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={inventoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {inventoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Inventory optimization results show that {reorderPct.toFixed(1)}% of series
          require replenishment, while {safePct.toFixed(1)}% remain in a safe inventory
          condition.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Average Safety Stock</p>
          <p className="text-2xl font-bold">{summary.avgSafetyStock.toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Average Reorder Point</p>
          <p className="text-2xl font-bold">{summary.avgReorderPoint.toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Average EOQ</p>
          <p className="text-2xl font-bold">{summary.avgEoq.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Model Comparison (SMAPE)</h2>

        <Image
          src="/reports/plots/smape_comparison.png"
          alt="SMAPE Comparison"
          width={1000}
          height={500}
          className="rounded w-full h-auto"
        />

        <p className="text-sm text-gray-500 mt-4">
          Hybrid Prophet + XGBoost achieved the best performance compared with
          Naive, Moving Average, and Prophet baselines.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Forecast Example</h2>

        <Image
          src="/reports/forecast/plot_future_forecast_store1_item1.png"
          alt="Forecast Example"
          width={1000}
          height={500}
          className="rounded w-full h-auto"
        />

        <p className="text-sm text-gray-500 mt-4">
          Example of future demand forecasting generated using the Hybrid Prophet +
          XGBoost model.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Key Insights</h2>

        <ul className="space-y-3 text-sm text-gray-700 list-disc pl-5">
          <li>
            Hybrid model improved forecasting performance on{" "}
            {summary.improvementPct.toFixed(1)}% of all time series.
          </li>
          <li>
            {summary.reorder} store-item combinations were identified as requiring
            reorder action.
          </li>
          <li>
            {summary.safe} store-item combinations remain in a safe inventory condition.
          </li>
          <li>
            Forecasting outputs were successfully translated into safety stock, reorder
            point, and EOQ decisions.
          </li>
        </ul>
      </div>
    </div>
  );
}