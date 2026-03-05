"use client";

import Image from "next/image";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Safe", value: 12 },
  { name: "Overstock", value: 2 },
  { name: "Order Now", value: 1 },
];

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

export default function DataScienceDashboard() {

  return (

    <div className="space-y-8">

      {/* Page Title */}

      <div>
        <h1 className="text-2xl font-bold">
          Data Science Dashboard
        </h1>
      </div>

      {/* Metric Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Order Now</p>
          <p className="text-2xl font-bold text-red-500">1</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Safe</p>
          <p className="text-2xl font-bold text-green-500">12</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Overstock</p>
          <p className="text-2xl font-bold text-yellow-500">2</p>
        </div>

      </div>

      {/* Inventory Risk Pie Chart */}

      <div className="bg-white rounded-lg shadow p-6">

        <h2 className="text-lg font-semibold mb-6">
          Inventory Risk Distribution
        </h2>

        <div className="h-[350px]">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >

                {data.map((entry, index) => (

                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <p className="text-sm text-gray-500 mt-4">
          Insight: Most items are currently within safe inventory levels,
          with only a small portion requiring immediate replenishment.
        </p>

      </div>


      {/* Demand Forecast Example */}

      <div className="bg-white rounded-lg shadow p-6">

        <h2 className="text-lg font-semibold mb-4">
          Demand Forecast Example
        </h2>

        <Image
          src="/reports/forecast/plot_future_forecast_store1_item1.png"
          alt="Demand Forecast Example"
          width={1000}
          height={500}
          className="rounded"
        />

        <p className="text-sm text-gray-500 mt-4">
          Forecast generated using the Prophet model to predict future demand
          patterns based on historical retail sales data.
        </p>

      </div>


      {/* Model Evaluation */}

      <div className="bg-white rounded-lg shadow p-6">

        <h2 className="text-lg font-semibold mb-4">
          Model Performance Comparison
        </h2>

        <Image
          src="/reports/final_evaluation/avg_mape_comparison.png"
          alt="Model Performance Comparison"
          width={1000}
          height={500}
          className="rounded"
        />

        <p className="text-sm text-gray-500 mt-4">
          Comparison of forecasting models including Prophet,
          Hybrid Prophet + XGBoost, and Tuned Hybrid models
          evaluated using Mean Absolute Percentage Error (MAPE).
        </p>

      </div>

    </div>

  );

}