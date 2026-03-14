import { Skeleton } from "@radix-ui/themes";

const DishDetailsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6">
      {/* LEFT SECTION */}
      <div className="flex gap-4">
        {/* Thumbnails */}
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              width="70px"
              height="70px"
              className="rounded-md"
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1">
          <Skeleton height="350px" className="rounded-lg" />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div>
        {/* Title */}
        <Skeleton height="28px" width="60%" />

        {/* Rating */}
        <div className="flex gap-2 mt-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} width="18px" height="18px" />
          ))}
          <Skeleton width="120px" height="18px" />
        </div>

        {/* Description */}
        <Skeleton height="16px" width="90%" className="mt-4" />
        <Skeleton height="16px" width="75%" className="mt-2" />

        {/* Price */}
        <Skeleton height="28px" width="120px" className="mt-6" />

        {/* Variant Buttons */}
        <div className="flex gap-3 mt-6">
          <Skeleton width="100px" height="36px" className="rounded-md" />
          <Skeleton width="100px" height="36px" className="rounded-md" />
        </div>

        {/* Quantity + Add to Cart */}
        <div className="flex items-center gap-4 mt-6">
          <Skeleton width="120px" height="36px" className="rounded-md" />
          <Skeleton width="140px" height="40px" className="rounded-md" />
          <Skeleton width="40px" height="40px" className="rounded-md" />
        </div>

        {/* Meta Info */}
        <div className="mt-8 space-y-3">
          <Skeleton width="150px" height="14px" />
          <Skeleton width="200px" height="14px" />
          <Skeleton width="180px" height="14px" />
        </div>
      </div>
    </div>
  );
};

export default DishDetailsSkeleton;
