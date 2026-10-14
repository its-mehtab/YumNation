import React from "react";
import { Skeleton } from "@radix-ui/themes";

const AdminDishDetailsSkeleton = () => (
  <div className="space-y-6">
    {/* Page Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Skeleton width="36px" height="36px" className="rounded-md" />
        <div className="space-y-1.5">
          <Skeleton width="200px" height="28px" className="rounded-md" />
          <Skeleton width="240px" height="14px" className="rounded-md" />
        </div>
      </div>
    </div>

    {/* 2 Column Layout */}
    <div className="grid grid-cols-12 gap-5">
      {/* Left Column (4) */}
      <div className="col-span-12 lg:col-span-4 space-y-5">
        <div className="bg-white rounded-md border border-gray-200 p-5">
          <Skeleton height="260px" className="w-full rounded-md" />
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} height="70px" className="rounded-md" />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-md border border-gray-200 p-5 space-y-4">
          <Skeleton width="140px" height="16px" className="rounded-md" />
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-1">
                <Skeleton width="90px" height="14px" className="rounded-md" />
                <Skeleton width="50px" height="22px" className="rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column (8) */}
      <div className="col-span-12 lg:col-span-8 space-y-5">
        <div className="bg-white rounded-md border border-gray-200 p-6 space-y-6">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2 flex-1">
              <Skeleton width="220px" height="26px" className="rounded-md" />
              <Skeleton width="90%" height="16px" className="rounded-md" />
              <Skeleton width="75%" height="16px" className="rounded-md" />
            </div>
            <div className="space-y-1.5 text-right">
              <Skeleton width="80px" height="28px" className="rounded-md" />
              <Skeleton width="60px" height="22px" className="rounded-md" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-1.5">
                <Skeleton width="70px" height="12px" className="rounded-md" />
                <Skeleton width="100px" height="16px" className="rounded-md" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white rounded-md border border-gray-200 p-5 space-y-4">
              <Skeleton width="100px" height="16px" className="rounded-md" />
              <div className="space-y-2.5">
                {[...Array(3)].map((_, j) => (
                  <Skeleton key={j} height="36px" className="w-full rounded-md" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AdminDishDetailsSkeleton;
