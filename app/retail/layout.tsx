import RetailSidebar from "@/components/retail/RetailSidebar";
import RetailTopbar from "@/components/retail/RetailTopbar";

export default function RetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">

      <RetailSidebar />

      <div className="flex-1 h-screen overflow-y-auto bg-amber-50">
        <RetailTopbar />

        <main className="p-6">{children}</main>
      </div>

    </div>
  );
}