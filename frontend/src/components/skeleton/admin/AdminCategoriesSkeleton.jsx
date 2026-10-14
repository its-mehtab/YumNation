import React from "react";
import { Skeleton } from "@radix-ui/themes";

const AdminCategoriesSkeleton = () => (
  <div className="space-y-6">
    {/* Page Header */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <Skeleton width="180px" height="32px" className="rounded-md" />
        <div className="mt-2">
          <Skeleton width="280px" height="16px" className="rounded-md" />
        </div>
      </div>
      <Skeleton width="150px" height="42px" className="rounded-md" />
    </div>

    {/* Table card */}
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-5 border-b border-gray-200 gap-4">
        <Skeleton width="140px" height="24px" className="rounded-md" />
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Skeleton width="220px" height="38px" className="rounded-md" />
          <Skeleton width="120px" height="38px" className="rounded-md" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/50 text-gray-400">
            <tr>
              {[
                "#",
                "Category Name",
                "Slug",
                "Dishes",
                "Created",
                "Status",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-4 font-semibold uppercase tracking-wider text-xs first:pl-6"
                >
                  <Skeleton width="50px" height="14px" className="rounded-md" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[...Array(6)].map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <Skeleton width="20px" height="16px" className="rounded-md" />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Skeleton
                      width="40px"
                      height="40px"
                      className="rounded-md shrink-0"
                    />
                    <Skeleton
                      width="120px"
                      height="16px"
                      className="rounded-md"
                    />
                  </div>
                </td>
                <td className="px-4 py-4">
                  <Skeleton width="80px" height="22px" className="rounded-md" />
                </td>
                <td className="px-4 py-4">
                  <Skeleton width="60px" height="14px" className="rounded-md" />
                </td>
                <td className="px-4 py-4">
                  <Skeleton width="90px" height="14px" className="rounded-md" />
                </td>
                <td className="px-4 py-4">
                  <Skeleton width="70px" height="24px" className="rounded-md" />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Skeleton
                      width="28px"
                      height="28px"
                      className="rounded-md"
                    />
                    <Skeleton
                      width="28px"
                      height="28px"
                      className="rounded-md"
                    />
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

export default AdminCategoriesSkeleton;
