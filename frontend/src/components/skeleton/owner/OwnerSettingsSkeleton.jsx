import React from "react";
import { Skeleton } from "@radix-ui/themes";

const OwnerSettingsSkeleton = () => (
  <div className="space-y-6">
    {/* Page Header */}
    <div className="flex items-center justify-between">
      <div>
        <Skeleton width="180px" height="30px" className="rounded-md" />
        <div className="mt-2">
          <Skeleton width="260px" height="14px" className="rounded-md" />
        </div>
      </div>
      <Skeleton width="140px" height="42px" className="rounded-md" />
    </div>

    {/* Tab Nav */}
    <div className="flex gap-2 overflow-x-auto pb-1">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} width="110px" height="38px" className="rounded-md shrink-0" />
      ))}
    </div>

    {/* Section Card */}
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 space-y-1">
        <Skeleton width="160px" height="18px" className="rounded-md" />
        <Skeleton width="280px" height="12px" className="rounded-md" />
      </div>
      <div className="p-6 space-y-5">
        <div className="flex items-center gap-6">
          <Skeleton width="88px" height="88px" className="rounded-full shrink-0" />
          <div className="space-y-2">
            <Skeleton width="120px" height="36px" className="rounded-md" />
            <Skeleton width="180px" height="12px" className="rounded-md" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton width="100px" height="14px" className="rounded-md" />
          <Skeleton height="140px" className="w-full rounded-md" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton width="90px" height="14px" className="rounded-md" />
              <Skeleton height="40px" className="w-full rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default OwnerSettingsSkeleton;
