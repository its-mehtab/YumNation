import React from "react";
import { Skeleton } from "@radix-ui/themes";

const AdminRestaurantDetailsSkeleton = () => (
  <div className="space-y-6">
    {/* Page Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Skeleton width="36px" height="36px" className="rounded-md" />
        <div className="space-y-1.5">
          <Skeleton width="220px" height="28px" className="rounded-md" />
          <Skeleton width="180px" height="14px" className="rounded-md" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Skeleton width="110px" height="38px" className="rounded-md" />
        <Skeleton width="90px" height="38px" className="rounded-md" />
      </div>
    </div>

    {/* Profile Card */}
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
      <Skeleton height="160px" className="w-full" />
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 -mt-16 mb-4">
          <Skeleton width="88px" height="88px" className="rounded-xl border-4 border-white shadow-md shrink-0" />
          <div className="flex items-center gap-3">
            <Skeleton width="100px" height="32px" className="rounded-md" />
            <Skeleton width="120px" height="32px" className="rounded-md" />
          </div>
        </div>
        <div className="space-y-2 mt-2">
          <Skeleton width="240px" height="24px" className="rounded-md" />
          <Skeleton width="450px" height="14px" className="rounded-md" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton width="36px" height="36px" className="rounded-lg shrink-0" />
              <div className="space-y-1.5">
                <Skeleton width="70px" height="12px" className="rounded-md" />
                <Skeleton width="120px" height="14px" className="rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white p-5 rounded-md border border-gray-200">
          <div className="flex items-center gap-4">
            <Skeleton width="48px" height="48px" className="rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton width="80px" height="14px" className="rounded-md" />
              <Skeleton width="60px" height="26px" className="rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Tabs and Tab Content */}
    <div className="space-y-4">
      <Skeleton width="280px" height="42px" className="rounded-md" />
      <div className="bg-white rounded-md border border-gray-200 p-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} height="44px" className="w-full rounded-md" />
        ))}
      </div>
    </div>
  </div>
);

export default AdminRestaurantDetailsSkeleton;
