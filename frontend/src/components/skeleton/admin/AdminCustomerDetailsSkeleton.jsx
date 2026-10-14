import React from "react";
import { Skeleton } from "@radix-ui/themes";

const AdminCustomerDetailsSkeleton = () => (
  <div className="space-y-6">
    {/* Page Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Skeleton width="36px" height="36px" className="rounded-md" />
        <div className="space-y-1.5">
          <Skeleton width="180px" height="28px" className="rounded-md" />
          <Skeleton width="220px" height="14px" className="rounded-md" />
        </div>
      </div>
    </div>

    {/* Customer Profile Card */}
    <div className="bg-white rounded-md border border-gray-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        <Skeleton width="80px" height="80px" className="rounded-md shrink-0" />
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Skeleton width="160px" height="24px" className="rounded-md" />
            <Skeleton width="70px" height="22px" className="rounded-md" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton width="140px" height="14px" className="rounded-md" />
            <Skeleton width="120px" height="14px" className="rounded-md" />
          </div>
        </div>
      </div>
      <Skeleton width="140px" height="42px" className="rounded-md" />
    </div>

    {/* 5 Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white p-5 rounded-md border border-gray-200">
          <div className="flex items-center gap-4">
            <Skeleton width="48px" height="48px" className="rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton width="80px" height="12px" className="rounded-md" />
              <Skeleton width="55px" height="24px" className="rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* 2 Column Details */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-4 space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-md border border-gray-200 p-6 space-y-4">
            <Skeleton width="140px" height="18px" className="rounded-md" />
            <div className="space-y-3">
              {[...Array(3)].map((_, j) => (
                <Skeleton key={j} height="16px" className="w-full rounded-md" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-8 bg-white rounded-md border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <Skeleton width="130px" height="20px" className="rounded-md" />
        </div>
        <div className="p-4 space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} height="48px" className="w-full rounded-md" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AdminCustomerDetailsSkeleton;
