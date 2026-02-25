import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../../components/product-card/ProductCard";
import { useProduct } from "../../context/ProductContext";
import FilterBox from "./FilterBox";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Shop = () => {
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const { serverURL } = useAuth();
  const { products, setProducts } = useProduct();

  const [filters, setFilters] = useState({
    category: searchParams.get("category")?.split(",") || [],
    sort: searchParams.get("sort") || "",
    minPrice: searchParams.get("minPrice") || null,
    maxPrice: searchParams.get("maxPrice") || null,
    availability: searchParams.get("availability")?.split(",") || [],
    page: 1,
  });

  const handlePageChange = async (event, value) => {
    setPage(value);

    setFilters((prev) => {
      return { ...prev, page: value };
    });
  };

  const fetchProducts = async () => {
    try {
      const params = {
        ...filters,
        category: filters.category.join(","),
        availability: filters.availability.join(","),
      };

      const { data } = await axios.get(`${serverURL}/api/products`, {
        params,
      });

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const params = {};

    if (filters.category.length) params.category = filters.category.join(",");
    if (filters.sort) params.sort = filters.sort;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.availability.length)
      params.availability = filters.availability.join(",");
    if (filters.page) params.page = filters.page;

    setSearchParams(params);
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <>
      <section>
        <div className="grid lg:grid-cols-9 sm:grid-cols-10 gap-6">
          <div className="lg:col-span-3 sm:col-span-4">
            <FilterBox filters={filters} setFilters={setFilters} />
          </div>
          <div className="lg:col-span-6 sm:col-span-6">
            <div className="flex justify-between gap-3 mb-4">
              <div className="text-sm text-gray-600">
                Showing {products?.products.length} of {products?.total}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <label htmlFor="sort">Sort by :</label>

                <select
                  className="border border-gray-200 rounded px-0.5 py-px"
                  name="sort"
                  id="sort"
                  onChange={(e) => {
                    setFilters((prev) => {
                      return {
                        ...prev,
                        sort: e.target.value,
                      };
                    });
                  }}
                >
                  {/* <option value="price_asc">Featured</option> */}
                  <option value="latest">Latest</option>
                  <option value="price_asc">Price, low to high</option>
                  <option value="price_desc">Price, high to low</option>
                  <option value="rating">Best selling</option>
                </select>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 sm:grid-cols-2 gap-5">
              {products?.products?.map((currProduct) => {
                return (
                  <div key={currProduct._id}>
                    <ProductCard currProduct={currProduct} />
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex justify-center">
              {/* {console.log(products)} */}
              <Stack spacing={2}>
                <Pagination
                  page={page}
                  onChange={handlePageChange}
                  count={products?.pages}
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
