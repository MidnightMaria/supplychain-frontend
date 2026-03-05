"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSupplierPage() {

  const router = useRouter();

  const [supplier, setSupplier] = useState({
    code: "",
    name: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupplier({
      ...supplier,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("http://localhost:8083/api/suppliers", {
      method: "POST",
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
        Add Supplier
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">

        <input
          name="code"
          placeholder="Supplier Code"
          value={supplier.code}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="name"
          placeholder="Supplier Name"
          value={supplier.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="contactName"
          placeholder="Contact Name"
          value={supplier.contactName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="email"
          placeholder="Email"
          value={supplier.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={supplier.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="address"
          placeholder="Address"
          value={supplier.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Supplier
        </button>

      </form>

    </div>
  );
}