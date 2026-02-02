import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { notifyError, notifySuccess } from "../../utils/toast";
import { useCart } from "../../context/CartContext";

const Wishlist = () => {
  const { wishlist, setWishlist, loading, setLoading } = useWishlist();
  const { setCart } = useCart();
  const { serverURL } = useAuth();

  const handleWishlistRemove = async (currProd) => {
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${serverURL}/api/wishlist/${currProd.product._id}`,
        { withCredentials: true }
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

  const handleAddCart = async (currProduct) => {
    if (loading) return;
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${serverURL}/api/cart`,
        {
          product: currProduct.product._id,
          name: currProduct.name,
          image: "kjgdh.jpg",
          price: currProduct.price,
          quantity: 1,
          variant: currProduct.product.variants[0].name,
        },
        { withCredentials: true }
      );

      setCart([...data]);

      notifySuccess(`${currProduct.name} added to cart`);
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
      <section className="py-20 my-20 lg:py-30">
        <div className="mx-auto max-w-335 px-4 sm:px-6 lg:px-8">
          <ul className="border border-gray-200 p-8 rounded-4xl">
            {wishlist?.length > 0 ? (
              wishlist?.map((currProd) => {
                return (
                  <li
                    key={currProd._id}
                    className="flex gap-4 items-center mb-2"
                  >
                    <Link
                      to={`/product/${currProd.product.slug}`}
                      className="w-20 min-w-20 h-20 rounded-xl"
                    >
                      {/* <img src={currProd.img} alt="" className="w-full" /> */}
                      <img src={assets.product2} alt="" className="w-full" />
                    </Link>
                    <div>
                      <Link to={`/product/${currProd.product.slug}`}>
                        <h3 className="text-lg">{currProd.name}</h3>
                      </Link>
                      <div>${currProd.price.toFixed(2)}</div>
                    </div>
                    <div className="ml-auto flex gap-5 md:gap-10 items-center">
                      <div
                        onClick={() => handleAddCart(currProd)}
                        className="hidden md:block px-8 py-4 rounded-xl font-[bangers] bg-[#FB9300] text-white cursor-pointer hover:bg-[#c57300] transition"
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
              <li>Wishlist is Empty</li>
            )}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
