import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Pizza, Star } from "lucide-react";

// ── Mock data ─────────────────────────────────────────────────────────────────
const mockDish = {
  _id: "d1",
  name: "Margherita Pizza",
  slug: "margherita-pizza",
  description: "A classic Neapolitan pizza with fresh tomato sauce and mozzarella.",
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
  images: [null, null, null],
  isAvailable: true,
  isFeatured: true,
  rating: 4.6,
  totalReviews: 84,
  totalOrders: 312,
  createdAt: "2024-01-15T10:00:00.000Z",
  restaurant: { _id: "r1", name: "Bella Napoli", logo: null }
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const Card = ({ title, children, action }) => (
  <div className="bg-white rounded-md border border-gray-200 hover:shadow-md transition-all overflow-hidden">
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
const AdminDishDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    // Replace with: axios.get(`${serverURL}/api/admin/dish/${id}`, { withCredentials: true })
    setTimeout(() => {
      setDish(mockDish);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading)
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded-md w-1/4" />
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-4 h-80 bg-gray-100 rounded-md" />
          <div className="col-span-8 space-y-4">
            <div className="h-40 bg-gray-100 rounded-md" />
            <div className="h-40 bg-gray-100 rounded-md" />
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
            className="text-sm text-gray-400 hover:text-[#ea6a12] transition-colors font-medium"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-gray-700">Dish Details</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link
            to="/admin/restaurants"
            className="hover:text-[#ea6a12] transition-colors"
          >
            Restaurants
          </Link>
          <span className="text-gray-300">›</span>
          <Link
            to={`/admin/restaurants/${dish.restaurant._id}`}
            className="hover:text-[#ea6a12] transition-colors"
          >
            {dish.restaurant.name}
          </Link>
          <span className="text-gray-300">›</span>
          <span className="text-[#ea6a12] font-medium">{dish.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* ── Left — images + quick info ── */}
        <div className="col-span-4 space-y-5">
          {/* Image gallery */}
          <Card>
            <div className="aspect-square rounded-md bg-[#fff2e8] border border-orange-100 flex items-center justify-center overflow-hidden mb-3">
              {dish.images[activeImage] ? (
                <img
                  src={dish.images[activeImage]}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Pizza size={40} className="text-gray-400" />
              )}
            </div>
            {dish.images.length > 1 && (
              <div className="flex gap-2">
                {dish.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-1 aspect-square rounded-md border-2 flex items-center justify-center text-xl transition-all
                      ${activeImage === i ? "border-[#ea6a12] bg-orange-50" : "border-gray-200 bg-gray-50 hover:border-orange-200"}`}
                  >
                    {img ? (
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <Pizza size={24} className="text-gray-400" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </Card>

          {/* Quick Details */}
          <Card title="Status & Visibility">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Available
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Visible to customers
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-md text-xs font-bold ${dish.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {dish.isAvailable ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Featured
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Shown on home page
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-md text-xs font-bold ${dish.isFeatured ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                  {dish.isFeatured ? 'Yes' : 'No'}
                </span>
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
                className={`font-bold ${marginPct >= 50 ? "text-[#ea6a12]" : marginPct >= 30 ? "text-yellow-500" : "text-red-400"}`}
              >
                ${margin.toFixed(2)} ({marginPct}%)
              </span>
            </div>
            <div className="mt-2 h-2 bg-gray-100 rounded-md overflow-hidden">
              <div
                className="h-full rounded-md bg-[#ea6a12] transition-all"
                style={{ width: `${marginPct}%` }}
              />
            </div>
          </Card>
        </div>

        {/* ── Right — Details ── */}
        <div className="col-span-8 space-y-5">
          <Card title="Dish Information">
            <div className="space-y-6">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {dish.name}
                  </h2>
                  <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
                    {dish.longDescription}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 text-right">
                  <div className="text-2xl font-black text-[#ea6a12]">
                    ${dish.price.toFixed(2)}
                  </div>
                  <span
                    className={`inline-block px-3 py-1 rounded-md text-xs font-bold border ${dish.foodType === "veg" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}
                  >
                    {dish.foodType === "veg" ? "Veg" : "Non-Veg"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100">
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">
                    Category
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {dish.category.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">
                    Added On
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {dayjs(dish.createdAt).format("MMM DD, YYYY")}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">
                    Total Orders
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {dish.totalOrders}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-5">
            {/* Variants */}
            <Card title="Variants">
              {dish.variants?.length > 0 ? (
                <div className="space-y-1">
                  {dish.variants.map((v, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 border border-transparent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-orange-50 flex items-center justify-center text-[#ea6a12] font-bold text-xs">
                          {v.name[0]}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {v.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-sm font-bold text-gray-800">
                          +${v.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic text-center py-4">
                  No variants added
                </p>
              )}
            </Card>

            {/* Add-ons */}
            <Card title="Add-ons">
              {dish.addOns?.length > 0 ? (
                <div className="space-y-1">
                  {dish.addOns.map((add, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-3 rounded-md hover:bg-gray-50 border border-transparent transition-colors"
                    >
                      <span className="text-sm font-semibold text-gray-700">
                        {add.name}
                      </span>
                      <span className="text-sm font-bold text-gray-800">
                        +${add.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic text-center py-4">
                  No add-ons available
                </p>
              )}
            </Card>
          </div>

          <Card title="Performance & Reviews">
            <div className="flex items-center gap-8 p-6 bg-[#fff9f4] border border-[#f5d0b5] rounded-md">
              <div className="text-center">
                <div className="flex items-end justify-center gap-1">
                  <h3 className="text-4xl font-black text-[#ea6a12]">
                    {dish.rating.toFixed(1)}
                  </h3>
                  <span className="text-lg font-bold text-orange-300 pb-1">
                    /5
                  </span>
                </div>
                <div className="flex text-[#ea6a12] mt-2 mb-1 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(dish.rating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="text-xs font-semibold text-orange-600/60">
                  {dish.totalReviews} REVIEWS
                </p>
              </div>

              <div className="flex-1 border-l border-[#f5d0b5] pl-8">
                {/* Visualizer for star breakdown could go here */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-500 w-2 text-right">
                        {star}
                      </span>
                      <div className="flex-1 h-1.5 bg-orange-100 rounded-md overflow-hidden">
                        <div
                          className="h-full bg-[#ea6a12] rounded-md"
                          style={{
                            width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : 2}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDishDetails;

