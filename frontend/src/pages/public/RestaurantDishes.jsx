import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SearchIcon } from "../../assets/icon/Icons";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const restaurant = {
  name: "The Good Bowl",
  rating: "4.4",
  ratingCount: "2.4K+",
  priceForTwo: "₹400 for two",
  categories: ["Biryani", "Pastas"],
  outlet: "Mali Panchghara",
  deliveryTime: "40–45 mins",
};

const deals = [
  { icon: "🏷️", label: "Items At ₹99", sub: "ON SELECT ITEMS" },
  { icon: "💸", label: "Flat ₹200 Off", sub: "USE CELEBRATIONS" },
  { icon: "🏦", label: "Yes Bank Offer", sub: "10% OFF UPTO ₹75" },
  { icon: "🎁", label: "Free Delivery", sub: "ON ORDERS ABOVE ₹299" },
];

const topPicks = [
  {
    id: 1,
    name: "Premium Diwali Gift Hamper",
    desc: "Sweet Bonds, Sweeter Bites",
    price: "₹359",
    badge: "EXCLUSIVELY ON SWIGGY",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80",
  },
  {
    id: 2,
    name: "Chicken Biryani Special",
    desc: "Aromatic basmati, tender chicken",
    price: "₹329",
    badge: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80",
  },
  {
    id: 3,
    name: "Penne Arrabbiata",
    desc: "Fiery tomato, garlic, chilli",
    price: "₹139",
    originalPrice: "₹199",
    badge: "20% OFF",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80",
  },
  {
    id: 4,
    name: "Mutton Keema Bowl",
    desc: "Slow-cooked, bold spices",
    price: "₹279",
    badge: "CHEF'S PICK",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80",
  },
];

const recommendedDishes = [
  {
    id: 1,
    name: "Chicken Haleem (150 Gm)",
    price: "₹209",
    rating: "4.0",
    ratingCount: "1",
    desc: "Slow-cooked chicken, lentils, and barley stirred patiently till they come together as one. A Ramadan bowl that fills the stomach and settles the day.",
    isNonVeg: true,
    image:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=200&q=80",
  },
  {
    id: 2,
    name: "Chicken Haleem (300 Gm)",
    price: "₹319",
    rating: "4.2",
    ratingCount: "5",
    desc: "Slow-cooked chicken, lentils, and barley stirred patiently till they come together as one. A Ramadan bowl that fills the stomach and settles the day.",
    isNonVeg: true,
    image:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=200&q=80",
  },
  {
    id: 3,
    name: "Mutton Keema Bowl",
    price: "₹279",
    rating: "4.5",
    ratingCount: "12",
    desc: "Minced mutton cooked with aromatic spices, served in a hearty bowl with toasted bread. Bold flavors, comforting finish.",
    isNonVeg: true,
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&q=80",
  },
  {
    id: 4,
    name: "Penne Arrabbiata",
    price: "₹189",
    rating: "4.3",
    ratingCount: "8",
    desc: "Al-dente penne tossed in a fiery tomato sauce with garlic and chilli flakes. Simple, punchy, and satisfying.",
    isNonVeg: false,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&q=80",
  },
  {
    id: 5,
    name: "Veg Pulao Bowl",
    price: "₹169",
    rating: "4.1",
    ratingCount: "3",
    desc: "Fragrant basmati rice cooked with seasonal vegetables and whole spices. Light, wholesome, and delicious.",
    isNonVeg: false,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&q=80",
  },
];

