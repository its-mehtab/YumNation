import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

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
const TopPicksSection = () => {
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
          <SwiperSlide key={item.id} className="w-50!">
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
};

export default TopPicksSection;
