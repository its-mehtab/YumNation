import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../../components/product-card/ProductCard";
import { useProduct } from "../../context/ProductContext";
import FilterBox from "./FilterBox";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialState = {
    category: searchParams.get("category")?.split(",") || [],
    sort: searchParams.get("sort") || "",
    minPrice: searchParams.get("minPrice") || null,
    maxPrice: searchParams.get("maxPrice") || null,
    availability: searchParams.get("availability")?.split(",") || [],
    page: 1,
  };

  const [filters, setFilters] = useState(initialState);

  const { serverURL } = useAuth();
  const { products, setProducts } = useProduct();

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
      <section className="py-28 mt-5">
        <div className="mx-auto max-w-335 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-7 sm:grid-cols-10 gap-6">
            <div className="lg:col-span-2 sm:col-span-4">
              <FilterBox
                filters={filters}
                setFilters={setFilters}
                initialState={initialState}
              />
            </div>
            <div className="lg:col-span-5 sm:col-span-6">
              <div className="flex justify-between gap-3">
                <div>
                  Showing {products?.products.length} of {products?.total}
                </div>
                <div className="flex gap-2">
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
              <div className="grid lg:grid-cols-3 sm:grid-cols-2">
                {products?.products?.map((currProduct) => {
                  return (
                    <div key={currProduct._id}>
                      <ProductCard currProduct={currProduct} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