const menuCategories = [
  "Recommended",
  "Biryani",
  "Pastas",
  "Bowls",
  "Desserts",
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function RestaurantHeader() {
  return (
    <section className="mb-7">
      <h1 className="text-[28px] font-bold tracking-tight text-gray-900 mb-4">
        {restaurant.name}
      </h1>
      <div className="border border-gray-200 rounded-2xl p-5">
        {/* Rating row */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-800 mb-2">
          <span className="text-green-600 text-base">★</span>
          <span className="font-semibold">
            {restaurant.rating} ({restaurant.ratingCount} ratings)
          </span>
          <span className="text-gray-300 text-lg leading-none">·</span>
          <span className="text-gray-600">{restaurant.priceForTwo}</span>
        </div>

        {/* Category links */}
        <div className="flex items-center gap-1 flex-wrap mb-3">
          {restaurant.categories.map((cat, i) => (
            <span key={cat} className="flex items-center gap-1">
              <button className="text-orange-500 font-medium text-sm underline hover:text-orange-600 transition-colors">
                {cat}
              </button>
              {i < restaurant.categories.length - 1 && (
                <span className="text-gray-300 text-sm">,</span>
              )}
            </span>
          ))}
        </div>

        {/* Outlet */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-gray-300 flex-shrink-0" />
          <span className="text-gray-400">Outlet</span>
          <span className="font-medium text-gray-700">{restaurant.outlet}</span>
          <span className="text-[10px] text-gray-400">▼</span>
        </div>

        {/* Delivery time */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="w-2 h-2 rounded-full bg-gray-300 flex-shrink-0" />
          <span>{restaurant.deliveryTime}</span>
        </div>
      </div>
    </section>
  );
}

function DealsSection() {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-bold text-gray-900">Deals for you</h2>
        <div className="flex gap-2">
          <button className="deals-prev w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-50 transition-colors">
            ←
          </button>
          <button className="deals-next w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-50 transition-colors">
            →
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{ prevEl: ".deals-prev", nextEl: ".deals-next" }}
        spaceBetween={12}
        slidesPerView="auto"
        className="!overflow-visible"
      >
        {deals.map((deal, i) => (
          <SwiperSlide key={i} className="!w-auto">
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 w-56 cursor-pointer hover:border-orange-200 hover:bg-orange-50/30 transition-all">
              <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-xl flex-shrink-0">
                {deal.icon}
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-800 mb-0.5">
                  {deal.label}
                </p>
                <p className="text-xs text-gray-400">{deal.sub}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function MenuSearch() {
  return (
    <>
      {/* MENU divider */}
      <div className="flex items-center gap-3 mb-4">
        <span className="flex-1 h-px bg-gray-200" />
        <span className="text-[11px] text-gray-400 tracking-[3px] font-medium select-none">
          — MENU —
        </span>
        <span className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search for dishes"
          readOnly
          className="w-full bg-gray-100 rounded-xl px-5 py-3.5 text-sm text-gray-500 outline-none placeholder-gray-400 cursor-pointer"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <SearchIcon color="#999" />
        </span>
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 flex-wrap pb-5 border-b border-gray-200 mb-7">
        <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:border-green-400 transition-colors bg-white">
          <span className="w-2.5 h-2.5 rounded-full bg-green-600 inline-block" />
          Veg
        </button>
        <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:border-orange-400 transition-colors bg-white">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
          Non-veg
        </button>
        <button className="px-4 py-1.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:border-orange-400 transition-colors bg-white">
          Bestseller
        </button>
      </div>
    </>
  );
}

function TopPicksSection() {
  return (
    <section className="mb-9">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-bold text-gray-900">Top Picks</h2>
        <div className="flex gap-2">
          <button className="tops-prev w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-50 transition-colors">
            ←
          </button>
          <button className="tops-next w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-50 transition-colors">
            →
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{ prevEl: ".tops-prev", nextEl: ".tops-next" }}
        spaceBetween={14}
        slidesPerView="auto"
      >
        {topPicks.map((item) => (
          <SwiperSlide key={item.id} className="!w-[200px]">
            <div className="relative rounded-2xl overflow-hidden cursor-pointer bg-gray-900 h-52 group">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-80 group-hover:scale-105 transition-all duration-300"
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-linier-to-t from-black/80 via-black/20 to-transparent" />

              {/* Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-green-600 text-white text-[9px] font-bold tracking-wide px-2 py-1 rounded">
                  {item.badge}
                </span>
              </div>

              {/* Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-bold text-sm leading-snug mb-0.5 line-clamp-2">
                  {item.name}
                </p>
                <p className="text-white/60 text-xs mb-2">{item.desc}</p>
                <div className="flex items-end justify-between">
                  <div>
                    {item.originalPrice && (
                      <p className="text-white/40 text-xs line-through leading-none mb-0.5">
                        {item.originalPrice}
                      </p>
                    )}
                    <p className="text-white font-bold text-sm">{item.price}</p>
                  </div>
                  <button className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-white/30 transition-colors">
                    ADD
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function CategoryNav() {
  return (
    <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
      {menuCategories.map((cat, i) => (
        <button
          key={cat}
          className={`px-5 py-2.5 text-sm whitespace-nowrap font-medium transition-colors flex-shrink-0 border-b-2 -mb-px ${
            i === 0
              ? "text-orange-500 border-orange-500 font-semibold"
              : "text-gray-500 border-transparent hover:text-gray-800"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

function VegBadge({ isNonVeg }) {
  return (
    <div
      className={`w-4.5 h-4.5 rounded-sm flex items-center justify-center flex-shrink-0 border-[1.5px] ${
        isNonVeg ? "border-orange-500" : "border-green-600"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          isNonVeg ? "bg-orange-500" : "bg-green-600"
        }`}
      />
    </div>
  );
}

function DishItem({ dish }) {
  return (
    <div className="flex justify-between items-start py-5 border-b border-gray-100 gap-4 last:border-b-0">
      {/* Left */}
      <div className="flex-1 min-w-0">
        <VegBadge isNonVeg={dish.isNonVeg} />
        <h3 className="text-[15px] font-semibold text-gray-900 mt-1.5 mb-1 leading-snug">
          {dish.name}
        </h3>
        <p className="text-[15px] font-bold text-gray-900 mb-1.5">
          {dish.price}
        </p>
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <span className="text-amber-400">★</span>
          <span>
            {dish.rating} ({dish.ratingCount})
          </span>
        </div>
        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-3">
          {dish.desc.slice(0, 100)}...{" "}
          <span className="text-orange-500 cursor-pointer font-medium hover:underline">
            more
          </span>
        </p>
      </div>

      {/* Right — image + ADD button */}
      <div className="relative shrink-0 pb-4">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-29.5 h-25 object-cover rounded-xl"
        />
        <button className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-lg px-5 py-1.5 text-[13px] font-bold text-green-600 shadow-sm whitespace-nowrap hover:bg-green-50 transition-colors">
          ADD
        </button>
      </div>
    </div>
  );
}

function RecommendedSection() {
  return (
    <section>
      <div className="flex items-center justify-between cursor-pointer select-none mt-6">
        <h2 className="text-[17px] font-bold text-gray-900">
          Recommended{" "}
          <span className="text-gray-400 font-normal">
            ({recommendedDishes.length})
          </span>
        </h2>
        <span className="text-gray-400 text-lg">∧</span>
      </div>
      <div>
        {recommendedDishes.map((dish) => (
          <DishItem key={dish.id} dish={dish} />
        ))}
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

const RestaurantDishes = () => {
  const [restaurntDishes, setRestaurantDishes] = useState({});
  const [loading, setLoading] = useState(false);

  const { serverURL } = useAuth();
  const { slug } = useParams();

  const menu = {};

  const groupDishes = (dishes) => {
    const featured = dishes.filter((currDish) => currDish.isFeatured);
    console.log(featured);

    if (featured.length > 0) menu["recommended"] = featured;

    dishes.forEach((dish) => {
      const cat = dish.category.name;

      if (!menu[cat]) menu[cat];

      menu[cat] = dish.name;
    });
  };

  const fetchRestaurantDishes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/dish/${slug}`, {
        withCredentials: true,
      });

      groupDishes(data);
      setRestaurantDishes(data);
    } catch (error) {
      console.log(
        "Restaurant Dishes Error:",
        error?.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  console.log(menu);

  useEffect(() => {
    fetchRestaurantDishes();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20 bg-white">
      <nav className="flex items-center gap-1.5 text-sm text-gray-400 pb-4">
        <span className="hover:text-gray-600 cursor-pointer transition-colors">
          Home
        </span>
        <span className="text-gray-300">/</span>
        <span className="hover:text-gray-600 cursor-pointer transition-colors">
          Kolkata
        </span>
        <span className="text-gray-300">/</span>
        <span className="text-gray-800 font-semibold">{restaurant.name}</span>
      </nav>
      <RestaurantHeader />
      <DealsSection />
      <MenuSearch />
      <TopPicksSection />
      <CategoryNav />
      <RecommendedSection />
    </div>
  );
};

export default RestaurantDishes;
