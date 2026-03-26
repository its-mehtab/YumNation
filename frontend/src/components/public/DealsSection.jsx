import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const deals = [
  { icon: "🏷️", label: "Items At ₹99", sub: "ON SELECT ITEMS" },
  { icon: "💸", label: "Flat ₹200 Off", sub: "USE CELEBRATIONS" },
  { icon: "🏦", label: "Yes Bank Offer", sub: "10% OFF UPTO ₹75" },
  { icon: "🎁", label: "Free Delivery", sub: "ON ORDERS ABOVE ₹299" },
];

const DealsSection = () => {
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
        className="overflow-visible!"
      >
        {deals.map((deal, i) => (
          <SwiperSlide key={i} className="w-auto!">
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 w-56 cursor-pointer hover:border-orange-200 hover:bg-orange-50/30 transition-all">
              <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-xl shrink-0">
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
};

export default DealsSection;
