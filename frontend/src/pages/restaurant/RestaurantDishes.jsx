import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DeleteIcon,
  EditIcon,
  PlusIcon,
  ViewIcon,
} from "../../assets/icon/Icons";
import { useDish } from "../../context/DishContext";

// ── Status Badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ isAvailable }) => (
  <span
    className={`text-xs font-semibold px-3 py-1 rounded-full ${isAvailable ? "bg-green-50 text-green-600" : "bg-pink-50 text-pink-500"}`}
  >
    {isAvailable ? "Published" : "Draft"}
  </span>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const RestaurantDishes = () => {
  const [sort, setSort] = useState("asc");

  const { dishes, setDishes } = useDish();

  const sorted = [...dishes].sort((a, b) =>
    sort === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name),
  );

  const handleDelete = (id) => {
    if (!window.confirm("Delete this dish?")) return;
    setDishes((prev) => prev.filter((d) => d._id !== id));
  };

  return (
    <div>
      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-700">My Menu</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Restaurant</span>
          <span className="text-gray-300">›</span>
          <span className="text-[#fc8019] font-medium">My Menu</span>
        </div>
      </div>

      {/* ── Table card ── */}
      <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] overflow-hidden">
        {/* Card header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-gray-700">All Dishes</h2>
            <span className="text-xs bg-orange-50 text-[#fc8019] font-semibold px-2 py-0.5 rounded-full">
              {sorted?.length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-600 font-medium bg-white focus:outline-none cursor-pointer"
              >
                <option value="asc">Sort: A → Z</option>
                <option value="desc">Sort: Z → A</option>
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                ▼
              </span>
            </div>
            {/* Add dish */}
            <Link
              to="/restaurant/dishes/add"
              className="flex items-center gap-2 bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <PlusIcon color={"#fff"} size={12} />
              Add Dish
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {[
                  "Dish Name",
                  "Category",
                  "Price",
                  "Stock",
                  "Status",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider first:px-6"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sorted?.map((dish) => (
                <tr
                  key={dish._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 min-w-10 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center overflow-hidden">
                        {dish.image ? (
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-lg">🍽️</span>
                        )}
                      </div>
                      <span className="font-medium text-gray-700">
                        {dish.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-500">
                    {dish.category.name}
                  </td>
                  <td className="px-4 py-4 text-gray-700 font-semibold">
                    ${dish.price}
                  </td>
                  <td className="px-4 py-4 text-gray-500">{dish.stock}</td>
                  <td className="px-4 py-4">
                    <StatusBadge isAvailable={dish.isAvailable} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <Link
                        to={`/restaurant/dishes/edit/${dish._id}`}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#fc8019] transition-colors"
                        title="Edit"
                      >
                        <EditIcon size={15} />
                      </Link>
                      <Link
                        to={`/restaurant/dish/${dish._id}`}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-500 transition-colors"
                        title="View"
                      >
                        <ViewIcon size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(dish._id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <DeleteIcon size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {sorted?.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🍽️</div>
            <p className="text-sm font-medium mb-3">No dishes added yet</p>
            <Link
              to="/restaurant/dishes/add"
              className="flex items-center gap-2 bg-[#fc8019] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#e5721f] transition-colors"
            >
              <PlusIcon /> Add your first dish
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDishes;
