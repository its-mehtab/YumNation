import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { notifyError, notifySuccess } from "../../utils/toast";

const CartItem = ({ currProd, products }) => {
  const [quantity, setQuantity] = useState(currProd.quantity);

  const { serverURL } = useAuth();
  const { setCart } = useCart();

  const handleQuantityMinus = async () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);

    try {
      const { data } = await axios.patch(
        `${serverURL}/api/cart`,
        {
          action: "decrease",
          productId: currProd.product._id,
          variant: currProd.variant,
        },
        { withCredentials: true }
      );

      setCart(data);
    } catch (error) {
      console.error("Cart Error:", error?.response?.data || error.message);
      setQuantity(quantity);
      notifyError("Quantity update failed");
    }
  };

  const handleQuantityPlus = async () => {
    if (quantity >= 10) return;
    setQuantity(quantity + 1);

    try {
      const { data } = await axios.patch(
        `${serverURL}/api/cart`,
        {
          action: "increase",
          productId: currProd.product._id,
          variant: currProd.variant,
        },
        { withCredentials: true }
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
          productId: currProd.product._id,
          variant: currProd.variant,
        },
        withCredentials: true,
      });

      setCart(data.cart.items);
      notifySuccess(`${currProd.name} removed from cart`);
    } catch (error) {
      console.log("Delete Cart Error:", error?.response?.data || error.message);
      notifyError("Cart remove failed");
      setQuantity(quantity);
    }
  };

  useEffect(() => {
    setQuantity(currProd.quantity);
  }, [currProd.quantity]);

  return (
    <li key={currProd._id} className="flex gap-4 items-center mb-2">
      <Link
        to={`product/${currProd.product.slug}`}
        className="w-20 min-w-20 h-20 rounded-xl"
      >
        {/* <img src={currProd.image} alt="" className="w-full" /> */}
        <img src={products[0].img} alt="" className="w-full" />
      </Link>
      <div>
        <h3 className="text-lg">
          <Link to={`product/${currProd.product.slug}`}>{currProd.name}</Link>
        </h3>
        <div className="flex gap-3 items-center mt-1">
          <div className="flex justify-start items-center border border-gray-300 rounded-md">
            <span
              className="cursor-pointer px-2 py-3 flex items-center"
              onClick={handleQuantityMinus}
            >
              <svg
                clipRule="evenodd"
                fillRule="evenodd"
                height={8}
                imageRendering="optimizeQuality"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                viewBox="0 0 1.70666 1.70666"
                width={8}
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
              className="w-10 text-center text-sm outline-0"
            />
            <span
              className="cursor-pointer px-2 py-3 flex items-center"
              onClick={handleQuantityPlus}
            >
              <svg
                height="8"
                viewBox="0 0 426.66667 426.66667"
                width="8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
              </svg>
            </span>
          </div>
          <span
            onClick={handleDeleteCart}
            className="cursor-pointer p-1 ml-auto text-sm text-gray-800 hover:text-black underline"
          >
            remove
          </span>
        </div>
      </div>
      <div className="ml-auto text-xl font-[bangers] text-[#ed1b2e]">
        ${(currProd.price * currProd.quantity).toFixed(2)}
      </div>
    </li>
  );
};

export default CartItem;
