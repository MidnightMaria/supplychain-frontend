import DataScienceSidebar from "@/components/data-science/DataScienceSidebar";
import DataScienceTopbar from "@/components/data-science/DataScienceTopbar";
import React from "react";

interface DataScienceLayoutProps {
  children: React.ReactNode;
}

export default function DataScienceLayout({ children }: DataScienceLayoutProps) {

  return (

    <div className="flex min-h-screen bg-gray-100">

      <DataScienceSidebar />

      <div className="flex-1 flex flex-col">

        <DataScienceTopbar />

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>

  );

}