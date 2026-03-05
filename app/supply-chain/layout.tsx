import SupplyChainSidebar from "@/components/supply-chain/SupplyChainSidebar";

export default function SupplyChainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">

      <SupplyChainSidebar />

      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        {children}
      </main>

    </div>
  );
}