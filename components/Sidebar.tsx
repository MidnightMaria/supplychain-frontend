"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/inventory/dashboard" },
  { name: "Products", href: "/inventory/products" },
  { name: "Warehouses", href: "/inventory/warehouses" },
  { name: "Inventory", href: "/inventory" },
  { name: "Movements", href: "/inventory/movements" },
  { name: "Transfer", href: "/inventory/transfer" },
  { name: "Adjust", href: "/inventory/adjust" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700 flex items-center gap-2">
        <span>IMS</span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block rounded-lg px-4 py-2 transition ${
                active
                  ? "bg-blue-600"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}