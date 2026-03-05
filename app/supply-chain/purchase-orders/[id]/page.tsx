"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Supplier {
  id: number;
  name: string;
}

interface PurchaseOrderItem {
  id: number;
  productSku: string;
  quantity: number;
  unitPrice: number;
}

interface PurchaseOrder {
  id: number;
  orderNumber: string;
  supplier: Supplier;
  status: string;
  orderDate: string;
  expectedDeliveryDate: string;
  items: PurchaseOrderItem[];
}

export default function PurchaseOrderDetailPage() {

  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [order, setOrder] = useState<PurchaseOrder | null>(null);

  useEffect(() => {

    fetch(`http://localhost:8083/api/purchase-orders/${id}`)
      .then(res => res.json())
      .then(data => setOrder(data));

  }, [id]);

  const receiveOrder = async () => {

    if (!order) return;

    const updated = {
      ...order,
      status: "RECEIVED"
    };

    await fetch(`http://localhost:8083/api/purchase-orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updated)
    });

    router.refresh();
  };

  if (!order) return <div>Loading...</div>;

  const totalValue = order.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Purchase Order Detail
      </h1>

      <div className="bg-white p-6 rounded-lg shadow">

        <div className="grid grid-cols-2 gap-4">

          <div>
            <strong>Order Number:</strong> {order.orderNumber}
          </div>

          <div>
            <strong>Supplier:</strong> {order.supplier?.name}
          </div>

          <div>
            <strong>Order Date:</strong> {order.orderDate}
          </div>

          <div>
            <strong>Expected Delivery:</strong> {order.expectedDeliveryDate}
          </div>

          <div>
            <strong>Status:</strong>{" "}
            {order.status === "PENDING" && (
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm">
                Pending
              </span>
            )}

            {order.status === "RECEIVED" && (
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                Received
              </span>
            )}

            {order.status === "COMPLETED" && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                Completed
              </span>
            )}
          </div>

        </div>

      </div>

      <div className="bg-white p-6 rounded-lg shadow">

        <h2 className="text-lg font-semibold mb-4">
          Items
        </h2>

        <table className="w-full">

          <thead>
            <tr className="border-b text-left">
              <th className="p-2">SKU</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Unit Price</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>

          <tbody>

            {order.items.map((item) => (

              <tr key={item.id} className="border-b">

                <td className="p-2">
                  {item.productSku}
                </td>

                <td className="p-2">
                  {item.quantity}
                </td>

                <td className="p-2">
                  {item.unitPrice.toLocaleString()}
                </td>

                <td className="p-2">
                  {(item.quantity * item.unitPrice).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="mt-4 text-right font-semibold">
          Total Order Value: {totalValue.toLocaleString()}
        </div>

      </div>

      {order.status === "COMPLETED" ? (

        <div className="text-green-600 font-semibold">
          Purchase Order already received
        </div>

      ) : (

        <button
          onClick={receiveOrder}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Receive Purchase Order
        </button>

      )}

    </div>
  );
}