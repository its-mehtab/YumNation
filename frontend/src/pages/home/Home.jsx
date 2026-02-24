import React, { useEffect, useState } from "react";
import { assets, Icon } from "../../assets/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./home.css";
import { Navigation, Pagination } from "swiper/modules";
import ProductCard from "../../components/product-card/ProductCard";
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
import Button from "../../components/button/Button";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRightIcon,
} from "../../assets/icon/Icons";
import { useCategory } from "../../context/CategoryContext";
import { useProduct } from "../../context/ProductContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { categories, loading: catLoading } = useCategory();
  const { products } = useProduct();

  return (
    <>
      <div className="mb-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-7">
            <section className="relative">
              <div className="custom-pagination"></div>
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
                slidesPerView={3}
                spaceBetween={20}
                // breakpoints={{
                //   640: { slidesPerView: 2 },
                //   991: { slidesPerView: 3 },
                // }}
                className="mySwiper"
              >
                {categories?.map((currCat) => {
                  return (
                    <SwiperSlide key={currCat._id}>
                      <div
                        // onClick={() => {
                        //   setCategoryName(currCat.name);
                        // }}
                        className="border text-[#b2b2b2] px-5 py-6 rounded-lg text-xl cursor-pointer text-center"
                      >
                        {/* <span>{<currCat.icon />}</span> */}
                        <div className="mb-2 flex justify-center">
                          {<BurgersmIcon />}
                        </div>
                        <div className="mt-4 text-sm text-gray-900">
                          {currCat.name}
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </section>
            <section className="pb-7">
              <div className="flex justify-between gap-3 items-center mb-2">
                <h3 className="text-gray-700 text-lg capitalize font-semibold">
                  Popular Dishes
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
                slidesPerView={2}
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
                {products?.products?.map((currProduct) => {
                  return (
                    <SwiperSlide key={currProduct._id}>
                      <ProductCard currProduct={currProduct} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </section>
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
                slidesPerView={2}
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
                {products?.products?.map((currProduct) => {
                  return (
                    <SwiperSlide key={currProduct._id}>
                      <ProductCard currProduct={currProduct} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </section>
          </div>
          <div className="col-span-5">
            <div className="border border-[#fc8019] rounded-lg p-5">
              <h3 className="text-gray-700 text-lg capitalize font-semibold">
                Your address
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* <section
        className="py-16 lg:py-30 bg-cover bg-center"
        style={{ backgroundImage: `url(${assets.bgYellow})` }}
      >
        <div className="mx-auto max-w-335 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-[#000006] text-6xl">
              Best selling <span className="text-[#3F9065]">dishes</span>
            </h1>
            <div className="hidden sm:block">
              <Button
                btnName="See All"
                btnColor="bg-white text-[#000006] hover:bg-[#000006] hover:text-white"
              />
            </div>
          </div>
        </div>
        <Swiper
          slidesPerView={1.2}
          spaceBetween={0}
          centeredSlides={true}
          initialSlide={2}
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          breakpoints={{
            480: { slidesPerView: 1.5 },
            767: { slidesPerView: 2.5 },
            991: { slidesPerView: 3.5 },
            1200: { slidesPerView: 4.2 },
          }}
          className="mySwiper"
        >
          {products?.products?.map((currProduct) => {
            return (
              <SwiperSlide key={currProduct._id}>
                <ProductCard currProduct={currProduct} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="flex items-center justify-center gap-3 mt-7">
          <button className="custom-prev text-[#66666A] bg-white border border-[#66666A] rounded-full p-3.5 hover:bg-[#fc8019] hover:text-white hover:border-[#fc8019] cursor-pointer transition-all">
            <ArrowLeft />
          </button>
          <button className="custom-next text-[#66666A] bg-white border border-[#66666A] rounded-full p-3.5 hover:bg-[#fc8019] hover:text-white hover:border-[#fc8019] cursor-pointer transition-all">
            <ArrowRight />
          </button>
        </div>
      </section> */}
    </>
  );
};

export default Home;
