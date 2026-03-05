"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Supplier {
  code: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
}

export default function EditSupplierPage() {

  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [supplier, setSupplier] = useState<Supplier>({
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
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    await fetch(`http://localhost:8083/api/suppliers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(supplier)
    });

    router.push("/supply-chain/suppliers");
  };

  return (
    <div className="max-w-xl">

      <h1 className="text-2xl font-bold mb-6">
        Edit Supplier
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >

        <input
          name="code"
          value={supplier.code}
          onChange={handleChange}
          placeholder="Supplier Code"
          className="w-full border p-2 rounded"
        />

        <input
          name="name"
          value={supplier.name}
          onChange={handleChange}
          placeholder="Supplier Name"
          className="w-full border p-2 rounded"
        />

        <input
          name="contactName"
          value={supplier.contactName}
          onChange={handleChange}
          placeholder="Contact Name"
          className="w-full border p-2 rounded"
        />

        <input
          name="email"
          value={supplier.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />

        <input
          name="phone"
          value={supplier.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border p-2 rounded"
        />

        <input
          name="address"
          value={supplier.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border p-2 rounded"
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