import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import ProductCard from "../../components/product-card/ProductCard";
import { useProduct } from "../../context/ProductContext";

// const productss = [
//   {
//     _id: 1,
//     name: "LOADED FRIES",
//     price: 2.26,
//     img: assets.product1,
//     description:
//       "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
//   },
//   {
//     _id: 2,
//     name: "ORIGINAL RECIPE CHICKEN",
//     price: 5.0,
//     img: assets.product2,
//     description:
//       "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
//   },
//   {
//     _id: 3,
//     name: "WHOPPER BURGER KING",
//     price: 12.39,
//     img: assets.product3,
//     description:
//       "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
//   },
//   {
//     _id: 4,
//     name: "TACO SUPREME",
//     price: 8.32,
//     img: assets.product4,
//     description:
//       "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
//   },
//   {
//     _id: 5,
//     name: "SPICY CHICKEN SANDWICH",
//     price: 12.46,
//     img: assets.product5,
//     description:
//       "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
//   },
//   {
//     _id: 6,
//     name: "LOADED FRIES",
//     price: 2.26,
//     img: assets.product1,
//     description:
//       "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
//   },
//   {
//     _id: 7,
//     name: "ORIGINAL RECIPE CHICKEN",
//     price: 5.0,
//     img: assets.product2,
//     description:
//       "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
//   },
//   {
//     _id: 8,
//     name: "WHOPPER BURGER KING",
//     price: 12.39,
//     img: assets.product3,
//     description:
//       "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
//   },
//   {
//     _id: 9,
//     name: "TACO SUPREME",
//     price: 8.32,
//     img: assets.product4,
//     description:
//       "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
//   },
//   {
//     _id: 10,
//     name: "SPICY CHICKEN SANDWICH",
//     price: 12.46,
//     img: assets.product5,
//     description:
//       "Pepper Mayo Cruncher + Fries + Coleslaw + 1 Pc Chicken + Drink",
//   },
// ];

const Shop = () => {
  const { products } = useProduct();

  return (
    <>
      {/* <section
        className="bg-cover bg-center  pt-34 pb-28"
        style={{ backgroundImage: `url(${assets.bannerBg})` }}
      >
        <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
          <h1 className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 text-white text-[210px] text-center">
            Shop
          </h1>
          <ul className="flex justify-center">
            <li>
              <Link href="/" className="text-xl font-semibold text-white">
                Home
              </Link>
            </li>
            <li className="text-xl text-white before:content-['-'] before:mx-2">
              Shop
            </li>
          </ul>
        </div>
      </section> */}
      <section className="py-28">
        <div className="mx-auto max-w-335 px-4 sm:px-6 lg:px-8">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
            {products?.map((currProduct) => {
              return (
                <div key={currProduct._id}>
                  <ProductCard currProduct={currProduct} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
