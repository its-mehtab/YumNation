import { Skeleton } from "@radix-ui/themes";
import React from "react";

const CategorySkeleton = () => {
  return (
    <div className="border border-gray-300 rounded-xl p-6">
      <Skeleton height="60px" width="60px" style={{ borderRadius: "50%" }} />
      <Skeleton height="20px" width="80%" style={{ marginTop: 16 }} />
    </div>
  );
};

export default CategorySkeleton;
