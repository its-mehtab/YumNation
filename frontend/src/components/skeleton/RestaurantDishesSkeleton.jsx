import React from "react";
import { Skeleton } from "@radix-ui/themes";

const RestaurantDishesSkeleton = () => (
  <div className="max-w-3xl mx-auto px-4 pb-20 bg-white">
    {/* Breadcrumb */}
    <div className="flex items-center gap-2 pb-4">
      <Skeleton width="40px" height="14px" className="rounded" />
      <Skeleton width="8px" height="14px" className="rounded" />
      <Skeleton width="55px" height="14px" className="rounded" />
      <Skeleton width="8px" height="14px" className="rounded" />
      <Skeleton width="100px" height="14px" className="rounded" />
    </div>

    {/* ── RestaurantHeader skeleton ── */}
    <section className="mb-7">
      {/* Title */}
      <Skeleton width="260px" height="34px" className="rounded-md mb-4" />

      {/* Info card */}
      <div className="border border-gray-100 rounded-2xl p-5 space-y-3">
        {/* Rating + cost row */}
        <div className="flex items-center gap-3">
          <Skeleton width="160px" height="18px" className="rounded" />
          <Skeleton width="90px" height="18px" className="rounded" />
        </div>

        {/* Cuisine tags */}
        <div className="flex items-center gap-2">
          <Skeleton width="60px" height="16px" className="rounded" />
          <Skeleton width="50px" height="16px" className="rounded" />
          <Skeleton width="70px" height="16px" className="rounded" />
        </div>

        {/* Outlet city */}
        <div className="flex items-center gap-2">
          <Skeleton width="8px" height="8px" className="rounded-full" />
          <Skeleton width="120px" height="16px" className="rounded" />
        </div>

        {/* Delivery time */}
        <div className="flex items-center gap-2">
          <Skeleton width="8px" height="8px" className="rounded-full" />
          <Skeleton width="90px" height="16px" className="rounded" />
        </div>
      </div>
    </section>

    {/* ── Deals / Offer banner skeleton ── */}
    <section className="mb-6">
      <Skeleton width="120px" height="20px" className="rounded mb-3" />
      <div className="flex gap-3 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            width="160px"
            height="80px"
            className="rounded-xl shrink-0"
          />
        ))}
      </div>
    </section>

    {/* ── Menu search skeleton ── */}
    <div className="mb-6">
      {/* Divider with MENU label */}
      <div className="flex items-center gap-3 mb-4">
        <span className="flex-1 h-px bg-gray-100" />
        <Skeleton width="60px" height="12px" className="rounded" />
        <span className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Search input */}
      <Skeleton width="100%" height="48px" className="rounded-xl mb-4" />

      {/* Veg / Non-veg filter pills */}
      <div className="flex gap-2 pb-5 border-b border-gray-100">
        <Skeleton width="70px" height="32px" className="rounded-full" />
        <Skeleton width="90px" height="32px" className="rounded-full" />
      </div>
    </div>

    {/* ── Top Picks / Swiper skeleton ── */}
    <section className="mb-6">
      <Skeleton width="120px" height="20px" className="rounded mb-3" />
      <div className="flex gap-3 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="shrink-0 w-[130px]">
            <Skeleton
              width="130px"
              height="110px"
              className="rounded-xl mb-2"
            />
            <Skeleton width="100px" height="14px" className="rounded mb-1" />
            <Skeleton width="60px" height="13px" className="rounded" />
          </div>
        ))}
      </div>
    </section>

    {/* ── Category tabs skeleton ── */}
    <div className="flex gap-1 overflow-hidden border-b border-gray-100 mb-5">
      {[...Array(5)].map((_, i) => (
        <Skeleton
          key={i}
          width="80px"
          height="36px"
          className="rounded-t-md shrink-0"
        />
      ))}
    </div>

    {/* ── Active category heading ── */}
    <div className="flex items-center justify-between mb-4">
      <Skeleton width="140px" height="22px" className="rounded" />
    </div>

    {/* ── Dish item rows ── */}
    <div className="divide-y divide-gray-100">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center justify-between py-5 gap-4">
          {/* Left: text info */}
          <div className="flex-1 space-y-2.5">
            {/* Veg/non-veg indicator */}
            <Skeleton width="16px" height="16px" className="rounded-sm" />
            {/* Dish name */}
            <Skeleton width="180px" height="18px" className="rounded" />
            {/* Price */}
            <Skeleton width="70px" height="16px" className="rounded" />
            {/* Short description */}
            <Skeleton width="240px" height="14px" className="rounded" />
            <Skeleton width="180px" height="14px" className="rounded" />
          </div>
          {/* Right: image + add button */}
          <div className="relative shrink-0">
            <Skeleton width="120px" height="100px" className="rounded-xl" />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
              <Skeleton width="80px" height="34px" className="rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RestaurantDishesSkeleton;
