import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CartIcon,
  MinusIcon,
  PlusIcon,
} from "../../assets/icon/Icons";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { notifyError } from "../../utils/toast";
import axios from "axios";

// ── Mock cart data (replace with useCart()) ───────────────────────────────────
const mockCart = {
  items: [
    {
      _id: "1",
      name: "Margherita Pizza",
      price: 12,
      quantity: 2,
      image: null,
      variant: 'Large (12")',
    },
    {
      _id: "2",
      name: "Garlic Bread",
      price: 5,
      quantity: 1,
      image: null,
      variant: null,
    },
    {
      _id: "3",
      name: "Coke",
      price: 2.5,
      quantity: 2,
      image: null,
      variant: "Regular (330ml)",
    },
  ],
  restaurant: "Pizza Palace",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const { serverURL } = useAuth();
  const { cart, setCart } = useCart();

  const addOns = item.addOns.map((a) => a.name);

  const handleQuantityMinus = async () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }

    try {
      const { data } = await axios.patch(
        `${serverURL}/api/cart`,
        {
          action: "decrease",
          dishId: item.dish._id,
          variant: item.variant.name,
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
          dishId: item.dish._id,
          variant: item.variant.name,
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

  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
      {/* Image */}
      <div className="w-12 h-12 min-w-12 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-xl overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          "🍕"
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-700 truncate">
          {item.name}
        </p>
        {(item.variant || item.addOns.length > 0) && (
          <p className="text-xs text-gray-400 mt-0.5">
            {item.variant.name}
            {item.addOns.length > 0 && (
              <>
                {" "}
                |{" "}
                {item.addOns
                  .map((a) => a.name)
                  .sort()
                  .join("+")}
              </>
            )}
          </p>
        )}
        <p className="text-xs font-bold text-[#fc8019] mt-0.5">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleQuantityMinus}
          className="w-7 h-7 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-bold flex items-center justify-center transition-colors"
        >
          <MinusIcon />
        </button>
        <span className="text-sm font-bold text-gray-700 w-4 text-center">
          {quantity}
        </span>
        <button
          onClick={handleQuantityPlus}
          className="w-7 h-7 rounded-md bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-bold flex items-center justify-center transition-colors"
        >
          <PlusIcon color={"#fff"} />
        </button>
      </div>
    </div>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
const FloatingCart = () => {
  //   const [cart, setCart] = useState(mockCart);
  const [open, setOpen] = useState(false);
  const [animateBtn, setAnimateBtn] = useState(false);
  const popupRef = useRef();
  const prevCountRef = useRef(0);

  const { cart, setCart } = useCart();

  const totalItems = cart?.items?.reduce((a, i) => a + i.quantity, 0);
  const totalPrice = cart?.items?.reduce((a, i) => a + i.price * i.quantity, 0);

  // animate button when cart count changes
  useEffect(() => {
    if (totalItems > prevCountRef.current) {
      setAnimateBtn(true);
      setTimeout(() => setAnimateBtn(false), 400);
    }
    prevCountRef.current = totalItems;
  }, [totalItems]);

  // close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  //   const handleIncrease = (id) =>
  //     setCart((prev) => ({
  //       ...prev,
  //       items: prev.items.map((i) =>
  //         i._id === id ? { ...i, quantity: i.quantity + 1 } : i,
  //       ),
  //     }));

  //   const handleDecrease = (id) =>
  //     setCart((prev) => ({
  //       ...prev,
  //       items: prev.items
  //         .map((i) => (i._id === id ? { ...i, quantity: i.quantity - 1 } : i))
  //         .filter((i) => i.quantity > 0),
  //     }));

  const handleRemove = (id) =>
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i._id !== id),
    }));

  // hide if cart is empty
  if (totalItems === 0) return null;

  return (
    <>
      <style>{`
        @keyframes popIn {
          0%   { transform: scale(1) }
          40%  { transform: scale(1.2) }
          70%  { transform: scale(0.92) }
          100% { transform: scale(1) }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97) }
          to   { opacity: 1; transform: translateY(0)    scale(1)    }
        }
        @keyframes fadeIn {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
        .pop-in     { animation: popIn 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) }
        .slide-up   { animation: slideUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) both }
        .fade-in    { animation: fadeIn 0.2s ease both }
      `}</style>

      <div
        ref={popupRef}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      >
        {/* ── Cart popup ── */}
        {open && (
          <div className="slide-up w-80 bg-white rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div>
                <p className="text-xs font-bold text-gray-700">Your Order</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  from{" "}
                  <span className="text-[#fc8019] font-semibold">
                    {cart.restaurant.name}
                  </span>
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-400 flex items-center justify-center transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="px-4 max-h-72 overflow-y-auto">
              {cart.items.map((item) => (
                <CartItem key={item._id} item={item} onRemove={handleRemove} />
              ))}
            </div>

            {/* Bill summary */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Delivery fee</span>
                <span className="font-semibold">$2.50</span>
              </div>
            </div>

            <div className="p-3">
              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between w-full bg-[#fc8019] hover:bg-[#e5721f] text-white px-4 py-3 rounded-md transition-colors"
              >
                <span className="text-xs font-semibold">
                  {totalItems} items
                </span>
                <span className="text-sm font-semibold flex gap-1 items-center">
                  Checkout <ArrowRight size="14" />
                </span>
                <span className="text-xs font-semibold">
                  ${(totalPrice + 2.5).toFixed(2)}
                </span>
              </Link>
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen((p) => !p)}
          className={`flex items-center gap-3 bg-[#fc8019] hover:bg-[#e5721f] text-white pl-4 pr-5 py-3.5 rounded-md shadow-[0_4px_20px_rgba(252,128,25,0.5)] transition-colors ${animateBtn ? "pop-in" : ""}`}
        >
          <div className="relative">
            <CartIcon />
            <span className="absolute -top-1 -right-2 w-4 h-4 bg-white text-[#fc8019] text-xs font-medium rounded-full flex items-center justify-center leading-none">
              {totalItems}
            </span>
          </div>

          <div className="text-left">
            <p className="text-xs font-semibold leading-none">
              {totalItems} item{totalItems > 1 ? "s" : ""}
            </p>
            <p className="text-xs opacity-80 mt-0.5 leading-none">
              {cart?.restaurant?.name}
            </p>
          </div>

          <div className="w-px h-6 bg-white/30 mx-1" />

          <span className="text-sm font-semibold">
            ${totalPrice?.toFixed(2)}
          </span>
        </button>
      </div>
    </>
  );
};

export default FloatingCart;
