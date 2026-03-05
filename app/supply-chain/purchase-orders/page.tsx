"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Supplier {
  id: number;
  name: string;
}

interface PurchaseOrder {
  id: number;
  orderNumber: string;
  supplier: Supplier;
  status: string;
  orderDate: string;
  expectedDeliveryDate: string;
}

export default function PurchaseOrdersPage() {

  const [orders, setOrders] = useState<PurchaseOrder[]>([]);

  useEffect(() => {
    fetch("http://localhost:8083/api/purchase-orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Purchase Orders
        </h1>

        <Link
          href="/supply-chain/purchase-orders/add"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Purchase Order
        </Link>

      </div>

      <table className="w-full bg-white rounded shadow">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Order Number</th>
            <th className="p-3 text-left">Supplier</th>
            <th className="p-3 text-left">Order Date</th>
            <th className="p-3 text-left">Expected Delivery</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((o) => (

            <tr key={o.id} className="border-t">

              <td className="p-3">
                {o.orderNumber}
              </td>

              <td className="p-3">
                {o.supplier?.name}
              </td>

              <td className="p-3">
                {o.orderDate}
              </td>

              <td className="p-3">
                {o.expectedDeliveryDate}
              </td>

              <td className="p-3">

                {o.status === "PENDING" && (
                  <span className="text-yellow-600 font-medium">
                    PENDING
                  </span>
                )}

                {o.status === "APPROVED" && (
                  <span className="text-blue-600 font-medium">
                    APPROVED
                  </span>
                )}

                {o.status === "RECEIVED" && (
                  <span className="text-green-600 font-medium">
                    RECEIVED
                  </span>
                )}

              </td>

              <td className="p-3">

                <Link
                  href={`/supply-chain/purchase-orders/${o.id}`}
                  className="text-green-600 hover:underline"
                >
                  View
                </Link>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}