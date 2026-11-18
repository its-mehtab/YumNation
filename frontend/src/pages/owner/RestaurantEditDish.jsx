import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/user/AuthContext";
import { useDish } from "../../context/owner";
import axios, { Axios } from "axios";
import { notifyError, notifySuccess } from "../../utils/toast";
import DishForm from "../../components/owner/DishForm";
import OwnerDishFormSkeleton from "../../components/skeleton/owner/OwnerDishFormSkeleton";
import { ErrorState } from "../../components/common";

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
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { serverURL } = useAuth();
  const { setDishes } = useDish();

  const { id } = useParams();

  const fetchDish = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${serverURL}/api/owner/dish/${id}`, {
        withCredentials: true,
      });

      setForm({ ...data, category: data.category._id });
    } catch (error) {
      setError(error?.response?.data.message || error.message);
      console.log("Add Dish Error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e, imageFile, customForm) => {
    e.preventDefault();
    const dataToSubmit = customForm || form;

    const formData = new FormData();

    formData.append("data", dataToSubmit);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const { data } = await axios.patch(
        `${serverURL}/api/owner/dish/${id}`,
        formData,
        { withCredentials: true },
      );

      setDishes((prev) => prev.map((d) => (d._id === id ? data : d)));
      navigate("/owner/dishes");
      notifySuccess(`${form.name} Updated successfully`);
    } catch (error) {
      notifyError(error?.response?.data?.message || "Failed to update dish");
      console.log("Add Dish Error:", error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchDish();
  }, [id]);

  if (loading) return <OwnerDishFormSkeleton />;
  if (error || !form) return <ErrorState error={error} onRetry={fetchDish} />;

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
