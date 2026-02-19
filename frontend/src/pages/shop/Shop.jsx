import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/product-card/ProductCard";
import { useProduct } from "../../context/ProductContext";
import FilterBox from "./FilterBox";

const Shop = () => {
  const { products } = useProduct();

  return (
    <>
      <section className="py-28 mt-5">
        <div className="mx-auto max-w-335 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-7 sm:grid-cols-10 gap-6">
            <div className="lg:col-span-2 sm:col-span-4">
              <FilterBox />
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
                  >
                    <option value="Featured">Featured</option>
                    <option value="Best selling">Best selling</option>
                    <option value="low to high">Price, low to high</option>
                    <option value="Price, high to low">
                      Price, high to low
                    </option>
                    <option value="old to new">Date, old to new</option>
                    <option value="new to old">Date, new to old</option>
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
