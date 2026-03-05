"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCustomer } from "@/lib/retailApi";

export default function AddCustomerPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await createCustomer(form);
      router.push("/retail/customers");
    } catch (err) {
      console.error("Failed to create customer", err);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-orange-600">
        Add Customer
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <Input label="Name" name="name" onChange={handleChange} required />
        <Input label="Email" name="email" onChange={handleChange} required />
        <Input label="Phone" name="phone" onChange={handleChange} />
        <Input label="Address" name="address" onChange={handleChange} />
        <Input label="City" name="city" onChange={handleChange} />
        <Input label="Country" name="country" onChange={handleChange} />

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  name,
  onChange,
  required,
}: {
  label: string;
  name: string;
  onChange: any;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        name={name}
        onChange={onChange}
        required={required}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
}