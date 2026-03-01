import { Skeleton } from "@radix-ui/themes";
import React from "react";

const AddressSkeleton = () => {
  return (
    <div className="mt-4">
      <Skeleton height="20px" width="50%" />
      <Skeleton height="14px" width="80%" style={{ marginTop: 10 }} />
      <Skeleton height="14px" width="80%" style={{ marginTop: 10 }} />
      <Skeleton height="36px" width="120px" style={{ marginTop: 16 }} />
    </div>
  );
};

export default AddressSkeleton;
