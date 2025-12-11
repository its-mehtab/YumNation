import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

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

const Wishlist = () => {
  return (
    <>
      <section
        className="bg-cover bg-center  pt-34 pb-28"
        style={{ backgroundImage: `url(${assets.bannerBg})` }}
      >
        <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
          <h1 className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 text-white text-[210px] text-center">
            Wishlist
          </h1>
          <ul className="flex justify-center">
            <li>
              <Link href="/" className="text-xl font-semibold text-white">
                Home
              </Link>
            </li>
            <li className="text-xl text-white before:content-['-'] before:mx-2">
              Wishlist
            </li>
          </ul>
        </div>
      </section>
      <section className="py-16 lg:py-30">
        <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
          <ul className="border border-gray-200 p-8 rounded-4xl">
            {products.map((currProd) => {
              return (
                <li key={currProd._id} className="flex gap-4 items-center mb-2">
                  <div className="w-20 min-w-20 h-20 rounded-xl">
                    <img src={currProd.img} alt="" className="w-full" />
                  </div>
                  <div>
                    <h3 className="text-lg">{currProd.name}</h3>
                    <div>${currProd.price.toFixed(2)}</div>
                  </div>
                  <div className="ml-auto flex gap-5 md:gap-10 items-center">
                    <div className="hidden md:block px-8 py-4 rounded-xl font-[bangers] bg-[#FB9300] text-white cursor-pointer hover:bg-[#c57300] transition">
                      Move to Cart
                    </div>
                    <span className="cursor-pointer p-1 text-gray-600 hover:text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
