"use client";

import Image from "next/image";

export default function EDATimeSeriesPage() {

  const plots = [
    {
      title: "Average Sales by Day of Week",
      src: "/reports/eda2/plot_avg_sales_by_dow.png"
    },
    {
      title: "Average Sales by Day of Month",
      src: "/reports/eda2/plot_avg_sales_by_dom.png"
    },
    {
      title: "Average Sales by Month",
      src: "/reports/eda2/plot_avg_sales_by_moy.png"
    },
    {
      title: "Coefficient of Variation by Store",
      src: "/reports/eda2/plot_cv_by_store.png"
    },
    {
      title: "Top Items by Demand Variability",
      src: "/reports/eda2/plot_cv_top_items.png"
    },
    {
      title: "Daily Sales Time Series (Store 1 Item 1)",
      src: "/reports/eda2/plot_series_store1_item1.png"
    },
    {
      title: "Day-of-Week Pattern (Store 1 Item 1)",
      src: "/reports/eda2/plot_dow_store1_item1.png"
    },
    {
      title: "Autocorrelation Analysis",
      src: "/reports/eda2/plot_acf_store1_item1.png"
    }
  ];

  return (

    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Time Series Analysis
      </h1>

      <p className="text-gray-500">
        Analysis of seasonality, temporal patterns, and demand variability across stores and items.
      </p>

      <div className="space-y-8">

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
              width={1000}
              height={600}
              className="rounded w-full h-auto"
            />

          </div>

        ))}

      </div>

    </div>
  );
}