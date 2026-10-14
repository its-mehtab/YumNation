import React from "react";
import { Skeleton } from "@radix-ui/themes";

const OwnerDishFormSkeleton = () => (
  <div className="space-y-6">
    {/* Page Header */}
    <div className="flex items-center justify-between">
      <Skeleton width="160px" height="30px" className="rounded-md" />
      <Skeleton width="220px" height="16px" className="rounded-md" />
    </div>

    {/* Form Layout */}
    <div className="grid grid-cols-12 gap-6">
      {/* Left Column (4) */}
      <div className="col-span-12 lg:col-span-4 space-y-5">
        <div className="bg-white rounded-md border border-gray-200 p-5 space-y-3">
          <Skeleton width="110px" height="16px" className="rounded-md" />
          <Skeleton height="220px" className="w-full rounded-md" />
          <Skeleton width="100%" height="12px" className="rounded-md" />
        </div>

        <div className="bg-white rounded-md border border-gray-200 p-5 space-y-4">
          <Skeleton width="120px" height="16px" className="rounded-md" />
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex justify-between items-center py-1">
                <div className="space-y-1">
                  <Skeleton width="80px" height="14px" className="rounded-md" />
                  <Skeleton width="130px" height="12px" className="rounded-md" />
                </div>
                <Skeleton width="40px" height="20px" className="rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column (8) */}
      <div className="col-span-12 lg:col-span-8 space-y-5">
        <div className="bg-white rounded-md border border-gray-200 p-6 space-y-4">
          <Skeleton width="140px" height="18px" className="rounded-md" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Skeleton width="80px" height="14px" className="rounded-md" />
              <Skeleton height="40px" className="w-full rounded-md" />
            </div>
            <div className="space-y-1.5">
              <Skeleton width="70px" height="14px" className="rounded-md" />
              <Skeleton height="40px" className="w-full rounded-md" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Skeleton width="90px" height="14px" className="rounded-md" />
            <Skeleton height="90px" className="w-full rounded-md" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Skeleton width="80px" height="14px" className="rounded-md" />
              <Skeleton height="40px" className="w-full rounded-md" />
            </div>
            <div className="space-y-1.5">
              <Skeleton width="80px" height="14px" className="rounded-md" />
              <Skeleton height="40px" className="w-full rounded-md" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md border border-gray-200 p-6 space-y-4">
          <Skeleton width="130px" height="18px" className="rounded-md" />
          <div className="flex gap-3">
            <Skeleton height="40px" className="flex-1 rounded-md" />
            <Skeleton height="40px" className="flex-1 rounded-md" />
            <Skeleton width="90px" height="40px" className="rounded-md" />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Skeleton width="100px" height="42px" className="rounded-md" />
          <Skeleton width="130px" height="42px" className="rounded-md" />
        </div>
      </div>
    </div>
  </div>
);

export default OwnerDishFormSkeleton;
