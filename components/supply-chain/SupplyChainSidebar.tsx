"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/supply-chain" },
  { name: "Suppliers", href: "/supply-chain/suppliers" },
  { name: "Purchase Orders", href: "/supply-chain/purchase-orders" },
];

export default function SupplyChainSidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-neutral-900 text-white flex flex-col">

      <div className="p-6 text-2xl font-bold border-b border-neutral-700 flex items-center gap-2">
        <span>Supply Chain</span>
      </div>

      <nav className="flex-1 p-4 space-y-2">

        {menu.map((item) => {

          const active =
            item.href === "/supply-chain"
              ? pathname === "/supply-chain"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block rounded-lg px-4 py-2 transition ${
                active
                  ? "bg-green-600 text-white"
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