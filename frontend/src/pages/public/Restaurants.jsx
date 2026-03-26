import React from "react";
import { Skeleton } from "@radix-ui/themes";
import Chip from "../../components/public/Chip";
import FilterBox from "../shop/FilterBox";
import RestaurantCard from "../../components/public/RestaurantCard";
import { FilterIcon } from "../../assets/icon/Icons";
import { useRestaurats } from "../../context/public/RestaurantsContext";
import DishCardSkeleton from "../../components/skeleton/DishCardSkeleton";

const Restaurants = () => {
  const { restaurants, loading } = useRestaurats();

  return (
    <section className="fade-up">
      <div className="flex justify-between gap-3 mb-4">
        {/* <Skeleton> */}
        <p className="text-sm text-gray-600 flex gap-1 items-center">
          FIlter <FilterIcon size="16" />
        </p>
        {/* </Skeleton> */}

        {/* <Skeleton> */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <label htmlFor="sort">Sort by :</label>

          <select
            className="border border-gray-200 rounded px-0.5 py-px"
            name="sort"
            id="sort"
            // onChange={(e) => {
            //   setFilters((prev) => {
            //     return {
            //       ...prev,
            //       sort: e.target.value,
            //     };
            //   });
            // }}
          >
            <option value="price_asc">Featured</option>
            <option value="latest">Latest</option>
            <option value="price_asc">Price, low to high</option>
            <option value="price_desc">Price, high to low</option>
            <option value="rating">Best selling</option>
          </select>
        </div>
        {/* </Skeleton> */}
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-5">
        {/* <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard /> */}
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <DishCardSkeleton />
              </div>
            ))
          : restaurants?.map((restaurant) => {
              return (
                <div key={restaurant._id}>
                  <RestaurantCard restaurant={restaurant} />
                </div>
              );
            })}
      </div>
      <div className="mt-8 flex justify-center">
        {/* <Stack spacing={2}> */}
        {/* <Skeleton loading={loading}>
                <Pagination
                  page={page}
                  onChange={handlePageChange}
                  count={dishes?.pages}
                  variant="outlined"
                  shape="rounded"
                />
              </Skeleton> */}
        {/* </Stack> */}
      </div>
    </section>
  );
};

export default Restaurants;
