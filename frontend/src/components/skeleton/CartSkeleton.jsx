import { Skeleton } from "@radix-ui/themes";

const CartSkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <Skeleton height="20px" width="40%" />
      <Skeleton height="14px" width="80%" className="mt-2" />
      <Skeleton height="36px" width="120px" className="mt-3" />

      <div className="border-t border-gray-100 my-4" />

      <Skeleton height="18px" width="30%" />

      <div className="flex items-center gap-3 mt-4">
        <Skeleton width="70px" height="70px" className="rounded-md" />

        <div className="flex-1">
          <Skeleton height="16px" width="60%" />
          <Skeleton height="14px" width="40%" className="mt-2" />
          <Skeleton height="12px" width="30%" className="mt-2" />
        </div>

        <div className="flex flex-col items-end gap-2">
          <Skeleton height="16px" width="60px" />
          <Skeleton height="30px" width="70px" className="rounded-md" />
        </div>
      </div>

      <div className="border-t border-gray-100 my-4" />

      <Skeleton height="14px" width="50%" />
      <Skeleton height="20px" width="70%" className="mt-3" />

      <Skeleton height="42px" className="mt-4 rounded-md" />
    </div>
  );
};

export default CartSkeleton;
