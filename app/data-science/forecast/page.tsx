"use client";

import Image from "next/image";

export default function ForecastPage() {

  const plots = [
    "/reports/forecast/plot_future_forecast_store1_item1.png",
    "/reports/forecast/plot_future_forecast_store1_item2.png",
    "/reports/forecast/plot_future_forecast_store1_item3.png",
    "/reports/forecast/plot_future_forecast_store1_item4.png",
    "/reports/forecast/plot_future_forecast_store1_item5.png",

    "/reports/forecast/plot_future_forecast_store2_item1.png",
    "/reports/forecast/plot_future_forecast_store2_item2.png",
    "/reports/forecast/plot_future_forecast_store2_item3.png",
    "/reports/forecast/plot_future_forecast_store2_item4.png",
    "/reports/forecast/plot_future_forecast_store2_item5.png",

    "/reports/forecast/plot_future_forecast_store3_item1.png",
    "/reports/forecast/plot_future_forecast_store3_item2.png",
    "/reports/forecast/plot_future_forecast_store3_item3.png",
    "/reports/forecast/plot_future_forecast_store3_item4.png",
    "/reports/forecast/plot_future_forecast_store3_item5.png",
  ];

  return (

    <div className="space-y-8">

      <h1 className="text-2xl font-bold">
        Demand Forecast
      </h1>

      <p className="text-gray-500">
        Future demand predictions generated using the Hybrid Prophet + XGBoost model.
      </p>

      {plots.map((src, i) => (

        <div
          key={i}
          className="bg-white rounded-lg shadow p-6"
        >

          <Image
            src={src}
            alt={`Forecast ${i}`}
            width={1200}
            height={600}
            className="rounded"
          />

        </div>

      ))}

    </div>

  );
}