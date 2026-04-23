"use client";

import Image from "next/image";

export default function EDAPage() {
  return (
    <div className="space-y-16">
      <div>
        <h1 className="text-3xl font-bold">Demand Analysis</h1>
        <p className="text-gray-500 mt-2">
          Exploratory data analysis of retail demand data, including distribution,
          seasonality, variability, and time-series behavior.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Dataset Overview</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Image
            src="/reports/eda/hist_sales.png"
            alt="Sales Distribution"
            width={900}
            height={500}
            className="rounded"
          />

          <Image
            src="/reports/eda/plot_daily_sales.png"
            alt="Daily Sales"
            width={900}
            height={500}
            className="rounded"
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Seasonality Patterns</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Image
            src="/reports/eda2/plot_avg_sales_by_dow.png"
            alt="Average Sales by Day of Week"
            width={900}
            height={500}
            className="rounded"
          />

          <Image
            src="/reports/eda2/plot_avg_sales_by_dom.png"
            alt="Average Sales by Day of Month"
            width={900}
            height={500}
            className="rounded"
          />

          <Image
            src="/reports/eda2/plot_avg_sales_by_moy.png"
            alt="Average Sales by Month"
            width={900}
            height={500}
            className="rounded"
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Demand Variability</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Image
            src="/reports/eda2/plot_cv_by_store.png"
            alt="Coefficient of Variation by Store"
            width={900}
            height={500}
            className="rounded"
          />

          <Image
            src="/reports/eda2/plot_cv_top_items.png"
            alt="Top Items by Demand Variability"
            width={900}
            height={500}
            className="rounded"
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Time Series Behavior</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Image
            src="/reports/eda2/plot_series_store1_item1.png"
            alt="Store 1 Item 1 Time Series"
            width={900}
            height={500}
            className="rounded"
          />

          <Image
            src="/reports/eda2/plot_dow_store1_item1.png"
            alt="Store 1 Item 1 Day of Week Pattern"
            width={900}
            height={500}
            className="rounded"
          />

          <Image
            src="/reports/eda2/plot_acf_store1_item1.png"
            alt="Store 1 Item 1 Autocorrelation"
            width={900}
            height={500}
            className="rounded"
          />
        </div>
      </section>
    </div>
  );
}