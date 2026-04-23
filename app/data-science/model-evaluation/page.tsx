"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { dataScienceFetcher } from "@/lib/dataScienceFetcher";

type Summary = {
  hybridMae: number;
  hybridRmse: number;
  hybridSmape: number;
  prophetMae: number;
  prophetRmse: number;
  prophetSmape: number;
  improvedSeries: number;
  totalSeries: number;
  improvementPct: number;
};

type ComparisonRow = {
  model: string;
  mae: number;
  rmse: number;
  mape: number;
  smape: number;
};

type SeriesRow = {
  store: number;
  item: number;
  prophet: number;
  hybrid: number;
  improvement: number;
};

type ModelEvaluationResponse = {
  summary: Summary;
  comparisonTable: ComparisonRow[];
  bestSeries: SeriesRow[];
  worstSeries: SeriesRow[];
};

export default function ModelEvaluationPage() {
  const [data, setData] = useState<ModelEvaluationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const plots = [
    {
      title: "Model Comparison (SMAPE)",
      src: "/reports/plots/smape_comparison.png",
      description:
        "SMAPE is used as the main comparison metric because it is more stable for demand forecasting data with possible zero sales values.",
    },
    {
      title: "Improvement Distribution",
      src: "/reports/plots/improvement_hist.png",
      description:
        "This histogram shows the distribution of SMAPE improvement between Prophet and Hybrid across all time series.",
    },
    {
      title: "Prophet vs Hybrid Scatter",
      src: "/reports/plots/scatter.png",
      description:
        "Most points below the diagonal line indicate that Hybrid achieves lower error than Prophet.",
    },
  ];

  useEffect(() => {
    async function loadEvaluation() {
      try {
        setLoading(true);
        setError(null);

        const response = await dataScienceFetcher("/api/data-science/model-evaluation");
        setData(response);
      } catch (err) {
        console.error(err);
        setError("Failed to load model evaluation.");
      } finally {
        setLoading(false);
      }
    }

    loadEvaluation();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Model Evaluation</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">Loading model evaluation...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Model Evaluation</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-red-600">{error ?? "Model evaluation data is unavailable."}</p>
        </div>
      </div>
    );
  }

  const { summary, comparisonTable, bestSeries, worstSeries } = data;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Model Evaluation</h1>
        <p className="text-gray-500 mt-2">
          Comparison of baseline and final forecasting models using MAE, RMSE,
          MAPE, and SMAPE on the test set.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Hybrid MAE</p>
          <p className="text-2xl font-bold text-blue-600">
            {summary.hybridMae.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Prophet: {summary.prophetMae.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Hybrid RMSE</p>
          <p className="text-2xl font-bold text-blue-600">
            {summary.hybridRmse.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Prophet: {summary.prophetRmse.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Hybrid SMAPE</p>
          <p className="text-2xl font-bold text-blue-600">
            {summary.hybridSmape.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Prophet: {summary.prophetSmape.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Improved Series</p>
          <p className="text-2xl font-bold text-green-600">
            {summary.improvedSeries} / {summary.totalSeries}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {summary.improvementPct.toFixed(1)}% improved
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Model Comparison Table</h2>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Model</th>
              <th className="p-3 text-left">MAE</th>
              <th className="p-3 text-left">RMSE</th>
              <th className="p-3 text-left">MAPE</th>
              <th className="p-3 text-left">SMAPE</th>
            </tr>
          </thead>
          <tbody>
            {comparisonTable.map((row, i) => (
              <tr
                key={i}
                className={`border-t ${row.model === "Hybrid" ? "bg-blue-50" : ""}`}
              >
                <td className="p-3 font-medium">{row.model}</td>
                <td className="p-3">{row.mae.toFixed(2)}</td>
                <td className="p-3">{row.rmse.toFixed(2)}</td>
                <td className="p-3">{row.mape.toFixed(2)}</td>
                <td className="p-3">{row.smape.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="text-sm text-gray-500 mt-4">
          Hybrid Prophet + XGBoost achieves the lowest error across all reported
          metrics, outperforming Naive, Moving Average, and Prophet baselines.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {plots.map((plot, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-3">{plot.title}</h2>

            <Image
              src={plot.src}
              alt={plot.title}
              width={1200}
              height={600}
              className="rounded w-full h-auto"
            />

            <p className="text-sm text-gray-500 mt-4">{plot.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4">Top Improved Series</h2>

          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Store</th>
                <th className="p-3 text-left">Item</th>
                <th className="p-3 text-left">Prophet SMAPE</th>
                <th className="p-3 text-left">Hybrid SMAPE</th>
                <th className="p-3 text-left">Improvement</th>
              </tr>
            </thead>
            <tbody>
              {bestSeries.map((row, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{row.store}</td>
                  <td className="p-3">{row.item}</td>
                  <td className="p-3">{row.prophet.toFixed(2)}</td>
                  <td className="p-3">{row.hybrid.toFixed(2)}</td>
                  <td className="p-3 text-green-600 font-medium">
                    +{row.improvement.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4">Least Improved Series</h2>

          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Store</th>
                <th className="p-3 text-left">Item</th>
                <th className="p-3 text-left">Prophet SMAPE</th>
                <th className="p-3 text-left">Hybrid SMAPE</th>
                <th className="p-3 text-left">Improvement</th>
              </tr>
            </thead>
            <tbody>
              {worstSeries.map((row, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{row.store}</td>
                  <td className="p-3">{row.item}</td>
                  <td className="p-3">{row.prophet.toFixed(2)}</td>
                  <td className="p-3">{row.hybrid.toFixed(2)}</td>
                  <td className="p-3 text-red-600 font-medium">
                    {row.improvement.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}