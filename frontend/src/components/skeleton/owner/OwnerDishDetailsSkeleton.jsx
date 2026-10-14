import React from "react";
import { Skeleton } from "@radix-ui/themes";

const OwnerDishDetailsSkeleton = () => (
  <div className="space-y-6">
    {/* Page Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton width="36px" height="36px" className="rounded-md" />
        <Skeleton width="160px" height="28px" className="rounded-md" />
      </div>
      <Skeleton width="200px" height="16px" className="rounded-md" />
    </div>

    {/* 2 Column Layout */}
    <div className="grid grid-cols-12 gap-5">
      {/* Left Column (4) */}
      <div className="col-span-12 lg:col-span-4 space-y-5">
        <div className="bg-white rounded-md border border-gray-200 p-4">
          <Skeleton height="280px" className="w-full rounded-md" />
        </div>

        <div className="bg-white rounded-md border border-gray-200 p-5 space-y-4">
          <Skeleton width="120px" height="16px" className="rounded-md" />
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-1">
                <div className="space-y-1">
                  <Skeleton width="80px" height="14px" className="rounded-md" />
                  <Skeleton width="120px" height="12px" className="rounded-md" />
                </div>
                <Skeleton width="40px" height="20px" className="rounded-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Skeleton height="40px" className="flex-1 rounded-md" />
          <Skeleton height="40px" className="flex-1 rounded-md" />
        </div>
      </div>

      {/* Right Column (8) */}
      <div className="col-span-12 lg:col-span-8 space-y-5">
        <div className="bg-white rounded-md border border-gray-200 p-6 space-y-5">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2 flex-1">
              <Skeleton width="200px" height="26px" className="rounded-md" />
              <Skeleton width="90%" height="16px" className="rounded-md" />
              <Skeleton width="75%" height="16px" className="rounded-md" />
            </div>
            <div className="space-y-1 text-right">
              <Skeleton width="70px" height="28px" className="rounded-md" />
              <Skeleton width="60px" height="14px" className="rounded-md" />
            </div>
          </div>

          <div className="flex gap-8 pt-4 border-t border-gray-100">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-1 text-center">
                <Skeleton width="40px" height="24px" className="rounded-md mx-auto" />
                <Skeleton width="65px" height="12px" className="rounded-md" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white rounded-md border border-gray-200 p-5 space-y-4">
              <Skeleton width="90px" height="16px" className="rounded-md" />
              <div className="space-y-2">
                {[...Array(3)].map((_, j) => (
                  <Skeleton key={j} height="38px" className="w-full rounded-md" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default OwnerDishDetailsSkeleton;
