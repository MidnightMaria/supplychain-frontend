"use client";

import { useEffect, useState } from "react";

interface Stats {
  total: number;
  pending: number;
  completed: number;
}

export default function SupplyChainDashboard() {

  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    completed: 0
  });

  useEffect(() => {

    fetch("http://localhost:8083/api/purchase-orders/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));

  }, []);

  return (

    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Supply Chain Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white rounded-lg shadow p-6">

          <div className="text-gray-500 text-sm">
            Total Purchase Orders
          </div>

          <div className="text-3xl font-bold mt-2">
            {stats.total}
          </div>

        </div>

        <div className="bg-white rounded-lg shadow p-6">

          <div className="text-gray-500 text-sm">
            Pending Orders
          </div>

          <div className="text-3xl font-bold text-yellow-600 mt-2">
            {stats.pending}
          </div>

        </div>

        <div className="bg-white rounded-lg shadow p-6">

          <div className="text-gray-500 text-sm">
            Completed Orders
          </div>

          <div className="text-3xl font-bold text-green-600 mt-2">
            {stats.completed}
          </div>

        </div>

      </div>

    </div>

  );
}