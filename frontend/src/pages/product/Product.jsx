import React, { useState } from "react";
import { Link } from "react-router-dom";
import { WishlistIcon, WishlistIconRed } from "../../assets/icon/Icons";
import ProductTab from "../../components/product-tab/ProductTab";

const Product = () => {
  const [size, setSize] = useState("s");
  const [addOns, setAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [wishlistActive, setWishlistActive] = useState(false);

  return (
    <>
      <section className="py-20 my-20">
        <div className="mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
          <ul className="flex mb-5">
            <li>
              <Link href="/" className="text-md">
                Home
              </Link>
            </li>
            <li className="text-md before:content-['/'] before:mx-2">Shop</li>
          </ul>
          <div className="grid grid-cols-2">
            <div></div>
            <div className="md:pr-5">
              <h2 className="text-5xl leading-tight">
                SAUSAGE, EGG & CHEESE CROISSAN’WICH
              </h2>
              <div className="flex items-center gap-0.5 py-3 border-b border-gray-300">
                <svg
                  fill="#fb9300"
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
                  fill="#fb9300"
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
                  fill="#fb9300"
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
                  fill="#fb9300"
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
                  fill="#fb9300"
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
                <p className="ms-2">(1 Customer Review)</p>
              </div>
              <p className="pt-4">
                Numquam odit accusantium odit aut commodi et. Nostrum est atque
                ut dolorum. Et sequi aut atque doloribus qui. Iure amet in
                voluptate reiciendis. Perspiciatis consequatur aperiam
                repellendus velit quia est minima.
              </p>
              <h4 className="inline-block py-4 text-3xl text-[#ed1b2e]">
                $8.99
              </h4>
              {/* <ul>
                  <li>Free global shipping on all orders</li>
                  <li>30 days easy returns if you change your mind</li>
                  <li>Order before noon for same day dispatch</li>
                </ul> */}
              <h3 className="mt-1 mb-1">Size: {size}</h3>
              <div className="flex items-center text-lg">
                <span
                  onClick={() => setSize("s")}
                  className={`uppercase w-12 h-12 flex items-center justify-center cursor-pointer ${
                    size === "s"
                      ? "border-2 border-y-gray-950"
                      : "border border-gray-300"
                  }`}
                >
                  s
                </span>
                <span
                  onClick={() => setSize("m")}
                  className={`uppercase w-12 h-12 flex items-center justify-center cursor-pointer ${
                    size === "m"
                      ? "border-2 border-y-gray-950"
                      : "border border-gray-300"
                  }`}
                >
                  m
                </span>
                <span
                  onClick={() => setSize("l")}
                  className={`uppercase w-12 h-12 flex items-center justify-center cursor-pointer ${
                    size === "l"
                      ? "border-2 border-y-gray-950"
                      : "border border-gray-300"
                  }`}
                >
                  l
                </span>
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
              <div className="flex gap-5 items-center py-5">
                <h4 className="text-xl">Quantity</h4>
                <div className="flex items-center border border-gray-300 px-3 py-1 rounded-xl">
                  <span
                    className="cursor-pointer px-1 py-4 flex items-center"
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
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min={1}
                    max={10}
                    className="w-14 text-center text-xl outline-0"
                  />
                  <span
                    className="cursor-pointer px-1 py-4 flex items-center"
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
                <div
                  href="#"
                  className="inline-block bg-[#fb9300] text-white font-[bangers] px-12 py-4 rounded-xl transition-all duration-300 ease-in-out hover:bg-[#df8302] cursor-pointer"
                >
                  Add to Cart
                </div>
                <span
                  onClick={() => setWishlistActive(!wishlistActive)}
                  className="bg-lime-100 p-4 rounded-lg text-gray-700 hover:text-[#027a36] cursor-pointer"
                >
                  {!wishlistActive ? <WishlistIcon /> : <WishlistIconRed />}
                </span>
              </div>
              <ul className="text-md">
                <li className="mt-2">
                  <span className="font-bold">SKU:</span> FF0018
                </li>
                <li className="mt-2">
                  <span className="font-bold">Categories:</span> BEVERAGES,
                  BURGER, BURRITO, Home page, SUSHI
                </li>
                <li className="mt-2">
                  <span className="font-bold">Tags:</span> BURGERS, PIZZA
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <ProductTab />
    </>
  );
};

export default Product;
