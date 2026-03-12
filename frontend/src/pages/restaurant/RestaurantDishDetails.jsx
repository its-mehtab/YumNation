import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

// ── Mock data ─────────────────────────────────────────────────────────────────
const mockDish = {
  _id: "d1",
  name: "Margherita Pizza",
  slug: "margherita-pizza",
  description:
    "A classic Neapolitan pizza with fresh tomato sauce and mozzarella.",
  longDescription:
    "Our Margherita is made with hand-stretched dough, slow-cooked San Marzano tomato sauce, fresh buffalo mozzarella, and a drizzle of extra-virgin olive oil. Baked in a wood-fired oven at 485°C for the perfect char and chew.",
  price: 12,
  costPrice: 4.5,
  category: { _id: "c1", name: "Pizza" },
  foodType: "veg",
  variants: [
    { name: 'Small (8")', price: 9 },
    { name: 'Medium (10")', price: 12 },
    { name: 'Large (12")', price: 15 },
  ],
  addOns: [
    { name: "Extra Cheese", price: 1.5 },
    { name: "Olives", price: 1 },
    { name: "Jalapeños", price: 0.75 },
  ],
  ingredients: [
    "Flour",
    "Tomato Sauce",
    "Buffalo Mozzarella",
    "Basil",
    "Olive Oil",
  ],
  images: [null, null, null],
  stock: 20,
  isAvailable: true,
  isFeatured: true,
  rating: 4.6,
  totalReviews: 84,
  totalOrders: 312,
  createdAt: "2024-01-15T10:00:00.000Z",
  createdBy: { name: "Admin" },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${checked ? "bg-[#fc8019]" : "bg-gray-200"}`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
    />
  </button>
);

const Card = ({ title, children, action }) => (
  <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] overflow-hidden">
    {(title || action) && (
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
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
  const [activeImage, setActiveImage] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // Replace with: axios.get(`${serverURL}/api/admin/dish/${id}`, { withCredentials: true })
    setTimeout(() => {
      setDish(mockDish);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleToggle = (key) =>
    setDish((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleDelete = async () => {
    if (!window.confirm("Delete this dish permanently?")) return;
    setDeleting(true);
    // await axios.delete(...)
    setTimeout(() => navigate("/admin/dishes"), 800);
  };

  if (loading)
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4" />
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-4 h-80 bg-gray-100 rounded-2xl" />
          <div className="col-span-8 space-y-4">
            <div className="h-40 bg-gray-100 rounded-2xl" />
            <div className="h-40 bg-gray-100 rounded-2xl" />
          </div>
        </div>
      </div>
    );

  const margin = dish.price - dish.costPrice;
  const marginPct = Math.round((margin / dish.price) * 100);

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
            to="/admin/dishes"
            className="hover:text-[#fc8019] transition-colors"
          >
            Dishes
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
            <div className="aspect-square rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center overflow-hidden mb-3">
              {dish.images[activeImage] ? (
                <img
                  src={dish.images[activeImage]}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-6xl">🍕</span>
              )}
            </div>
            {dish.images.length > 1 && (
              <div className="flex gap-2">
                {dish.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-1 aspect-square rounded-lg border-2 flex items-center justify-center text-xl transition-all
                      ${activeImage === i ? "border-[#fc8019] bg-orange-50" : "border-gray-100 bg-gray-50 hover:border-orange-200"}`}
                  >
                    {img ? (
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      "🍕"
                    )}
                  </button>
                ))}
              </div>
            )}
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

          {/* Profit margin */}
          <Card title="Pricing Analysis">
            <InfoRow label="Selling Price" value={`$${dish.price}`} />
            <InfoRow label="Cost Price" value={`$${dish.costPrice}`} />
            <div className="flex justify-between py-2 text-sm">
              <span className="text-gray-400 font-medium">Profit Margin</span>
              <span
                className={`font-bold ${marginPct >= 50 ? "text-green-600" : marginPct >= 30 ? "text-yellow-500" : "text-red-400"}`}
              >
                ${margin.toFixed(2)} ({marginPct}%)
              </span>
            </div>
            {/* Margin bar */}
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#fc8019] transition-all"
                style={{ width: `${marginPct}%` }}
              />
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              to={`/admin/dishes/edit/${dish._id}`}
              className="flex-1 py-2.5 rounded-xl bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold text-center transition-colors"
            >
              Edit Dish
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex-1 py-2.5 rounded-xl border-2 border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
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
                  {/* Food type dot */}
                  <div
                    className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center
                    ${dish.foodType === "veg" ? "border-green-600" : "border-red-500"}`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${dish.foodType === "veg" ? "bg-green-600" : "bg-red-500"}`}
                    />
                  </div>
                  {dish.isFeatured && (
                    <span className="text-xs bg-yellow-50 text-yellow-600 font-semibold px-2 py-0.5 rounded-full">
                      ⭐ Featured
                    </span>
                  )}
                  {!dish.isAvailable && (
                    <span className="text-xs bg-gray-100 text-gray-400 font-semibold px-2 py-0.5 rounded-full">
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
              <div className="text-center">
                <p className="text-lg font-bold text-gray-700">
                  {dish.totalOrders}
                </p>
                <p className="text-xs text-gray-400">Total Orders</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-700">{dish.rating}</p>
                <p className="text-xs text-gray-400">Rating</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-700">
                  {dish.totalReviews}
                </p>
                <p className="text-xs text-gray-400">Reviews</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-700">{dish.stock}</p>
                <p className="text-xs text-gray-400">In Stock</p>
              </div>
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

          {/* Variants + Add-ons */}
          <div className="grid grid-cols-2 gap-5">
            <Card title={`Variants (${dish.variants.length})`}>
              {dish.variants.length === 0 ? (
                <p className="text-xs text-gray-400">No variants added.</p>
              ) : (
                dish.variants.map((v, i) => (
                  <div
                    key={i}
                    className="flex justify-between py-2 border-b border-gray-50 last:border-0 text-sm"
                  >
                    <span className="text-gray-600 font-medium">{v.name}</span>
                    <span className="font-bold text-gray-700">${v.price}</span>
                  </div>
                ))
              )}
            </Card>

            <Card title={`Add-ons (${dish.addOns.length})`}>
              {dish.addOns.length === 0 ? (
                <p className="text-xs text-gray-400">No add-ons added.</p>
              ) : (
                dish.addOns.map((a, i) => (
                  <div
                    key={i}
                    className="flex justify-between py-2 border-b border-gray-50 last:border-0 text-sm"
                  >
                    <span className="text-gray-600 font-medium">{a.name}</span>
                    <span className="font-bold text-[#fc8019]">
                      +${a.price}
                    </span>
                  </div>
                ))
              )}
            </Card>
          </div>

          {/* Ingredients */}
          <Card title="Ingredients">
            <div className="flex flex-wrap gap-2">
              {dish.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="text-xs font-medium bg-orange-50 text-[#fc8019] px-3 py-1.5 rounded-full border border-orange-100"
                >
                  {ing}
                </span>
              ))}
            </div>
          </Card>

          {/* Meta */}
          <Card title="Meta">
            <InfoRow
              label="Slug"
              value={<span className="font-mono text-xs">{dish.slug}</span>}
            />
            <InfoRow label="Created By" value={dish.createdBy?.name} />
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
