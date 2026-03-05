"use client";

export default function DataScienceTopbar() {

  return (

    <div className="w-full bg-white border-b px-6 py-3 flex justify-between items-center">

      <h1 className="text-lg font-semibold">
        Supply Chain Analytics
      </h1>

      <div className="flex items-center gap-4 text-sm text-gray-600">

        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
          Data Scientist
        </span>

        <span className="px-3 py-1 bg-gray-100 rounded-full">
          Analytics Environment
        </span>

      </div>

    </div>

  );

}