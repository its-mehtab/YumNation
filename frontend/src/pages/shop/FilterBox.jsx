import React, { useState, useEffect } from "react";
import RangeSlider from "./RangeSlider";
import { useProduct } from "../../context/ProductContext";
import { useCategory } from "../../context/CategoryContext";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const FilterBox = () => {
  const [filters, setFilters] = useState({
    category: [],
    // sort: "",
    minPrice: null,
    maxPrice: null,
    inStock: false,
    isFeatured: null,
    isAvailable: true,
    page: 1,
  });

  const { serverURL } = useAuth();
  const { products, setProducts } = useProduct();
  const { categories } = useCategory();

  const handleCategory = (id) => {
    setFilters((prev) => {
      const exists = prev.category.includes(id);

      return {
        ...prev,
        category: exists
          ? prev.category.filter((c) => c !== id)
          : [...prev.category, id],
        page: 1,
      };
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = { ...filters, category: filters.category.join(",") };
        console.log(params);

        const { data } = await axios.get(`${serverURL}/api/products`, {
          params,
        });

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [filters]);
  return (
    <div>
      <h3 className="text-xl text-[#000006] border-b border-gray-200 pb-4 mb-5.5">
        Filters
      </h3>
      <div className="flex items-center gap-2.5 mt-2">
        <span className="px-3 py-2 bg-gray-200 flex gap-1.5 items-center text-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          In Stock
        </span>
        <span className="px-3 py-2 bg-gray-200 flex gap-1.5 items-center text-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          In Stock
        </span>
        <span className="text-gray-600 underline hover:text-gray-900 transition-all cursor-pointer">
          Clear all
        </span>
      </div>
      <h3 className="text-xl text-[#000006] border-b border-gray-200 mt-7 pb-4 mb-5.5">
        Product categories
      </h3>
      {categories?.map((currCategory) => {
        return (
          <label
            className="flex items-center gap-2 cursor-pointer mt-2"
            key={currCategory._id}
          >
            <input
              type="checkbox"
              className="w-4 h-4 accent-black"
              checked={filters.category.includes(currCategory._id)}
              onChange={() => handleCategory(currCategory._id)}
            />
            {currCategory.name}
          </label>
        );
      })}

      <h3 className="text-xl text-[#000006] border-b border-gray-200 mt-7 pb-4 mb-5.5">
        Availability
      </h3>
      <label className="flex items-center gap-2 cursor-pointer">
        <input name="stock" type="checkbox" className="w-4 h-4 accent-black" />
        In stock (23)
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input name="stock" type="checkbox" className="w-4 h-4 accent-black" />
        In Featured (23)
      </label>
      <label className="flex items-center gap-2 cursor-pointer mt-2">
        <input name="Out" type="checkbox" className="w-4 h-4 accent-black" />
        Out of stock (1)
      </label>
      <h3 className="text-xl text-[#000006] border-b border-gray-200 mt-7 pb-4 mb-5.5">
        Price
      </h3>
      <RangeSlider />
    </div>
  );
};

export default FilterBox;
