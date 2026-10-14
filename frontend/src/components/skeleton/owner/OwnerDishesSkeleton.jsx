import React from "react";
import { Skeleton } from "@radix-ui/themes";

const OwnerDishesSkeleton = () => (
  <div className="space-y-6">
    {/* Page Header */}
    <div className="flex items-center justify-between">
      <Skeleton width="130px" height="30px" className="rounded-md" />
      <Skeleton width="180px" height="16px" className="rounded-md" />
    </div>

    {/* Table card */}
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Skeleton width="110px" height="22px" className="rounded-md" />
          <Skeleton width="28px" height="22px" className="rounded-md" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton width="140px" height="38px" className="rounded-md" />
          <Skeleton width="120px" height="38px" className="rounded-md" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/50 text-gray-400">
            <tr>
              {["Dish Name", "Category", "Price", "Status", "Action"].map((h) => (
                <th key={h} className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider first:px-6">
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
                    <Skeleton width="40px" height="40px" className="rounded-md shrink-0" />
                    <Skeleton width="140px" height="16px" className="rounded-md" />
                  </div>
                </td>
                <td className="px-4 py-4"><Skeleton width="90px" height="14px" className="rounded-md" /></td>
                <td className="px-4 py-4"><Skeleton width="50px" height="16px" className="rounded-md" /></td>
                <td className="px-4 py-4"><Skeleton width="75px" height="24px" className="rounded-md" /></td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Skeleton width="28px" height="28px" className="rounded-md" />
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

export default OwnerDishesSkeleton;
