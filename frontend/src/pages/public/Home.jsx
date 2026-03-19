import React, { useEffect, useState } from "react";
import { assets, Icon } from "../../assets/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import DishCard from "../../components/dish-card/DishCard";
import RestaurantCard from "../../components/user/RestaurantCard";
import {
  BeverageIcon,
  BurgersmIcon,
  BurritoIcon,
  DessertIcon,
  PastaIcon,
  PizzasIcon,
  SaladIcon,
  ShushiIcon,
} from "../../assets/icon/CategoryIcons";

import {
  ArrowLeft,
  ArrowRight,
  ChevronRightIcon,
  LocationIcon,
} from "../../assets/icon/Icons";
import { useCategory } from "../../context/CategoryContext";
import { useDish } from "../../context/owner/DishContext";
import { Link } from "react-router-dom";
import CartBox from "../../components/cart-box/CartBox";
import AddressBox from "../../components/address-box/AddressBox";
import CategorySkeleton from "../../components/skeleton/CategorySkeleton";
import DishCardSkeleton from "../../components/skeleton/DishCardSkeleton";
import { Skeleton } from "@radix-ui/themes";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { isLoggedIn } = useAuth();
  const { categories, loading } = useCategory();
  const { dishes, loading: dishLoading } = useDish();

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8">
        <section className="relative">
          <div className="custom-pagination"></div>

          {loading ? (
            <SwiperSlide>
              <Skeleton
                height="260px"
                width="100%"
                style={{ borderRadius: "10px" }}
              />
            </SwiperSlide>
          ) : (
            <Swiper
              pagination={{
                el: ".custom-pagination",
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper heroSwiper"
            >
              <SwiperSlide>
                <img src={assets.bannerImg1} className="rounded-lg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={assets.bannerImg2} className="rounded-lg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={assets.bannerImg3} className="rounded-lg" />
              </SwiperSlide>
            </Swiper>
          )}
        </section>
        <section className="py-7">
          <div className="flex justify-between gap-3 items-center mb-2">
            <h3 className="text-gray-700 text-lg capitalize font-semibold">
              Category
            </h3>
            <div className="flex items-center gap-3">
              <button className="custom-prev rounded-sm p-0.5 bg-[#fc8019] text-white cursor-pointer transition-all">
                <ArrowLeft />
              </button>
              <button className="custom-next rounded-sm p-0.5 bg-[#fc8019] text-white cursor-pointer transition-all">
                <ArrowRight />
              </button>
            </div>
          </div>
          <Swiper
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            modules={[Navigation]}
            slidesPerView={4}
            spaceBetween={20}
            // breakpoints={{
            //   640: { slidesPerView: 2 },
            //   991: { slidesPerView: 3 },
            // }}
            className="mySwiper"
          >
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <SwiperSlide key={i}>
                    <CategorySkeleton />
                  </SwiperSlide>
                ))
              : categories?.map((currCat) => {
                  return (
                    <SwiperSlide key={currCat._id}>
                      <Link
                        to={`/shop?category=${currCat._id}&page=1`}
                        className="border block text-[#b2b2b2] px-5 py-6 rounded-lg text-xl cursor-pointer text-center"
                      >
                        {/* <span>{<currCat.icon />}</span> */}
                        <div className="mb-2 flex justify-center">
                          {<BurgersmIcon />}
                        </div>
                        <div className="mt-4 text-sm text-gray-900">
                          {currCat.name}
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
          </Swiper>
        </section>
        <section className="pb-7">
          <div className="flex justify-between gap-3 items-center mb-2">
            <h3 className="text-gray-700 text-lg capitalize font-semibold">
              Popular Restaurants
            </h3>
            <Link
              to="/restaurants"
              className="flex items-center gap-2 text-sm text-[#fc8019]"
            >
              view all
              <ChevronRightIcon size={9} />
            </Link>
          </div>
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            // spaceBetween={0}
            // centeredSlides={true}
            // initialSlide={2}
            // modules={[Navigation]}
            // navigation={{
            //   nextEl: ".custom-next",
            //   prevEl: ".custom-prev",
            // }}
            // breakpoints={{
            //   480: { slidesPerView: 1.5 },
            //   767: { slidesPerView: 2.5 },
            //   991: { slidesPerView: 3.5 },
            //   1200: { slidesPerView: 4.2 },
            // }}
            className="mySwiper"
          >
            <SwiperSlide>
              <RestaurantCard />
            </SwiperSlide>
            <SwiperSlide>
              <RestaurantCard />
            </SwiperSlide>
            <SwiperSlide>
              <RestaurantCard />
            </SwiperSlide>
            <SwiperSlide>
              <RestaurantCard />
            </SwiperSlide>
          </Swiper>
        </section>
        {/* <section className="pb-7">
          <div className="flex justify-between gap-3 items-center mb-2">
            <h3 className="text-gray-700 text-lg capitalize font-semibold">
              Popular Restaurants
            </h3>
            <Link
              to="/shop"
              className="flex items-center gap-2 text-sm text-[#fc8019]"
            >
              view all
              <ChevronRightIcon size={9} />
            </Link>
          </div>
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            // spaceBetween={0}
            // centeredSlides={true}
            // initialSlide={2}
            // modules={[Navigation]}
            // navigation={{
            //   nextEl: ".custom-next",
            //   prevEl: ".custom-prev",
            // }}
            // breakpoints={{
            //   480: { slidesPerView: 1.5 },
            //   767: { slidesPerView: 2.5 },
            //   991: { slidesPerView: 3.5 },
            //   1200: { slidesPerView: 4.2 },
            // }}
            className="mySwiper"
          >
            {dishLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <SwiperSlide key={i}>
                    <DishCardSkeleton />
                  </SwiperSlide>
                ))
              : dishes?.map((currDish) => {
                  return (
                    <SwiperSlide key={currDish._id}>
                      <DishCard currDish={currDish} />
                    </SwiperSlide>
                  );
                })}
          </Swiper>
        </section> */}
        <section className="pb-7">
          <div className="flex justify-between gap-3 items-center mb-2">
            <h3 className="text-gray-700 text-lg capitalize font-semibold">
              Recent Order
            </h3>
            <Link
              to="/shop"
              className="flex items-center gap-2 text-sm text-[#fc8019]"
            >
              view all
              <ChevronRightIcon size={9} />
            </Link>
          </div>
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            // spaceBetween={0}
            // centeredSlides={true}
            // initialSlide={2}
            // modules={[Navigation]}
            // navigation={{
            //   nextEl: ".custom-next",
            //   prevEl: ".custom-prev",
            // }}
            // breakpoints={{
            //   480: { slidesPerView: 1.5 },
            //   767: { slidesPerView: 2.5 },
            //   991: { slidesPerView: 3.5 },
            //   1200: { slidesPerView: 4.2 },
            // }}
            className="mySwiper"
          >
            {dishLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <SwiperSlide key={i}>
                    <DishCardSkeleton />
                  </SwiperSlide>
                ))
              : dishes?.map((currDish) => {
                  return (
                    <SwiperSlide key={currDish._id}>
                      <DishCard currDish={currDish} />
                    </SwiperSlide>
                  );
                })}
          </Swiper>
        </section>
      </div>
      <div className="col-span-4">
        <div className="border border-[#fc8019] rounded-lg bg-[#fff2e8]">
          {isLoggedIn && (
            <div className="p-5 border-b border-[#fc8019]">
              <AddressBox />
            </div>
          )}
          <div className="p-5">
            <CartBox />
          </div>
        </div>
        <div className="px-5 pt-7 pb-14 mt-5 bg-[#fc8019] rounded-lg relative overflow-hidden">
          <h4 className="font-semibold text-white max-w-54">
            Get Discount VoucherUp To 20%
          </h4>
          <p className="text-xs leading-relaxed mt-2 text-white max-w-48">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <img
            src={assets.offerImg}
            alt=""
            className="absolute top-3 -right-6 w-64 z-10"
          />
          <img
            src={assets.offerBannerBg}
            alt=""
            className="absolute top-0 right-0 w-72 z-0"
          />
          <img
            src={assets.offerBannerBg}
            alt=""
            className="absolute -bottom-5 -left-20 w-56 z-0 rotate-180"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
