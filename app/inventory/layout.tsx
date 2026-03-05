import DashboardLayout from "@/components/DashboardLayout";

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}