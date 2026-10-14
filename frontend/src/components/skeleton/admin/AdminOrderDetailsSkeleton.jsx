import React from "react";
import { Skeleton } from "@radix-ui/themes";

const AdminOrderDetailsSkeleton = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Skeleton width="36px" height="36px" className="rounded-md" />
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <Skeleton width="160px" height="28px" className="rounded-md" />
            <Skeleton width="80px" height="24px" className="rounded-md" />
          </div>
          <Skeleton width="180px" height="14px" className="rounded-md" />
        </div>
      </div>
      <Skeleton width="120px" height="38px" className="rounded-md" />
    </div>

    {/* 2 Column Layout */}
    <div className="grid grid-cols-12 gap-6">
      {/* Left Column (8) */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        {/* Timeline card */}
        <div className="bg-white rounded-md border border-gray-200 p-6 space-y-4">
          <Skeleton width="130px" height="18px" className="rounded-md" />
          <div className="flex justify-between py-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton width="36px" height="36px" className="rounded-full" />
                <Skeleton width="60px" height="12px" className="rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Items Card */}
        <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <Skeleton width="120px" height="18px" className="rounded-md" />
            <Skeleton width="50px" height="16px" className="rounded-md" />
          </div>
          <div className="divide-y divide-gray-100 p-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton width="52px" height="52px" className="rounded-md shrink-0" />
                  <div className="space-y-1.5">
                    <Skeleton width="140px" height="16px" className="rounded-md" />
                    <Skeleton width="80px" height="12px" className="rounded-md" />
                  </div>
                </div>
                <div className="space-y-1.5 text-right">
                  <Skeleton width="60px" height="16px" className="rounded-md" />
                  <Skeleton width="40px" height="12px" className="rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-md border border-gray-200 p-6 space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex justify-between items-center py-1">
              <Skeleton width="100px" height="14px" className="rounded-md" />
              <Skeleton width="60px" height="14px" className="rounded-md" />
            </div>
          ))}
          <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
            <Skeleton width="90px" height="20px" className="rounded-md" />
            <Skeleton width="80px" height="24px" className="rounded-md" />
          </div>
        </div>
      </div>

      {/* Right Column (4) */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-md border border-gray-200 p-6 space-y-4">
            <Skeleton width="130px" height="18px" className="rounded-md" />
            <div className="space-y-2.5">
              <Skeleton width="160px" height="14px" className="rounded-md" />
              <Skeleton width="200px" height="12px" className="rounded-md" />
              <Skeleton width="140px" height="12px" className="rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AdminOrderDetailsSkeleton;
