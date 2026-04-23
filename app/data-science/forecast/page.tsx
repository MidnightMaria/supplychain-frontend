"use client";

import Image from "next/image";
import { useState } from "react";

export default function ForecastPage() {
  const stores = [1, 2, 3];
  const items = [1, 2, 3, 4, 5];

  const [store, setStore] = useState(1);
  const [item, setItem] = useState(1);

  const imageSrc = `/reports/forecast/plot_future_forecast_store${store}_item${item}.png`;

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold">Demand Forecast</h1>
        <p className="text-gray-500 mt-2">
          Future demand predictions using Hybrid Prophet + XGBoost.
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        
        {/* Store Select */}
        <div>
          <label className="block text-sm mb-1">Store</label>
          <select
            value={store}
            onChange={(e) => setStore(Number(e.target.value))}
            className="border rounded px-3 py-2"
          >
            {stores.map((s) => (
              <option key={s} value={s}>
                Store {s}
              </option>
            ))}
          </select>
        </div>

        {/* Item Select */}
        <div>
          <label className="block text-sm mb-1">Item</label>
          <select
            value={item}
            onChange={(e) => setItem(Number(e.target.value))}
            className="border rounded px-3 py-2"
          >
            {items.map((i) => (
              <option key={i} value={i}>
                Item {i}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-semibold mb-4">
          Forecast — Store {store}, Item {item}
        </h2>

        <Image
          src={imageSrc}
          alt="Forecast Chart"
          width={1200}
          height={600}
          className="rounded w-full h-auto"
        />

        <p className="text-sm text-gray-500 mt-4">
          The hybrid model captures both trend and residual patterns,
          resulting in more accurate demand forecasts.
        </p>
      </div>
    </div>
  );
}