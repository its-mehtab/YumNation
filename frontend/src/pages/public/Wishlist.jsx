import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { notifyError, notifySuccess } from "../../utils/toast";
import { useCart } from "../../context/CartContext";
import { EmptyWishlistIcon } from "../../assets/icon/Icons";
import { fetchAvailibility } from "../../utils/availibility";

const Wishlist = () => {
  const { wishlist, setWishlist, loading, setLoading } = useWishlist();
  const { setCart } = useCart();
  const { serverURL } = useAuth();

  const handleWishlistRemove = async (currProd) => {
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${serverURL}/api/wishlist/${currProd.dish._id}`,
        { withCredentials: true },
      );

      setWishlist(data);
      notifySuccess(`${currProd.name} Removed from wishlist`);
    } catch (error) {
      console.log("Cart Error:", error?.response?.data || error.message);
      notifyError("Wishlist remove failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCart = async (currDish) => {
    if (loading) return;
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${serverURL}/api/cart`,
        {
          dish: currDish.dish._id,
          name: currDish.name,
          image: "kjgdh.jpg",
          price: currDish.price,
          quantity: 1,
          variant: currDish.dish.variants[0].name,
        },
        { withCredentials: true },
      );

      setCart([...data]);

      notifySuccess(`${currDish.name} added to cart`);
    } catch (error) {
      console.log("Cart Error:", error?.response?.data || error.message);
      notifyError(error?.response?.data || error.message);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section>
        <ul className="border border-gray-200 p-3 lg:px-6 rounded-xl">
          {wishlist?.length > 0 ? (
            wishlist?.map((currProd) => {
              const { isUnavailable, statusText } = fetchAvailibility(
                currProd.dish,
              );

              return (
                <li
                  key={currProd._id}
                  className="flex gap-4 items-center py-3 border-t border-gray-100 first:border-t-0"
                >
                  <Link
                    to={`/dish/${currProd.dish.slug}`}
                    className={`w-20 min-w-20 ${isUnavailable ? "grayscale" : ""}`}
                  >
                    {/* <img src={currProd.img} alt="" className="w-full" /> */}
                    <img src={assets.dish2} alt="" className="w-full" />
                  </Link>
                  <div>
                    {isUnavailable && (
                      <p className="text-xs bg-red-500 text-white font-medium mb-2 px-2 py-0.5 inline-block rounded-sm">
                        {statusText}
                      </p>
                    )}
                    <Link to={`/dish/${currProd.dish.slug}`}>
                      <h3 className="text-sm text-gray-700 font-semibold">
                        {currProd.name}
                      </h3>
                    </Link>
                    <div className="mt-2 text-md text-gray-600">
                      ${currProd.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="ml-auto flex gap-5 md:gap-10 items-center">
                    <div
                      onClick={() => {
                        if (isUnavailable) {
                          notifyError(`${currProd.name} is ${statusText}`);
                          return;
                        }
                        handleAddCart(currProd);
                      }}
                      className={`hidden md:block px-5 py-2 rounded-md  bg-[#fc8019] text-white hover:bg-[#c57300] transition ${isUnavailable ? "grayscale cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      Move to Cart
                    </div>
                    <span
                      onClick={() => handleWishlistRemove(currProd)}
                      className="cursor-pointer p-1 text-gray-600 hover:text-black"
                    >
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
            })
          ) : (
            <li className="flex items-center flex-col py-4">
              <EmptyWishlistIcon size={80} color={"#858585"} />
              <div className="mt-2 text-gray-500">Wishlist is Empty</div>
            </li>
          )}
        </ul>
      </section>
    </>
  );
};

export default Wishlist;
