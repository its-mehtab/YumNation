import React, { useEffect, useState } from "react";
import { assets, Icon } from "../../assets/assets";
import "./home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
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
import { ArrowLeft, ArrowRight } from "../../assets/icon/Icons";
import { useAuth } from "../../context/AuthContext";
import { useCategory } from "../../context/CategoryContext";
import { useProduct } from "../../context/ProductContext";

const Home = () => {
  const [categoryName, setCategoryName] = useState("Burgers");

  const { user, loading } = useAuth();
  const { categories, loading: catLoading } = useCategory();
  const { products } = useProduct();

  const categoryProducts = products?.products?.filter(
    (currItem) => currItem.category.name === categoryName,
  );

  return (
    <>
      <section className="py-16 lg:py-28">
        <div className="mx-auto max-w-335 px-4 sm:px-6 lg:px-8">
          <h1 className="text-[#000006] text-6xl mb-8 text-center">
            Our Best <span className="text-[#3F9065]">product</span>
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex gap-3.5 items-center justify-center">
            {categories?.map((currCat) => {
              return (
                <span
                  key={currCat._id}
                  onClick={() => {
                    setCategoryName(currCat.name);
                  }}
                  className={`${
                    categoryName === currCat.name
                      ? "bg-[#fb9300] text-white"
                      : "bg-[#fff7ea] text-[#212121] hover:bg-[#fb9300] hover:text-white"
                  }   px-5 py-3 rounded-lg text-xl  cursor-pointer flex items-center gap-2 justify-center`}
                >
                  {/* <span>{<currCat.icon />}</span> */}
                  <span>{<BurgersmIcon />}</span>
                  {currCat.name}
                </span>
              );
            })}
          </div>
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            breakpoints={{
              640: { slidesPerView: 2 },
              991: { slidesPerView: 3 },
            }}
            className="mySwiper"
          >
            {categoryProducts?.map((currProduct) => {
              return (
                <SwiperSlide key={currProduct._id}>
                  <ProductCard currProduct={currProduct} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
      <section
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
          <button className="custom-prev text-[#66666A] bg-white border border-[#66666A] rounded-full p-3.5 hover:bg-[#fb9300] hover:text-white hover:border-[#fb9300] cursor-pointer transition-all">
            <ArrowLeft />
          </button>
          <button className="custom-next text-[#66666A] bg-white border border-[#66666A] rounded-full p-3.5 hover:bg-[#fb9300] hover:text-white hover:border-[#fb9300] cursor-pointer transition-all">
            <ArrowRight />
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
