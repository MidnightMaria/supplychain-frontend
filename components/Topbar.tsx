"use client";

import { usePathname } from "next/navigation";

export default function Topbar() {
  const pathname = usePathname();

  function getTitle() {
    if (pathname.startsWith("/products")) return "Products";
    if (pathname.startsWith("/warehouses")) return "Warehouses";
    if (pathname.startsWith("/inventory/transfer")) return "Transfer Stock";
    if (pathname.startsWith("/inventory/adjust")) return "Adjust Stock";
    if (pathname.startsWith("/inventory/movements")) return "Inventory Movements";
    if (pathname.startsWith("/inventory")) return "Inventory";
    if (pathname.startsWith("/dashboard")) return "Dashboard";
    return "Supply Chain System";
  }

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-800">
        {getTitle()}
      </h1>

      <div className="text-sm text-gray-500">
        Welcome, Admin
      </div>
    </div>
  );
}