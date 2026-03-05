"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditSupplierPage() {

  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [supplier, setSupplier] = useState({
    code: "",
    name: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8083/api/suppliers/${id}`)
      .then(res => res.json())
      .then(data => setSupplier(data));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupplier({
      ...supplier,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`http://localhost:8083/api/suppliers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplier),
    });

    router.push("/supply-chain/suppliers");
  };

  return (
    <div className="max-w-xl">

      <h1 className="text-2xl font-bold mb-6">
        Edit Supplier
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">

        <input
          name="code"
          value={supplier.code}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Supplier Code"
        />

        <input
          name="name"
          value={supplier.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Supplier Name"
        />

        <input
          name="contactName"
          value={supplier.contactName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Contact Name"
        />

        <input
          name="email"
          value={supplier.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Email"
        />

        <input
          name="phone"
          value={supplier.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Phone"
        />

        <input
          name="address"
          value={supplier.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Address"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Supplier
        </button>

      </form>

    </div>
  );
}