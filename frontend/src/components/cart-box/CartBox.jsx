import React from "react";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { assets } from "../../assets/assets";
import CartItem from "../cart-item/CartItem";
import CartSkeleton from "../skeleton/CartSkeleton";
import { notifyError } from "../../utils/toast";

const CartBox = () => {
  const { cart, setCart, subtotal, loading, setLoading } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const hasUnavailableProduct = cart.some(
      (item) => !item.product.isAvailable || item.product.stock <= 0,
    );

    if (hasUnavailableProduct) {
      notifyError("Remove unavailable products from cart");
      return;
    }

    navigate("/checkout");
  };

  return loading ? (
    <CartSkeleton />
  ) : (
    <div>
      <h3
        className={`text-[#fc8019] text-xs capitalize font-semibold mb-3 ${!cart?.length > 0 && "text-center"}`}
      >
        Shopping cart
      </h3>

      {cart?.length > 0 ? (
        cart.map((currProd) => {
          return (
            <CartItem
              currProd={currProd}
              key={`${currProd.product._id}-${currProd.variant}`}
            />
          );
        })
      ) : (
        <div className="text-gray-500 text-sm font-medium mt-4 text-center">
          <img src={assets.EmptyCartImg} className="w-14 mb-3 mx-auto" />
          Cart is Empty
        </div>
      )}

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
