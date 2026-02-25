import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import { assets } from "../../assets/assets";
import CartItem from "../cart-item/CartItem";

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

const CartBox = () => {
  const { cart, setCart, loading, setLoading } = useCart();

  return (
    <div>
      <h3 className="text-[#fc8019] text-xs capitalize font-semibold mb-3">
        Shopping cart
      </h3>
      <div>
        <ul>
          {cart?.length > 0 ? (
            cart.map((currProd) => {
              return (
                <CartItem
                  currProd={currProd}
                  products={products}
                  key={`${currProd.product._id}-${currProd.variant}`}
                />
              );
            })
          ) : (
            <li className="text-gray-500 text-sm font-medium mt-4">
              Cart is Empty
            </li>
          )}
        </ul>
      </div>
      {cart?.length > 0 && (
        <div className="pt-4 border-t border-[#fc8019]">
          <div className="flex items-center gap-2 justify-between">
            <span className="text-xs font-medium text-gray-500">
              Convenience fee
            </span>
            <span className="text-md font-medium text-gray-600">+$0.00</span>
          </div>
          <div className="flex items-center gap-2 justify-between mt-2">
            <span className="text-md font-medium text-gray-600">Total</span>
            <span className="text-xl font-medium text-[#fc8019]">
              $
              {cart
                .reduce((acc, currCart) => {
                  return currCart.price * currCart.quantity + acc;
                }, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2 justify-between mt-5">
            <Button addClass="w-full text-center">Checkout</Button>
            {/* <Button /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartBox;
