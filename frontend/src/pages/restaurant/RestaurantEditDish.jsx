import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDish } from "../../context/restaurant/DishContext";
import axios, { Axios } from "axios";
import { notifySuccess } from "../../utils/toast";
import DishForm from "../../components/restaurant/DishForm";

const initialForm = {
  name: "",
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

const RestaurantEditDish = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const { serverURL } = useAuth();
  const { dishes, setDishes } = useDish();

  const { id } = useParams();

  const fetchDish = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${serverURL}/api/dish/restaurant/${id}`,
        {
          withCredentials: true,
        },
      );

      setForm(data);
    } catch (error) {
      console.log("Add Dish Error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `${serverURL}/api/dish/${id}`,
        { ...form },
        { withCredentials: true },
      );

      setDishes((prev) => prev.map((d) => (d._id === id ? data : d)));
      navigate("/restaurant/dishes");
      notifySuccess(`${form.name} Updated successfully`);
    } catch (error) {
      console.log("Add Dish Error:", error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchDish();
  }, [id]);

  return (
    <div>
      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-700">Edit Dish</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link
            to="/restaurant/dishes"
            className="hover:text-[#fc8019] transition-colors"
          >
            My Menu
          </Link>
          <span className="text-gray-300">›</span>
          <span className="text-[#fc8019] font-medium">Edit Dish</span>
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

export default RestaurantEditDish;
