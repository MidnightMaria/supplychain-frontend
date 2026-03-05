"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { updateCustomer, getCustomers } from "@/lib/retailApi";

export default function EditCustomerPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  async function loadCustomer() {
    try {
      const customers = await getCustomers();
      const customer = customers.find((c: any) => c.id === id);
      if (customer) setForm(customer);
    } catch (err) {
      console.error("Failed to load customer", err);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await updateCustomer(id, form);
      router.push("/retail/customers");
    } catch (err) {
      console.error("Failed to update customer", err);
    }
  }

  useEffect(() => {
    loadCustomer();
  }, []);

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-orange-600">
        Edit Customer
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
        <Input label="Email" name="email" value={form.email} onChange={handleChange} required />
        <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <Input label="Address" name="address" value={form.address} onChange={handleChange} />
        <Input label="City" name="city" value={form.city} onChange={handleChange} />
        <Input label="Country" name="country" value={form.country} onChange={handleChange} />

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: any;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
}