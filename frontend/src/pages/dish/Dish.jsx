import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { WishlistIcon, WishlistIconRed } from "../../assets/icon/Icons";
import "./dish.css";
import DishGallery from "./DishGallery";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { notifyError, notifySuccess } from "../../utils/toast";
import { useWishlist } from "../../context/WishlistContext";
import { fetchAvailibility } from "../../utils/availibility";
import DishDetailsSkeleton from "../../components/skeleton/DishDetailsSkeleton";

const Dish = () => {
  const [variation, setVariation] = useState("");
  //   const [addOns, setAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [wishlistActive, setWishlistActive] = useState(false);
  const [mainDish, setMainDish] = useState(null);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();
  const { serverURL } = useAuth();
  const {
    setCart,
    loading: cartLoading,
    setLoading: setCartLoading,
  } = useCart();
  const {
    wishlist,
    setWishlist,
    loading: wishlistLoading,
    setLoading: setWishlistLoading,
  } = useWishlist();

  const getMainDish = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${serverURL}/api/dishs/${slug}`);

      setMainDish(data);

      setVariation(data.variants[0].name);
    } catch (error) {
      console.log("Dish Error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const dishPrice = mainDish?.variants
    ? mainDish?.variants
        .find((curr) => curr.name === variation)
        ?.price.toFixed(2)
    : mainDish?.price;

  const handleAddCart = async () => {
    if (isSoldOut || isUnavailable) {
      notifyError(`${mainDish.name} is ${statusText}`);
      return;
    }
    setCartLoading(true);

    try {
      const { data } = await axios.post(
        `${serverURL}/api/cart`,
        {
          dish: mainDish._id,
          name: mainDish.name,
          image: "kjgdh.jpg",
          price: dishPrice,
          quantity,
          variant: variation,
        },
        { withCredentials: true },
      );

      setCart(data);
      notifySuccess(`${mainDish.name} added to cart`);
    } catch (error) {
      console.log("Cart Error:", error?.response?.data || error.message);
      setCart(null);
      notifyError(error?.response?.data?.message || "Failed to add item");
    } finally {
      setCartLoading(false);
    }
  };

  const handleWishlist = async () => {
    if (wishlistLoading) return;
    const prevState = wishlistActive;
    setWishlistLoading(true);
    setWishlistActive(!prevState);

    try {
      const { data } = await axios.post(
        `${serverURL}/api/wishlist`,
        {
          dishId: mainDish._id,
          name: mainDish.name,
          image: "kjgdh.jpg",
          price: mainDish.price,
        },
        { withCredentials: true },
      );

      setWishlist(data);

      notifySuccess(
        !wishlistActive
          ? `${mainDish.name} Added to wishlist ❤️`
          : `${mainDish.name} Removed from wishlist`,
      );
    } catch (error) {
      console.log("Cart Error:", error?.response?.data || error.message);
      setWishlistActive(prevState);
      notifyError("Wishlist update failed");
    } finally {
      setWishlistLoading(false);
    }
  };

  const syncWishlistState = async () => {
    const isWishlisted = wishlist?.find(
      (item) => item.dish._id === mainDish?._id,
    );

    setWishlistActive(!!isWishlisted);
  };
  useEffect(() => {
    syncWishlistState();
  }, [wishlist, mainDish?._id]);

  useEffect(() => {
    getMainDish();
  }, [slug]);

  const { isSoldOut, isUnavailable, statusText } = mainDish
    ? fetchAvailibility(mainDish)
    : {};

  return loading ? (
    <DishDetailsSkeleton />
  ) : (
    <section
      className={`fade-up ${isSoldOut || isUnavailable ? "grayscale" : ""}`}
    >
      <div className="grid grid-cols-9 gap-8">
        <div className="col-span-4">
          <ul className="flex mb-8 text-gray-600">
            <li>
              <Link to="/" className="text-sm">
                Home
              </Link>
            </li>
            <li className="before:content-['/'] before:mx-2">
              <Link to="/shop" className="text-sm">
                Shop
              </Link>
            </li>
            <li className="text-sm before:content-['/'] before:mx-2">
              {mainDish?.name}
            </li>
          </ul>
          <DishGallery />
        </div>
        <div className="col-span-5 md:pr-5">
          {(isSoldOut || isUnavailable) && (
            <h3 className="mb-3 bg-[#fc8019] text-white px-3 py-1 rounded-md inline-block">
              {statusText}
            </h3>
          )}
          <h2 className="text-2xl font-semibold text-gray-600">
            {mainDish?.name}
          </h2>
          <div className="flex items-center gap-0.5 py-3 border-b border-gray-200">
            <svg
              fill="#fc8019"
              enableBackground="new 0 0 32 32"
              height="20"
              viewBox="0 0 32 32"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="star">
                <path d="m29.911 13.75-6.229 6.072 1.471 8.576c.064.375-.09.754-.398.978-.174.127-.381.191-.588.191-.159 0-.319-.038-.465-.115l-7.702-4.049-7.701 4.048c-.336.178-.745.149-1.053-.076-.308-.224-.462-.603-.398-.978l1.471-8.576-6.23-6.071c-.272-.266-.371-.664-.253-1.025s.431-.626.808-.681l8.609-1.25 3.85-7.802c.337-.683 1.457-.683 1.794 0l3.85 7.802 8.609 1.25c.377.055.69.319.808.681s.019.758-.253 1.025z" />
              </g>
            </svg>
            <svg
              fill="#fc8019"
              enableBackground="new 0 0 32 32"
              height="20"
              viewBox="0 0 32 32"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="star">
                <path d="m29.911 13.75-6.229 6.072 1.471 8.576c.064.375-.09.754-.398.978-.174.127-.381.191-.588.191-.159 0-.319-.038-.465-.115l-7.702-4.049-7.701 4.048c-.336.178-.745.149-1.053-.076-.308-.224-.462-.603-.398-.978l1.471-8.576-6.23-6.071c-.272-.266-.371-.664-.253-1.025s.431-.626.808-.681l8.609-1.25 3.85-7.802c.337-.683 1.457-.683 1.794 0l3.85 7.802 8.609 1.25c.377.055.69.319.808.681s.019.758-.253 1.025z" />
              </g>
            </svg>
            <svg
              fill="#fc8019"
              enableBackground="new 0 0 32 32"
              height="20"
              viewBox="0 0 32 32"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="star">
                <path d="m29.911 13.75-6.229 6.072 1.471 8.576c.064.375-.09.754-.398.978-.174.127-.381.191-.588.191-.159 0-.319-.038-.465-.115l-7.702-4.049-7.701 4.048c-.336.178-.745.149-1.053-.076-.308-.224-.462-.603-.398-.978l1.471-8.576-6.23-6.071c-.272-.266-.371-.664-.253-1.025s.431-.626.808-.681l8.609-1.25 3.85-7.802c.337-.683 1.457-.683 1.794 0l3.85 7.802 8.609 1.25c.377.055.69.319.808.681s.019.758-.253 1.025z" />
              </g>
            </svg>
            <svg
              fill="#fc8019"
              enableBackground="new 0 0 32 32"
              height="20"
              viewBox="0 0 32 32"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="star">
                <path d="m29.911 13.75-6.229 6.072 1.471 8.576c.064.375-.09.754-.398.978-.174.127-.381.191-.588.191-.159 0-.319-.038-.465-.115l-7.702-4.049-7.701 4.048c-.336.178-.745.149-1.053-.076-.308-.224-.462-.603-.398-.978l1.471-8.576-6.23-6.071c-.272-.266-.371-.664-.253-1.025s.431-.626.808-.681l8.609-1.25 3.85-7.802c.337-.683 1.457-.683 1.794 0l3.85 7.802 8.609 1.25c.377.055.69.319.808.681s.019.758-.253 1.025z" />
              </g>
            </svg>
            <svg
              fill="#fc8019"
              enableBackground="new 0 0 32 32"
              height="20"
              viewBox="0 0 32 32"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="star">
                <path d="m29.911 13.75-6.229 6.072 1.471 8.576c.064.375-.09.754-.398.978-.174.127-.381.191-.588.191-.159 0-.319-.038-.465-.115l-7.702-4.049-7.701 4.048c-.336.178-.745.149-1.053-.076-.308-.224-.462-.603-.398-.978l1.471-8.576-6.23-6.071c-.272-.266-.371-.664-.253-1.025s.431-.626.808-.681l8.609-1.25 3.85-7.802c.337-.683 1.457-.683 1.794 0l3.85 7.802 8.609 1.25c.377.055.69.319.808.681s.019.758-.253 1.025z" />
              </g>
            </svg>
            <p className="ms-2">({mainDish?.rating} Customer Review)</p>
          </div>
          <p className="pt-4 text-sm text-gray-500 leading-relaxed">
            {mainDish?.description}
          </p>

          <h4 className="block py-4 text-2xl font-bold text-[#fc8019]">
            ${dishPrice}
          </h4>
          <h3 className="mt-1 mb-1 text-gray-600">variation: {variation}</h3>
          <div className="flex gap-3 items-center text-sm">
            {mainDish?.variants.map((curr) => {
              return (
                <span
                  key={curr._id}
                  onClick={() => setVariation(curr.name)}
                  className={`uppercase px-4 h-10 rounded-md mt-3 flex items-center justify-center cursor-pointer border ${
                    variation === curr.name
                      ? " border-[#fc8019] bg-[#fc8019] text-white"
                      : "text-gray-600 border-gray-300"
                  }`}
                >
                  {curr.name}
                </span>
              );
            })}
          </div>
          {/* <div className="flex gap-2 items-center capitalize py-5">
                    {["extra cheese"]}
                    <span onClick={} className="px-5 py-3.5 rounded-2xl border border-gray-300">
                    extra cheese
                  </span>
                  <span className="px-5 py-3.5 rounded-2xl border border-gray-300">
                    extra cheese
                  </span>
                  <span className="px-5 py-3.5 rounded-2xl border border-gray-300">
                  extra cheese
                  </span>
                  </div> */}
          <div className="flex gap-4 items-center py-5">
            <h4 className="text-sm">Quantity</h4>
            <div className="flex items-center border border-gray-300 px-3 py-2 rounded-md">
              <span
                className="cursor-pointer px-0.5 py-2 flex items-center"
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
              >
                <svg
                  clipRule="evenodd"
                  fillRule="evenodd"
                  height={12}
                  imageRendering="optimizeQuality"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                  viewBox="0 0 1.70666 1.70666"
                  width={12}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Layer_x0020_1">
                    <rect height={0.2} rx={0.135} width={1.707} y={0.718} />
                  </g>
                </svg>
              </span>
              <span className="w-10 text-center text-md">{quantity}</span>
              <span
                className="cursor-pointer px-0.5 py-2 flex items-center"
                onClick={() => {
                  if (quantity < 10) {
                    setQuantity(quantity + 1);
                  }
                }}
              >
                <svg
                  height="12"
                  viewBox="0 0 426.66667 426.66667"
                  width="12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
                </svg>
              </span>
            </div>
            <button
              onClick={handleAddCart}
              className={`inline-block text-sm font-medium px-6 py-3 rounded-md transition-all bg-[#fc8019] text-white hover:bg-[#df6703] ${
                cartLoading ? "cursor-not-allowed" : " cursor-pointer"
              }`}
              disabled={cartLoading}
            >
              Add to Cart
            </button>
            <span
              onClick={handleWishlist}
              className="bg-lime-100 p-3 rounded-lg text-gray-700 hover:text-[#027a36] cursor-pointer"
            >
              {!wishlistActive ? <WishlistIcon /> : <WishlistIconRed />}
            </span>
          </div>
          <ul className="text-md">
            <li className="mt-3 text-sm text-gray-600">
              <span className="font-semibold">SKU:</span> FF0018
            </li>
            <li className="mt-3 text-sm text-gray-600">
              <span className="font-semibold">Categories:</span>{" "}
              {mainDish?.category?.name}
            </li>
            <li className="mt-3 text-sm text-gray-600">
              <span className="font-semibold">Tags:</span> BURGERS, PIZZA
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dish;
