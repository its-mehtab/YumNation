import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/user/AuthContext";
import { notifySuccess } from "../../utils/toast";
import { useDish } from "../../context/owner/DishContext";
import DishForm from "../../components/owner/DishForm";

// ── Initial state ─────────────────────────────────────────────────────────────
const initialForm = {
  name: "",
  image: "https://via.placeholder.com/150",
  shortDescription: "",
  longDescription: "",
  category: "",
  price: "",
  cost: "",
  variants: [],
  addOns: [],
  foodType: "veg",
  isAvailable: true,
  isFeatured: false,
};

// ── Main ──────────────────────────────────────────────────────────────────────
const RestaurantAddDish = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);

  const { serverURL } = useAuth();
  const { setDishes } = useDish();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${serverURL}/api/owner/dish`,
        { ...form },
        { withCredentials: true },
      );

      setDishes((prev) => [...prev, { ...data }]);
      navigate("/owner/dishes");
      notifySuccess(`${form.name} added successfully`);
    } catch (error) {
      console.log("Add Dish Error:", error?.response?.data || error.message);
    }
  };

  return (
    <div>
      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-700">Add Dish</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link
            to="/restaurant/dishes"
            className="hover:text-[#fc8019] transition-colors"
          >
            My Menu
          </Link>
          <span className="text-gray-300">›</span>
          <span className="text-[#fc8019] font-medium">Add Dish</span>
        </div>
      </div>

      <DishForm
        handleSubmit={handleSubmit}
        initialForm={initialForm}
        form={form}
        setForm={setForm}
      />
    </div>
  );
};

export default RestaurantAddDish;
