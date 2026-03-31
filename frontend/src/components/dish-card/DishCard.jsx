import React, { useState, useEffect } from "react";
import { assets, Icon } from "../../assets/assets";
import { Link } from "react-router-dom";
import {
  PlusIcon,
  WishlistIcon,
  WishlistIconRed,
} from "../../assets/icon/Icons";
import { useAuth } from "../../context/user/AuthContext";
import { useCart } from "../../context/user/CartContext";
import axios from "axios";
import { notifyError, notifySuccess } from "../../utils/toast";
import { useWishlist } from "../../context/user/WishlistContext";
import { StarIcon } from "../../assets/icon/Icons";
import { fetchAvailibility } from "../../utils/availibility";

const DishCard = ({ currDish, dishLoading }) => {
  const [wishlistActive, setWishlistActive] = useState(false);

  const { isUnavailable, statusText } = fetchAvailibility(currDish);

  const { serverURL } = useAuth();
  const { setCart } = useCart();
  const {
    wishlist,
    setWishlist,
    loading: wishlistLoad,
    setLoading: wishlistSetLoad,
  } = useWishlist();

  const handleAddCart = async () => {
    // if (isUnavailable) {
    //   notifyError(`${currDish.name} is ${statusText}`);
    //   return;
    // }

    try {
      const { data } = await axios.post(
        `${serverURL}/api/cart`,
        {
          dish: currDish._id,
          name: currDish.name,
          image: "kjgdh.jpg",
          price: currDish.price,
          quantity: 1,
          variant: currDish.variants[0].name,
        },
        { withCredentials: true },
      );

      setCart(data);

      notifySuccess(`${currDish.name} added to cart`);
    } catch (error) {
      console.log("Cart Error:", error?.response?.data || error.message);
      notifyError(error?.response?.data.message);
    }
  };

  const syncWishlistState = async () => {
    const isWishlisted = wishlist?.find(
      (item) => item.dish._id === currDish._id,
    );

    setWishlistActive(!!isWishlisted);
  };

  const handleWishlist = async () => {
    if (wishlistLoad) return;
    const prevState = wishlistActive;
    wishlistSetLoad(true);
    setWishlistActive(!prevState);

    try {
      const { data } = await axios.post(
        `${serverURL}/api/wishlist`,
        {
          dishId: currDish._id,
          name: currDish.name,
          image: "kjgdh.jpg",
          price: currDish.price,
        },
        { withCredentials: true },
      );

      setWishlist(data);

      notifySuccess(
        !wishlistActive
          ? `${currDish.name} Added to wishlist ❤️`
          : `${currDish.name} Removed from wishlist`,
      );
    } catch (error) {
      console.log("Cart Error:", error?.response?.data || error.message);
      setWishlistActive(prevState);
      notifyError("Wishlist update failed");
    } finally {
      wishlistSetLoad(false);
    }
  };

  useEffect(() => {
    syncWishlistState();
  }, [wishlist, currDish?._id]);

  return (
    <div
      className={`border border-[#b2b2b2] rounded-lg py-4 px-3.5 relative ${isUnavailable ? "grayscale" : ""}`}
    >
      <span className="bg-[#eb5757] text-white text-sm absolute -top-0.5 -left-px rounded-tl-lg rounded-br-md px-2.5 py-0.5">
        15% Off
      </span>
      <span
        onClick={handleWishlist}
        className="text-[#B7B7B7] hover:text-[#027a36] cursor-pointer absolute top-4 right-4 z-10"
      >
        {!wishlistActive ? <WishlistIcon /> : <WishlistIconRed />}
      </span>
      <Link className="relative" to={`/dish/${currDish.slug}`}>
        {isUnavailable && (
          <span className="bg-[#fc8019] text-white text-md absolute top-1/2 -left-4 -translate-y-1/2 -right-4 text-center px-2.5 py-1.5">
            {statusText}
          </span>
        )}
        <img src={assets.dish2} alt="" className="h-31.5 mx-auto mb-3" />
      </Link>
      <div className="flex gap-1 items-center mb-2">
        <StarIcon size={18} color={"text-[#FC8019]"} />
        <StarIcon size={18} color={"text-[#FC8019]"} />
        <StarIcon size={18} color={"text-[#FC8019]"} />
        <StarIcon size={18} color={"text-gray-300"} />
        <StarIcon size={18} color={"text-gray-300"} />
      </div>
      <div className="flex items-end gap-2 justify-between">
        <div>
          <Link to={`/dish/${currDish.slug}`}>
            <h3 className="text font-semibold text-gray-700 hover:text-[#fc8019] transition-all">
              {currDish.name}
            </h3>
          </Link>
          <h3 className="text-xl font-bold text-[#fc8019] mt-0.5">
            <Link to={`/dish`}>${currDish.price.toFixed(2)}</Link>
          </h3>
        </div>
        <span
          onClick={handleAddCart}
          className="w-9 min-w-9 h-9 flex items-center  justify-center bg-[#fc8019] rounded-md hover:bg-[#fc8019] cursor-pointer transition-all"
        >
          {<PlusIcon size={15} color={"#fff"} />}
        </span>
      </div>
    </div>
  );
};

export default DishCard;
