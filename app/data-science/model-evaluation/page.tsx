"use client";

import Image from "next/image";

export default function ModelEvaluationPage() {

  const plots = [

    {
      title: "Average MAPE Comparison",
      src: "/reports/final_evaluation/avg_mape_comparison.png"
    },

    {
      title: "MAPE per Item Trend",
      src: "/reports/final_evaluation/mape_per_item_trend.png"
    },

    {
      title: "Improvement Distribution",
      src: "/reports/final_evaluation/improvement_distribution.png"
    },

    {
      title: "Prophet vs Hybrid MAPE",
      src: "/reports/hybrid_evaluation/plots/scatter_prophet_vs_hybrid_mape.png"
    },

    {
      title: "Average MAPE per Store",
      src: "/reports/hybrid_evaluation/plots/bar_avg_mape_per_store.png"
    }

  ];

  return (

    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Model Evaluation
      </h1>

      <p className="text-gray-500">
        Comparison of forecasting models including Prophet, Hybrid Prophet + XGBoost, 
        and Tuned Hybrid models using Mean Absolute Percentage Error (MAPE).
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {plots.map((plot, i) => (

          <div
            key={i}
            className="bg-white rounded-lg shadow p-4"
          >

            <h2 className="font-semibold mb-3">
              {plot.title}
            </h2>

            <Image
              src={plot.src}
              alt={plot.title}
              width={900}
              height={500}
              className="rounded w-full h-auto"
            />

          </div>

        ))}

      </div>

    </div>
  );
}