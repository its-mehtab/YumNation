import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { WishlistIcon, WishlistIconRed } from "../../assets/icon/Icons";
import ProductTab from "../../components/product-tab/ProductTab";
import "./product.css";
import ProductGallery from "./ProductGallery";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { notifyError, notifySuccess } from "../../utils/toast";
import { useWishlist } from "../../context/WishlistContext";
import { fetchAvailibility } from "../../utils/availibility";

const Product = () => {
  const [variation, setVariation] = useState("");
  //   const [addOns, setAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [wishlistActive, setWishlistActive] = useState(false);
  const [mainProduct, setMainProduct] = useState(null);

  const { slug } = useParams();
  const { serverURL } = useAuth();
  const { setCart, loading, setLoading } = useCart();
  const {
    wishlist,
    setWishlist,
    loading: wishlistLoad,
    setLoading: wishlistSetLoad,
  } = useWishlist();

  const getMainProduct = async () => {
    const { data } = await axios.get(`${serverURL}/api/products/${slug}`);

    setMainProduct(data);

    setVariation(data.variants[0].name);
  };

  const handleAddCart = async () => {
    if (isSoldOut || isUnavailable) {
      notifyError(`${mainProduct.name} is ${statusText}`);
      return;
    }
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${serverURL}/api/cart`,
        {
          product: mainProduct._id,
          name: mainProduct.name,
          image: "kjgdh.jpg",
          price: mainProduct?.variants.find((curr) => curr.name === variation)
            .price,
          quantity,
          variant: variation,
        },
        { withCredentials: true },
      );

      setCart(data);
      notifySuccess(`${mainProduct.name} added to cart`);
    } catch (error) {
      console.log("Cart Error:", error?.response?.data || error.message);
      setCart(null);
      notifyError(error?.response?.data?.message || "Failed to add item");
    } finally {
      setLoading(false);
    }
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
          productId: mainProduct._id,
          name: mainProduct.name,
          image: "kjgdh.jpg",
          price: mainProduct.price,
        },
        { withCredentials: true },
      );

      setWishlist(data);

      notifySuccess(
        !wishlistActive
          ? `${mainProduct.name} Added to wishlist ❤️`
          : `${mainProduct.name} Removed from wishlist`,
      );
    } catch (error) {
      console.log("Cart Error:", error?.response?.data || error.message);
      setWishlistActive(prevState);
      notifyError("Wishlist update failed");
    } finally {
      wishlistSetLoad(false);
    }
  };

  const syncWishlistState = async () => {
    const isWishlisted = wishlist?.find(
      (item) => item.product._id === mainProduct?._id,
    );

    setWishlistActive(!!isWishlisted);
  };
  useEffect(() => {
    syncWishlistState();
  }, [wishlist, mainProduct?._id]);

  useEffect(() => {
    getMainProduct();
  }, [slug]);

  const { isSoldOut, isUnavailable, statusText } = mainProduct
    ? fetchAvailibility(mainProduct)
    : {};

  return (
    <>
      <section className={`${isSoldOut || isUnavailable ? "grayscale" : ""}`}>
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
                {mainProduct?.name}
              </li>
            </ul>
            <ProductGallery />
          </div>
          <div className="col-span-5 md:pr-5">
            {(isSoldOut || isUnavailable) && (
              <h3 className="mb-3 bg-[#fc8019] text-white px-3 py-1 rounded-md inline-block">
                {statusText}
              </h3>
            )}
            <h2 className="text-2xl font-semibold text-gray-600">
              {mainProduct?.name}
            </h2>
            <div className="flex items-center gap-0.5 py-3 border-b border-[#fc8019]">
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
              <p className="ms-2">({mainProduct?.rating} Customer Review)</p>
            </div>
            <p className="pt-4 text-sm text-gray-500 leading-relaxed">
              {mainProduct?.description}
            </p>

            <h4 className="block py-4 text-2xl font-bold text-[#fc8019]">
              $
              {mainProduct?.variants
                .find((curr) => curr.name === variation)
                .price.toFixed(2)}
            </h4>
            <h3 className="mt-1 mb-1 text-gray-600">variation: {variation}</h3>
            <div className="flex gap-3 items-center text-sm">
              {mainProduct?.variants.map((curr) => {
                // console.log(curr);

                return (
                  <span
                    key={curr._id}
                    onClick={() => setVariation(curr.name)}
                    className={`uppercase px-3 h-10 rounded-lg mt-3 flex items-center justify-center cursor-pointer border ${
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
              <div className="flex items-center border border-gray-300 px-3 py-1 rounded-xl">
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
                  loading ? "cursor-not-allowed" : " cursor-pointer"
                }`}
                disabled={loading}
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
                {mainProduct?.category?.name}
              </li>
              <li className="mt-3 text-sm text-gray-600">
                <span className="font-semibold">Tags:</span> BURGERS, PIZZA
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* <ProductTab /> */}
    </>
  );
};

export default Product;
