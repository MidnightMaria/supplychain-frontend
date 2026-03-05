"use client";

import Image from "next/image";

export default function EDAPage() {

  return (

    <div className="space-y-16">

      <h1 className="text-3xl font-bold">
        Demand Analysis
      </h1>

      {/* Dataset Overview */}

      <section className="space-y-6">

        <h2 className="text-xl font-semibold">
          Dataset Overview
        </h2>

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

      {/* Seasonality */}

      <section className="space-y-6">

        <h2 className="text-xl font-semibold">
          Seasonality Patterns
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <Image
            src="/reports/eda2/plot_avg_sales_by_dow.png"
            alt=""
            width={900}
            height={500}
            className="rounded"
          />

          <Image
            src="/reports/eda2/plot_avg_sales_by_dom.png"
            alt=""
            width={900}
            height={500}
            className="rounded"
          />

          <Image
            src="/reports/eda2/plot_avg_sales_by_moy.png"
            alt=""
            width={900}
            height={500}
            className="rounded"
          />

        </div>

      </section>

      {/* Variability */}

      <section className="space-y-6">

        <h2 className="text-xl font-semibold">
          Demand Variability
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <Image
            src="/reports/eda2/plot_cv_by_store.png"
            alt=""
            width={900}
            height={500}
            className="rounded"
          />

          <Image
            src="/reports/eda2/plot_cv_top_items.png"
            alt=""
            width={900}
            height={500}
            className="rounded"
          />

        </div>

      </section>

      {/* Time Series */}

      <section className="space-y-6">

        <h2 className="text-xl font-semibold">
          Time Series Behavior
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <Image
            src="/reports/eda2/plot_series_store1_item1.png"
            alt=""
            width={900}
            height={500}
            className="rounded"
          />

          <Image
            src="/reports/eda2/plot_dow_store1_item1.png"
            alt=""
            width={900}
            height={500}
            className="rounded"
          />

          <Image
            src="/reports/eda2/plot_acf_store1_item1.png"
            alt=""
            width={900}
            height={500}
            className="rounded"
          />

        </div>

      </section>

    </div>
  );
}