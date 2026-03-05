"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/retail" },
  { name: "Warehouses", href: "/retail/warehouses" },
  { name: "Stock", href: "/retail/stock" },
  { name: "Products", href: "/retail/products" },
  { name: "Customers", href: "/retail/customers" },
  { name: "Orders", href: "/retail/orders" },
];


export default function RetailSidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-neutral-900 text-white flex flex-col">

      <div className="p-6 text-2xl font-bold border-b border-neutral-700 flex items-center gap-2">
        <span>🥕</span>
        <span>Carat Retail</span>
      </div>

      <nav className="flex-1 p-4 space-y-2">

        {menu.map((item) => {

          const active =
            item.href === "/retail"
              ? pathname === "/retail"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block rounded-lg px-4 py-2 transition ${
                active
                  ? "bg-orange-600/90 text-white"
                  : "hover:bg-neutral-800 text-gray-300"
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