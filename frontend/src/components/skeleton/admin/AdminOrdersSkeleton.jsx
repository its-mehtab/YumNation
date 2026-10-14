import React from "react";
import { Skeleton } from "@radix-ui/themes";

const AdminOrdersSkeleton = () => (
  <div className="space-y-6">
    {/* Header */}
    <div>
      <Skeleton width="140px" height="32px" className="rounded-md" />
      <div className="mt-2">
        <Skeleton width="260px" height="16px" className="rounded-md" />
      </div>
    </div>

    {/* 5 Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white p-5 rounded-md border border-gray-200">
          <div className="flex items-center gap-4">
            <Skeleton width="48px" height="48px" className="rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton width="80px" height="14px" className="rounded-md" />
              <Skeleton width="60px" height="26px" className="rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Table card */}
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Skeleton width="120px" height="24px" className="rounded-md" />
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Skeleton width="220px" height="38px" className="rounded-md" />
            <Skeleton width="130px" height="38px" className="rounded-md" />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} width="85px" height="34px" className="rounded-md shrink-0" />
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/50 text-gray-400">
            <tr>
              {["Order ID", "Customer", "Items", "Location", "Total", "Payment", "Order Status", "Action"].map((h) => (
                <th key={h} className="px-4 py-4 font-semibold uppercase tracking-wider text-xs first:pl-6">
                  <Skeleton width="60px" height="14px" className="rounded-md" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[...Array(6)].map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4"><Skeleton width="75px" height="22px" className="rounded-md" /></td>
                <td className="px-4 py-4">
                  <div className="space-y-1.5">
                    <Skeleton width="90px" height="14px" className="rounded-md" />
                    <Skeleton width="130px" height="12px" className="rounded-md" />
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <Skeleton width="110px" height="14px" className="rounded-md" />
                    <Skeleton width="50px" height="12px" className="rounded-md" />
                  </div>
                </td>
                <td className="px-4 py-4"><Skeleton width="80px" height="14px" className="rounded-md" /></td>
                <td className="px-4 py-4"><Skeleton width="60px" height="16px" className="rounded-md" /></td>
                <td className="px-4 py-4"><Skeleton width="65px" height="22px" className="rounded-md" /></td>
                <td className="px-4 py-4"><Skeleton width="110px" height="28px" className="rounded-md" /></td>
                <td className="px-4 py-4"><Skeleton width="28px" height="28px" className="rounded-md" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default AdminOrdersSkeleton;
