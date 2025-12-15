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

const products = [
  {
    _id: 1,
    name: "LOADED FRIES",
    price: 2.26,
    img: assets.product1,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
  {
    _id: 2,
    name: "ORIGINAL RECIPE CHICKEN",
    price: 5.0,
    img: assets.product2,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
  {
    _id: 3,
    name: "WHOPPER BURGER KING",
    price: 12.39,
    img: assets.product3,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
  {
    _id: 4,
    name: "TACO SUPREME",
    price: 8.32,
    img: assets.product4,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
  {
    _id: 5,
    name: "SPICY CHICKEN SANDWICH",
    price: 12.46,
    img: assets.product5,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
  {
    _id: 6,
    name: "LOADED FRIES",
    price: 2.26,
    img: assets.product1,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
  {
    _id: 7,
    name: "ORIGINAL RECIPE CHICKEN",
    price: 5.0,
    img: assets.product2,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
  {
    _id: 8,
    name: "WHOPPER BURGER KING",
    price: 12.39,
    img: assets.product3,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
  {
    _id: 9,
    name: "TACO SUPREME",
    price: 8.32,
    img: assets.product4,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
  {
    _id: 10,
    name: "SPICY CHICKEN SANDWICH",
    price: 12.46,
    img: assets.product5,
    description:
      "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
  },
];
const categories = [
  {
    _id: 1,
    name: "BURGERS",
    icon: BurgersmIcon,
  },
  {
    _id: 2,
    name: "PIZZA",
    icon: PizzasIcon,
  },
  {
    _id: 3,
    name: "SUSHI",
    icon: ShushiIcon,
  },
  {
    _id: 4,
    name: "SALADS",
    icon: SaladIcon,
  },
  {
    _id: 5,
    name: "BURRITOS",
    icon: BurritoIcon,
  },
  {
    _id: 6,
    name: "BEVERAGES",
    icon: BeverageIcon,
  },
  {
    _id: 7,
    name: "PASTA",
    icon: PastaIcon,
  },
  {
    _id: 8,
    name: "DESSERTS",
    icon: DessertIcon,
  },
];

const Home = () => {
  const [categoryName, setCategoryName] = useState("BURGERS");

  const { user, loading } = useAuth();

  return (
    <>
      <section
        className="bg-cover bg-center pt-30 sm:pt-38 pb-32 bg-[#fc9401] md:mb-80 xl:mb-[370px] relative z-0"
        // style={{ backgroundImage: `url(${assets.bannerBg})` }}
      >
        <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
          <h1 className="text-white xl:text-[210px] md:text-9xl text-8xl text-center">
            Pizza Paradise
          </h1>
          <img
            src={assets.bannerImg}
            className="md:absolute md:top-60 md:left-1/2 md:-translate-x-1/2 w-full xl:max-w-xl max-w-xl mx-auto"
          />
        </div>
        <nav className="menu">
          <div className="menu__item">
            <div className="marquee bg-[#3F9065] md:rotate-[5deg]">
              <div className="marquee__inner text-[#FFEB3B] font-[Bangers] text-5xl sm:text-7xl py-2 md:py-6">
                <span>So Hot orders</span>
                <span>{<Icon.FriesIcon />}</span>
                <span>THE TROPICAL ESCAPE</span>
                <span>{<Icon.BurgerIcon />}</span>
                <span>Fast shipping</span>
                <span>{<Icon.FriesIcon />}</span>
                <span>30 minutes</span>
                <span>{<Icon.BurgerIcon />}</span>
              </div>
            </div>
          </div>
        </nav>
        <nav className="menu hidden md:block">
          <div className="menu__item">
            <div className="marquee reverse bg-[#3F9065] rotate-[-5deg]">
              <div className="marquee__inner text-[#FFEB3B] font-[Bangers] text-5xl sm:text-7xl py-6">
                <span>Fast shipping</span>
                <span>{<Icon.BurgerIcon />}</span>
                <span>So Hot orders</span>
                <span>{<Icon.FriesIcon />}</span>
                <span>30 minutes</span>
                <span>{<Icon.BurgerIcon />}</span>
                <span>THE TROPICAL ESCAPE</span>
                <span>{<Icon.FriesIcon />}</span>
              </div>
            </div>
          </div>
        </nav>
      </section>
      <section className="py-16 lg:py-28">
        <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
          <h1 className="text-[#000006] text-6xl mb-8 text-center">
            Our Best <span className="text-[#3F9065]">product</span>
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex gap-3.5 items-center justify-center">
            {categories.map((currCat) => {
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
                  }   px-5 py-3 rounded-lg text-xl font-[bangers] cursor-pointer flex items-center gap-2 justify-center`}
                >
                  <span>{<currCat.icon />}</span>
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
            {products.map((currProduct) => {
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
        className="py-30 bg-cover bg-center"
        style={{ backgroundImage: `url(${assets.bgLight})` }}
      >
        <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-1 items-center">
            <div>
              <img src={assets.whyChooseUs} alt="" />
            </div>
            <div className="mt-5 md:mt-0">
              <h2 className="text-[#000006] text-6xl mb-5.5 font-medium">
                Why choose <span className="text-[#3F9065]">us</span>
              </h2>
              <p className="text-[#333338]">
                The mouth-watering aroma of sizzling burgers now fills the
                streets of Birmingham thanks to the passionate pursuit of three
                brothers
              </p>
              <ul className="flex gap-2 sm:gap-9 flex-col sm:flex-row">
                <li className="mt-5.5">
                  {<Icon.WhyUsIcon1 />}
                  <h3 className="text-lg text-[#212121] mt-4">
                    A new look on the right food!
                  </h3>
                </li>
                <li className="mt-5.5">
                  {<Icon.WhyUsIcon2 />}
                  <h3 className="text-lg text-[#212121] mt-4">
                    A new look on the right food!
                  </h3>
                </li>
                <li className="mt-5.5">
                  {<Icon.WhyUsIcon3 />}
                  <h3 className="text-lg text-[#212121] mt-4">
                    A new look on the right food!
                  </h3>
                </li>
              </ul>
              <Button addClass="mt-9" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 lg:py-30">
        <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-7 gap-6">
            <div className="lg:col-span-4 relative group overflow-hidden rounded-xl">
              <div className="">
                <img
                  src={assets.offerBg1}
                  alt=""
                  className="w-full group-hover:scale-110 transition-all duration-300"
                />
              </div>
              <div className="absolute top-0 left-0 p-8 text-center w-full">
                <h4
                  className={"text-[#FFEB3B] text-6xl"}
                  style={{ fontFamily: "Tirelessly Love You" }}
                >
                  new flavours
                </h4>
                <h3 className="text-4xl lg:text-7xl text-white">
                  weekend menu
                </h3>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="relative group overflow-hidden rounded-xl">
                <div className="">
                  <img
                    src={assets.offerBg2}
                    alt=""
                    className="w-full group-hover:scale-110 transition-all duration-300"
                  />
                </div>
                <div className="absolute top-0 left-0 p-8 text-center w-full">
                  <h3 className="text-4xl lg:text-6xl text-white">
                    Chicken Craze
                  </h3>
                  <h4
                    className={"text-[#FFEB3B] text-5xl"}
                    style={{ fontFamily: "Tirelessly Love You" }}
                  >
                    free shipping
                  </h4>
                </div>
              </div>
              <div className="mt-4 relative group overflow-hidden rounded-xl">
                <div className="">
                  <img
                    src={assets.offerBg3}
                    alt=""
                    className="w-full group-hover:scale-110 transition-all duration-300"
                  />
                </div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 ps-8">
                  <h4 className={"text-[#000006] text-4xl lg:text-6xl"}>
                    Special offer
                  </h4>
                  <p className="mt-3 text-[#000006] max-w-3xs">
                    The mouth-watering aroma of sizzling burgers now fills
                  </p>
                  <Button addClass="mt-6 bg-[#FB9300] text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="py-16 lg:py-30 bg-cover bg-center"
        style={{ backgroundImage: `url(${assets.bgYellow})` }}
      >
        <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
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
          {products.map((currProduct) => {
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
      <section className="py-16 lg:py-16">
        <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
          <div
            className="bg-cover lg:bg-contain bg-[#3f9065] sm:bg-white rounded-xl bg-left lg:bg-position-[center_bottom] bg-no-repeat grid lg:grid-cols-[34%_66%] gap-1 items-center"
            style={{
              backgroundImage: `url(${assets.achievmentSecBg})`,
            }}
          >
            <div className="text-center hidden lg:block">
              <img src={assets.pizzaMan} alt="" className="ms-auto" />
            </div>
            <div className="pl-10 lg:pl-0 py-12 sm:pt-40 md:pt-50 sm:pb-10">
              <h2 className="text-[#FFEB3B] text-5xl mb-8">
                Achievements achieved
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 items-center text-white">
                <div className="sm:text-center">
                  <h3 className="text-5xl mb-2">999k</h3>
                  <p className="md:max-w-32 sm:mx-auto">Order was delivered</p>
                </div>
                <div className="sm:text-center sm:border-l border-[#FFEB3B]">
                  <h3 className="text-5xl mb-2">4.9</h3>
                  <p className="md:max-w-32 sm:mx-auto">
                    Google <br className="hidden sm:block" /> Score
                  </p>
                </div>
                <div className="sm:text-center md:border-l border-[#FFEB3B]">
                  <h3 className="text-5xl mb-2">65+</h3>
                  <p className="md:max-w-32 sm:mx-auto">Receipts we have</p>
                </div>
                <div className="sm:text-center sm:border-l border-[#FFEB3B]">
                  <h3 className="text-5xl mb-2">120K</h3>
                  <p className="md:max-w-32 sm:mx-auto">
                    Natural Product we use
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="py-16 lg:py-40 bg-cover bg-center"
        style={{
          backgroundImage: `url(${assets.newsletterBg})`,
        }}
      >
        <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white text-7xl">Join For Hot Offers</h2>
            <p className="text-white text-xl mt-4 mb-10 font-semibold max-w-lg mx-auto">
              If we go all out... We do it well! Subscribe to the newsletter to
              get the most exclusive promos.
            </p>
            <div className="flex gap-3 relative">
              <input
                type="email"
                placeholder="Email address..."
                className="px-7 py-4 rounded-xl bg-white text-[#66666A] w-full outline-0"
              />
              <button className="flex justify-center items-center absolute top-1.5 right-2 w-11 h-11 bg-[#3f9065] text-white hover:bg-[#fb9300] rounded-md sm:hidden">
                <ArrowRight />
              </button>
              <div className="hidden sm:block">
                <Button
                  btnName="subscribe"
                  btnColor="bg-[#027a36] text-white hover:bg-[#000006]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
