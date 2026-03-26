import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SearchIcon } from "../../assets/icon/Icons";
import DealsSection from "../../components/public/DealsSection";
import RestaurantHeader from "../../components/public/RestaurantHeader";
import DishItem from "../../components/public/DishItem";
import TopPicksSection from "../../components/public/TopPicksSection";

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

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
function DishesSection() {
  const [tab, setTab] = useState("recommended");
  const [restaurntDishes, setRestaurantDishes] = useState({});
  const [loading, setLoading] = useState(false);

  const { serverURL } = useAuth();
  const { slug } = useParams();

  const groupDishes = (dishes) => {
    const menu = {};
    const featured = dishes.filter((currDish) => currDish.isFeatured);

    if (featured.length > 0) menu["recommended"] = featured;

    dishes.forEach((dish) => {
      const cat = dish.category.name;

      if (!menu[cat]) menu[cat] = [];

      menu[cat].push(dish);
    });

    return menu;
  };

  const fetchRestaurantDishes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/dish/${slug}`, {
        withCredentials: true,
      });

      setRestaurantDishes(groupDishes(data));
    } catch (error) {
      console.log(
        "Restaurant Dishes Error:",
        error?.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantDishes();
  }, []);

  return (
    <section>
      <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
        {Object.keys(restaurntDishes)?.map((cat) => (
          <button
            onClick={() => setTab(cat)}
            key={cat}
            className={`px-5 py-2.5 text-sm whitespace-nowrap font-medium transition-colors shrink-0 border-b-2 -mb-px capitalize ${
              cat === tab
                ? "text-orange-500 border-orange-500 font-semibold"
                : "text-gray-500 border-transparent hover:text-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between cursor-pointer select-none mt-6">
        <h2 className="text-[17px] font-bold text-gray-900 capitalize">
          {tab}{" "}
          <span className="text-gray-400 font-normal">
            ({restaurntDishes[tab]?.length})
          </span>
        </h2>
      </div>
      <div>
        {restaurntDishes[tab]?.map((dish) => (
          <DishItem key={dish._id} dish={dish} />
        ))}
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

const RestaurantDishes = () => {
  const { slug } = useParams();

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
        <span className="text-gray-800 font-semibold capitalize">{slug}</span>
      </nav>
      <RestaurantHeader />
      <DealsSection />
      <MenuSearch />
      <TopPicksSection />
      <DishesSection />
    </div>
  );
};

export default RestaurantDishes;
