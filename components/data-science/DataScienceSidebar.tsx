"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/data-science" },
  { name: "Inventory Optimization", href: "/data-science/inventory-optimization" },
  { name: "Demand Forecast", href: "/data-science/forecast" },
  { name: "EDA", href: "/data-science/eda" },
  { name: "Model Evaluation", href: "/data-science/model-evaluation" },
];

export default function DataScienceSidebar() {

  const pathname = usePathname();

  return (

    <div className="w-64 min-h-screen bg-neutral-950 text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 text-xl font-bold border-b border-neutral-800 flex items-center gap-2">

        <span className="text-pink-400 text-2xl">
          📊
        </span>

        <span>
          Data Science
        </span>

      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">

        {menu.map((item) => {

          const active =
            item.href === "/data-science"
              ? pathname === "/data-science"
              : pathname.startsWith(item.href);

          return (

            <Link
              key={item.name}
              href={item.href}
              className={`block rounded-lg px-4 py-2 transition ${
                active
                  ? "bg-pink-600 text-white"
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