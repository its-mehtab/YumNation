import React from "react";
import { Skeleton } from "@radix-ui/themes";

const OwnerDashboardSkeleton = () => (
  <div className="space-y-6">
    {/* Page header */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <Skeleton width="240px" height="32px" className="rounded-md" />
        <div className="mt-2">
          <Skeleton width="280px" height="16px" className="rounded-md" />
        </div>
      </div>
      <Skeleton width="180px" height="40px" className="rounded-lg" />
    </div>

    {/* Metric Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white p-5 rounded-md border border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex gap-4 items-center">
              <Skeleton width="48px" height="48px" className="rounded-lg shrink-0" />
              <div className="space-y-2">
                <Skeleton width="90px" height="14px" className="rounded-md" />
                <Skeleton width="60px" height="28px" className="rounded-md" />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end mt-4 pt-3 border-t border-gray-50">
            <Skeleton width="80px" height="16px" className="rounded-md" />
            <Skeleton width="80px" height="32px" className="rounded-md" />
          </div>
        </div>
      ))}
    </div>

    {/* Middle Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-md border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Skeleton width="28px" height="28px" className="rounded-md" />
            <div className="space-y-1.5">
              <Skeleton width="130px" height="18px" className="rounded-md" />
              <Skeleton width="200px" height="12px" className="rounded-md" />
            </div>
          </div>
          <Skeleton width="100px" height="32px" className="rounded-md" />
        </div>
        <Skeleton height="260px" className="w-full rounded-md" />
      </div>

      <div className="lg:col-span-1 bg-white rounded-md border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-8">
          <Skeleton width="28px" height="28px" className="rounded-md" />
          <div className="space-y-1.5">
            <Skeleton width="110px" height="18px" className="rounded-md" />
            <Skeleton width="140px" height="12px" className="rounded-md" />
          </div>
        </div>
        <div className="flex justify-center items-center py-4">
          <Skeleton width="180px" height="180px" className="rounded-full" />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} height="20px" className="rounded-md" />
          ))}
        </div>
      </div>
    </div>

    {/* Bottom Tables */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-md border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Skeleton width="28px" height="28px" className="rounded-md" />
            <div className="space-y-1.5">
              <Skeleton width="120px" height="18px" className="rounded-md" />
              <Skeleton width="180px" height="12px" className="rounded-md" />
            </div>
          </div>
          <Skeleton width="80px" height="20px" className="rounded-md" />
        </div>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} height="48px" className="w-full rounded-md" />
          ))}
        </div>
      </div>

      <div className="lg:col-span-1 bg-white rounded-md border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Skeleton width="28px" height="28px" className="rounded-md" />
            <div className="space-y-1.5">
              <Skeleton width="130px" height="18px" className="rounded-md" />
              <Skeleton width="150px" height="12px" className="rounded-md" />
            </div>
          </div>
          <Skeleton width="80px" height="20px" className="rounded-md" />
        </div>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-2">
              <div className="flex items-center gap-3">
                <Skeleton width="36px" height="36px" className="rounded-md shrink-0" />
                <div className="space-y-1.5">
                  <Skeleton width="100px" height="14px" className="rounded-md" />
                  <Skeleton width="60px" height="12px" className="rounded-md" />
                </div>
              </div>
              <Skeleton width="45px" height="16px" className="rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default OwnerDashboardSkeleton;
