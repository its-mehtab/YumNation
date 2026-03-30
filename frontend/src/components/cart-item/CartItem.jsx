import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { notifyError, notifySuccess } from "../../utils/toast";
import { MinusIcon, PlusIcon } from "../../assets/icon/Icons";
import { fetchAvailibility } from "../../utils/availibility";
import { assets } from "../../assets/assets";

const CartItem = ({ cartItem, restaurant }) => {
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const { serverURL } = useAuth();
  const { setCart } = useCart();

  const { isUnavailable, statusText } = fetchAvailibility(cartItem.dish);

  const addOns = cartItem.addOns.map((a) => a.name);

  const handleQuantityMinus = async () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }

    try {
      const { data } = await axios.patch(
        `${serverURL}/api/cart`,
        {
          action: "decrease",
          dishId: cartItem.dish._id,
          variant: cartItem.variant.name,
          addOns,
        },
        { withCredentials: true },
      );

      setCart(data);
    } catch (error) {
      console.error("Cart Error:", error?.response?.data || error.message);
      setQuantity(quantity);
      notifyError("Quantity update failed");
    }
  };

  const handleQuantityPlus = async () => {
    if (quantity >= 10) {
      notifyError("You can only order up to 10 of this item at a time");
      return;
    }

    setQuantity(quantity + 1);

    try {
      const { data } = await axios.patch(
        `${serverURL}/api/cart`,
        {
          action: "increase",
          dishId: cartItem.dish._id,
          variant: cartItem.variant.name,
          addOns,
        },
        { withCredentials: true },
      );

      setCart(data);
    } catch (error) {
      console.log("Cart Error:", error?.response?.data || error.message);
      setQuantity(quantity);
      notifyError("Quantity update failed");
    }
  };

  const handleDeleteCart = async () => {
    try {
      const { data } = await axios.delete(`${serverURL}/api/cart`, {
        data: {
          dishId: cartItem.dish._id,
          variant: cartItem.variant.name,
          addOns,
        },
        withCredentials: true,
      });

      setCart(data);
      notifySuccess(`${cartItem.name} removed from cart`);
    } catch (error) {
      console.log("Delete Cart Error:", error?.response?.data || error.message);
      notifyError("Cart remove failed");
      setQuantity(quantity);
    }
  };

  useEffect(() => {
    setQuantity(cartItem.quantity);
  }, [cartItem.quantity]);

  return (
    <div className="flex flex-wrap gap-4 items-center mb-8">
      <Link
        to={`/restaurant/${restaurant.slug}`}
        className={`w-17.5 min-w-17.5 h-17.5 rounded-lg border flex justify-center items-center border-[#fc8019] ${!cartItem.dish.isAvailable ? "grayscale" : ""}`}
      >
        {/* <img src={cartItem.image} alt="" className="w-full" /> */}
        <img src={assets.dish2} alt="" className="w-full" />
      </Link>
      <div>
        {isUnavailable && (
          <p className="text-xs bg-red-500 text-white font-medium mb-2 px-2 py-0.5 inline-block rounded-sm">
            {statusText}
          </p>
        )}
        <h3 className="text-sm font-semibold text-gray-700 hover:text-[#fc8019] transition-all">
          <Link to={`/restaurant/${restaurant.slug}`}>{cartItem.name}</Link>
        </h3>
        <p className="text-xs text-gray-500 font-medium mt-2">
          {cartItem.variant.name}
          {cartItem.addOns.length > 0 && (
            <>
              {" "}
              |{" "}
              {cartItem.addOns
                .map((a) => a.name)
                .sort()
                .join("+")}
            </>
          )}
        </p>
        <span
          onClick={handleDeleteCart}
          className="cursor-pointer mt-1 text-xs text-red-600 hover:text-black underline"
        >
          remove
        </span>
      </div>
      <div className="md:ml-auto text-end">
        <div className="text-md font-semibold text-[#fc8019]">
          +${(cartItem.price * cartItem.quantity).toFixed(2)}
        </div>
        <div className="flex justify-start items-center border border-[#fc8019] rounded-lg mt-2">
          <span
            className="cursor-pointer px-2.5 py-2.5 flex items-center border-r border-[#fc8019]"
            onClick={handleQuantityMinus}
          >
            <MinusIcon color={"#666"} />
          </span>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <span
            className="cursor-pointer px-2.5 py-2.5 flex items-center border-l border-[#fc8019]"
            onClick={handleQuantityPlus}
          >
            <PlusIcon color={"#666"} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
