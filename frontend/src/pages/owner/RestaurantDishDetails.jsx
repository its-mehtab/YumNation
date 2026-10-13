import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Frown, Pizza, Star } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/user/AuthContext";
import { notifyError, notifySuccess } from "../../utils/toast";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { useDish } from "../../context/owner/DishContext";

// ── Helpers ───────────────────────────────────────────────────────────────────
const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative w-10 h-5 rounded-md transition-colors duration-200 ${checked ? "bg-[#fc8019]" : "bg-gray-200"}`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-md bg-white shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
    />
  </button>
);

const Card = ({ title, children, action }) => (
  <div className="bg-white rounded-md border border-gray-200 transition-all overflow-hidden">
    {(title || action) && (
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
        {title && (
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            {title}
          </p>
        )}
        {action}
      </div>
    )}
    <div className="p-5">{children}</div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-gray-50 last:border-0 text-sm">
    <span className="text-gray-400 font-medium">{label}</span>
    <span className="text-gray-700 font-semibold">{value}</span>
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const RestaurantDishDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const { serverURL } = useAuth();
  const { dishes, setDishes } = useDish();

  const fetchDishDetails = async () => {
    try {
      const { data } = await axios.get(`${serverURL}/api/owner/dish/${id}`, {
        withCredentials: true,
      });

      setDish(data);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishDetails();
  }, [id]);

  const handleToggle = async (key) => {
    setDish((prev) => ({ ...prev, [key]: !prev[key] }));

    try {
      await axios.patch(
        `${serverURL}/api/owner/dish/${id}`,
        { [key]: !dish[key] },
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      setDish(dish);
      console.log(error);
      notifyError("Failed to Update");
    }
  };

  const handleDelete = async () => {
    setDishes((prev) => prev.filter((dish) => dish._id !== id));
    setDeleting(true);

    try {
      await axios.delete(`${serverURL}/api/owner/dish/${id}`, {
        withCredentials: true,
      });
      notifySuccess("Dish deleted");
    } catch (error) {
      setDishes(dishes);
      notifyError("Failed to delete");
      console.log(error);
    } finally {
      navigate("/owner/dishes");
    }
  };

  if (loading)
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4" />
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-4 h-80 bg-gray-100 rounded-md" />
          <div className="col-span-8 space-y-4">
            <div className="h-40 bg-gray-100 rounded-md" />
            <div className="h-40 bg-gray-100 rounded-md" />
          </div>
        </div>
      </div>
    );

  if (!dish)
    return (
      <div className="text-center py-20">
        <div className="flex justify-center mb-4 text-gray-400">
          <Frown size={48} />
        </div>
        <p className="text-gray-500 text-sm">{error}</p>
        <Link
          to="/owner/dishes"
          className="text-[#fc8019] text-sm underline mt-2 block"
        >
          Back to Orders
        </Link>
      </div>
    );

  return (
    <div>
      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-400 hover:text-[#fc8019] transition-colors font-medium"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-gray-700">Dish Details</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link
            to="/restaurant/dishes"
            className="hover:text-[#fc8019] transition-colors"
          >
            My Menu
          </Link>
          <span className="text-gray-300">›</span>
          <span className="text-[#fc8019] font-medium">{dish.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* ── Left — images + quick info ── */}
        <div className="col-span-4 space-y-5">
          {/* Image gallery */}
          <Card>
            <div className="aspect-square rounded-md bg-[#fff2e8] border border-orange-100 flex items-center justify-center overflow-hidden mb-3">
              {dish?.images ? (
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Pizza size={40} className="text-gray-400" />
              )}
            </div>
          </Card>

          {/* Quick toggles */}
          <Card title="Availability">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Available
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Visible to customers
                  </p>
                </div>
                <Toggle
                  checked={dish.isAvailable}
                  onChange={() => handleToggle("isAvailable")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Featured
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Show on home page
                  </p>
                </div>
                <Toggle
                  checked={dish.isFeatured}
                  onChange={() => handleToggle("isFeatured")}
                />
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              to={`/owner/dish/edit/${dish._id}`}
              className="flex-1 py-2.5 rounded-md bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold text-center transition-colors"
            >
              Edit Dish
            </Link>
            <ConfirmationModal
              button={
                <button
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-md border-2 border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              }
              heading="Delete This Dish"
              description="Are you sure you want to delete this dish? This action cannot be undone and the dish will be removed from the menu."
              onClick={async () => await handleDelete()}
            />
          </div>
        </div>

        {/* ── Right — details ── */}
        <div className="col-span-8 space-y-5">
          {/* Main info */}
          <Card>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h2 className="text-xl font-bold text-gray-700">
                    {dish.name}
                  </h2>
                  {/* Food type indicator */}
                  <div
                    className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${dish.foodType === "veg" ? "border-green-600" : "border-red-500"}`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${dish.foodType === "veg" ? "bg-green-600" : "bg-red-500"}`}
                    />
                  </div>
                  {dish.isFeatured && (
                    <span className="text-xs bg-yellow-50 text-yellow-600 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Star size={12} strokeWidth={1.5} /> Featured
                    </span>
                  )}
                  {!dish.isAvailable && (
                    <span className="text-xs bg-gray-100 text-gray-400 font-semibold px-2 py-0.5 rounded-md">
                      Unavailable
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {dish.description}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-bold text-[#fc8019]">
                  ${dish.price}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {dish.category?.name}
                </p>
              </div>
            </div>

            <div className="flex gap-6 mt-4 pt-4 border-t border-gray-50">
              {[
                { label: "Total Orders", value: dish.totalOrders },
                { label: "Rating", value: dish.rating },
                { label: "Reviews", value: dish.totalReviews },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-lg font-bold text-gray-700">{s.value}</p>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Long description */}
          {dish.longDescription && (
            <Card title="Description">
              <p className="text-sm text-gray-500 leading-relaxed">
                {dish.longDescription}
              </p>
            </Card>
          )}

          {/* Variants */}
          <Card title={`Variants (${dish?.variants?.length})`}>
            {dish?.variants?.length === 0 ? (
              <p className="text-xs text-gray-400">No variants added.</p>
            ) : (
              <div className="overflow-hidden rounded-md border border-gray-200">
                {/* Header */}
                <div className="grid grid-cols-12 px-4 py-2 bg-gray-50 border-b border-gray-200">
                  <p className="col-span-8 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Name
                  </p>
                  <p className="col-span-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Price
                  </p>
                </div>
                {dish?.variants?.map((v, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-12 items-center px-4 py-3 ${i !== dish.variants.length - 1 ? "border-b border-gray-50" : ""}`}
                  >
                    <p className="col-span-8 text-sm font-semibold text-gray-700">
                      {v.name}
                    </p>
                    <p className="col-span-4 text-sm font-bold text-[#fc8019]">
                      ${v.price}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Add-ons */}
          <Card title={`Add-ons (${dish?.addOns?.length})`}>
            {dish?.addOns?.length === 0 ? (
              <p className="text-xs text-gray-400">No add-ons added.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {dish?.addOns?.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-[#fff2e8] border border-orange-100 rounded-md px-3 py-2"
                  >
                    <span className="text-xs font-semibold text-gray-700">
                      {a.name}
                    </span>
                    <span className="text-xs font-bold text-[#fc8019]">
                      +${a.price}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Meta */}
          <Card title="Meta">
            <InfoRow
              label="Slug"
              value={<span className="font-mono text-xs">{dish.slug}</span>}
            />
            <InfoRow
              label="Created On"
              value={dayjs(dish.createdAt).format("MMM D, YYYY")}
            />
            <InfoRow
              label="Food Type"
              value={<span className="capitalize">{dish.foodType}</span>}
            />
            <InfoRow label="Category" value={dish.category?.name} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDishDetails;
