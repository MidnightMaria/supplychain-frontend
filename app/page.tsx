import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center space-y-6">

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900">
          Supply Chain Management System
        </h1>

        <p className="text-gray-600 text-lg">
          A microservices-based platform for managing inventory, warehouses,
          and product distribution with real-time analytics.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link
            href="/inventory/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/inventory/products"
            className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition"
          >
            Manage Products
          </Link>

          <Link
            href="/inventory"
            className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition"
          >
            View Inventory
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-lg mb-2">
              Inventory Management
            </h3>
            <p className="text-gray-600 text-sm">
              Track stock levels across multiple warehouses with movement
              history and adjustments.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-lg mb-2">
              Warehouse Operations
            </h3>
            <p className="text-gray-600 text-sm">
              Manage warehouse locations, transfers, and product distribution
              efficiently.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-lg mb-2">
              Analytics & Insights
            </h3>
            <p className="text-gray-600 text-sm">
              Monitor stock trends and operational metrics through dashboards
              and charts.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}