import { Card, Flex, Skeleton } from "@radix-ui/themes";

const ProductCardSkeleton = () => {
  return (
    <Card className="relative p-4 rounded-xl">
      <Flex direction="column" gap="3">
        <div className="absolute top-3 left-3">
          <Skeleton width="60px" height="20px" />
        </div>

        <div className="absolute top-8 right-8">
          <Skeleton width="20px" height="20px" />
        </div>

        <Skeleton height="140px" className="rounded-lg" />

        <Flex gap="2" mt="2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} width="16px" height="16px" />
          ))}
        </Flex>

        <Skeleton height="18px" width="80%" />

        <Flex justify="between" align="center" mt="2">
          <Skeleton height="20px" width="60px" />
          <Skeleton height="36px" width="36px" />
        </Flex>
      </Flex>
    </Card>
  );
};

export default ProductCardSkeleton;
