import React from "react";
import { useCart } from "../../context/user/CartContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { assets } from "../../assets/assets";
import CartItem from "../cart-item/CartItem";
import CartSkeleton from "../skeleton/CartSkeleton";
import { notifyError, notifyInfo } from "../../utils/toast";
import axios from "axios";
import { useAuth } from "../../context/user/AuthContext";

const CartBox = () => {
  const { cart, setCart, subtotal, loading, setLoading, fetchUserCart } =
    useCart();
  const navigate = useNavigate();
  const { serverURL } = useAuth();

  const handleCheckout = async () => {
    try {
      await axios.get(`${serverURL}/api/checkout`, {
        withCredentials: true,
      });

      navigate("/checkout");
    } catch (error) {
      console.log("Checkout Error:", error?.response?.data || error.message);
      notifyInfo(error?.response?.data.message);

      error?.response?.data?.cart && setCart(error?.response?.data?.cart);
    }
  };

  return loading ? (
    <CartSkeleton />
  ) : (
    <div>
      <h3
        className={`text-[#fc8019] text-xs capitalize font-semibold mb-3 ${!cart.items?.length > 0 && "text-center"}`}
      >
        Shopping cart
      </h3>
      {cart.items?.length > 0 ? (
        cart.items.map((cartItem) => {
          return (
            <CartItem
              restaurant={cart.restaurant}
              cartItem={cartItem}
              key={`${cartItem.dish._id}-${cartItem.variant?.name}-${cartItem.addOns
                ?.map((a) => a.name)
                .sort()
                .join("+")}`}
            />
          );
        })
      ) : (
        <div className="text-gray-500 text-sm font-medium mt-4 text-center">
          <img src={assets.EmptyCartImg} className="w-14 mb-3 mx-auto" />
          Cart is Empty
        </div>
      )}
      {cart.items?.length > 0 && (
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
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2 justify-between mt-5">
            <Button onClick={handleCheckout} addClass="w-full text-center">
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartBox;
