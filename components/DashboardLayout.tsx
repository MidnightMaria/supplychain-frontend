import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 h-screen overflow-y-auto bg-gray-100">
        <Topbar />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}