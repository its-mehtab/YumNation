import React from "react";
import { Skeleton } from "@radix-ui/themes";

const AdminCustomersSkeleton = () => (
  <div className="space-y-6">
    {/* Page Header */}
    <div>
      <Skeleton width="160px" height="32px" className="rounded-md" />
      <div className="mt-2">
        <Skeleton width="260px" height="16px" className="rounded-md" />
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white p-5 rounded-md border border-gray-200">
          <div className="flex items-center gap-4">
            <Skeleton width="48px" height="48px" className="rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton width="90px" height="14px" className="rounded-md" />
              <Skeleton width="60px" height="26px" className="rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Table card */}
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-5 border-b border-gray-200 gap-4">
        <Skeleton width="140px" height="24px" className="rounded-md" />
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Skeleton width="240px" height="38px" className="rounded-md" />
          <Skeleton width="130px" height="38px" className="rounded-md" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/50 text-gray-400">
            <tr>
              {["Customer", "Contact", "Orders", "Total Spent", "Last Order", "Joined", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-4 font-semibold uppercase tracking-wider text-xs first:pl-6">
                  <Skeleton width="60px" height="14px" className="rounded-md" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[...Array(6)].map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Skeleton width="40px" height="40px" className="rounded-full shrink-0" />
                    <div className="space-y-1.5">
                      <Skeleton width="110px" height="14px" className="rounded-md" />
                      <Skeleton width="140px" height="12px" className="rounded-md" />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4"><Skeleton width="100px" height="14px" className="rounded-md" /></td>
                <td className="px-4 py-4"><Skeleton width="40px" height="14px" className="rounded-md" /></td>
                <td className="px-4 py-4"><Skeleton width="65px" height="14px" className="rounded-md" /></td>
                <td className="px-4 py-4"><Skeleton width="85px" height="14px" className="rounded-md" /></td>
                <td className="px-4 py-4"><Skeleton width="85px" height="14px" className="rounded-md" /></td>
                <td className="px-4 py-4"><Skeleton width="70px" height="22px" className="rounded-md" /></td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Skeleton width="28px" height="28px" className="rounded-md" />
                    <Skeleton width="28px" height="28px" className="rounded-md" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default AdminCustomersSkeleton;
