import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialForm = {
  name: "",
  description: "",
  longDescription: "",
  category: "",
  sellingPrice: "",
  costPrice: "",
  quantity: "",
  deliveryType: "",
  foodType: "",
  hasDiscount: false,
  discountValue: "",
  hasExpiry: false,
  expiresAt: "",
  returnPolicy: false,
  saleStartOn: "",
  saleEndOn: "",
  isAvailable: true,
  isFeatured: false,
};

const AddDish = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const mainImageRef = useRef();
  const additionalImageRef = useRef();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleToggle = (key) => {
    setForm((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (file) setMainImage({ file, preview: URL.createObjectURL(file) });
  };

  const handleAdditionalImages = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
    }));
    setAdditionalImages((prev) => [...prev, ...previews].slice(0, 4));
  };

  const handleClear = () => {
    setForm(initialForm);
    setMainImage(null);
    setAdditionalImages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: replace with actual API call
      console.log("Form data:", form);
      await new Promise((r) => setTimeout(r, 1000));
      navigate("/admin/dishes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-700">Add Dish</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link
            to="/admin/dishes"
            className="hover:text-[#fc8019] transition-colors"
          >
            Dishes
          </Link>
          <span className="text-gray-300">›</span>
          <span className="text-[#fc8019] font-medium">Add Dish</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-5">
          {/* ── Left — images ── */}
          <div className="col-span-3 space-y-4">
            {/* Main image */}
            <div
              onClick={() => mainImageRef.current.click()}
              className="aspect-square rounded-2xl border-2 border-dashed border-[#fc8019] bg-orange-50 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-100 transition-colors overflow-hidden"
            >
              {mainImage ? (
                <img
                  src={mainImage.preview}
                  alt="main"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  <div className="text-3xl mb-2">📷</div>
                  <p className="text-xs text-gray-400 font-medium">
                    Upload Image
                  </p>
                </div>
              )}
              <input
                ref={mainImageRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleMainImage}
              />
            </div>

            {/* Additional images */}
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">
                Additional Images
              </p>
              <div className="grid grid-cols-2 gap-2">
                {additionalImages.map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl overflow-hidden border border-orange-100"
                  >
                    <img
                      src={img.preview}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {additionalImages.length < 4 && (
                  <div
                    onClick={() => additionalImageRef.current.click()}
                    className="aspect-square rounded-xl border-2 border-dashed border-[#fc8019] bg-orange-50 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-100 transition-colors"
                  >
                    <span className="text-xl">+</span>
                    <p className="text-xs text-gray-400 mt-1">Upload</p>
                    <input
                      ref={additionalImageRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleAdditionalImages}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Right — form fields ── */}
          <div className="col-span-9 bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] p-6 space-y-5">
            {/* Row 1 — Name + Description */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                  Product Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                  Description
                </label>
                <input
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Short Description"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors"
                />
              </div>
            </div>

            {/* Row 2 — Category + Long Description */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    Product Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-[#fc8019] transition-colors bg-white"
                  >
                    <option value="">Select...</option>
                    <option value="pizza">Pizza</option>
                    <option value="burger">Burger</option>
                    <option value="noodles">Noodles</option>
                    <option value="dessert">Dessert</option>
                  </select>
                </div>

                {/* Selling + Cost Price */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                      Selling Price
                    </label>
                    <input
                      name="sellingPrice"
                      value={form.sellingPrice}
                      onChange={handleChange}
                      placeholder="Selling Price"
                      type="number"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                      Cost Price
                    </label>
                    <input
                      name="costPrice"
                      value={form.costPrice}
                      onChange={handleChange}
                      placeholder="Cost Price"
                      type="number"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors"
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    Quantity
                  </label>
                  <input
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="Quantity In Stock"
                    type="number"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors"
                  />
                </div>

                {/* Delivery Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    Delivery Type
                  </label>
                  <select
                    name="deliveryType"
                    value={form.deliveryType}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-[#fc8019] transition-colors bg-white"
                  >
                    <option value="">Select...</option>
                    <option value="standard">Standard</option>
                    <option value="express">Express</option>
                  </select>
                </div>

                {/* Discount toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-500">
                    Discount
                  </label>
                  <div className="flex items-center gap-3">
                    {form.hasDiscount && (
                      <input
                        name="discountValue"
                        value={form.discountValue}
                        onChange={handleChange}
                        placeholder="Value %"
                        type="number"
                        className="w-24 border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#fc8019]"
                      />
                    )}
                    <Toggle
                      checked={form.hasDiscount}
                      onChange={() => handleToggle("hasDiscount")}
                    />
                  </div>
                </div>

                {/* Expiry toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-500">
                    Expiry Date
                  </label>
                  <div className="flex items-center gap-3">
                    {form.hasExpiry && (
                      <input
                        name="expiresAt"
                        value={form.expiresAt}
                        onChange={handleChange}
                        type="date"
                        className="w-36 border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#fc8019]"
                      />
                    )}
                    <Toggle
                      checked={form.hasExpiry}
                      onChange={() => handleToggle("hasExpiry")}
                    />
                  </div>
                </div>
              </div>

              {/* Long description + right side toggles */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    Product Long Description
                  </label>
                  <textarea
                    name="longDescription"
                    value={form.longDescription}
                    onChange={handleChange}
                    placeholder="Add a long description for your product"
                    rows={7}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors resize-none"
                  />
                </div>

                {/* Return policy */}
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-500">
                    Return Policy
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">
                      {form.returnPolicy ? "Returnable" : "Non-returnable"}
                    </span>
                    <Toggle
                      checked={form.returnPolicy}
                      onChange={() => handleToggle("returnPolicy")}
                    />
                  </div>
                </div>

                {/* Sale dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                      Sale Start On
                    </label>
                    <input
                      name="saleStartOn"
                      value={form.saleStartOn}
                      onChange={handleChange}
                      type="date"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-[#fc8019] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                      Sale End On
                    </label>
                    <input
                      name="saleEndOn"
                      value={form.saleEndOn}
                      onChange={handleChange}
                      type="date"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-[#fc8019] transition-colors"
                    />
                  </div>
                </div>

                {/* Food type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    Food Type
                  </label>
                  <div className="flex gap-3">
                    {["veg", "non-veg", "vegan"].map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-1.5 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="foodType"
                          value={type}
                          checked={form.foodType === type}
                          onChange={handleChange}
                          className="accent-[#fc8019]"
                        />
                        <span className="text-xs text-gray-600 capitalize">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Featured toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-500">
                    Featured
                  </label>
                  <Toggle
                    checked={form.isFeatured}
                    onChange={() => handleToggle("isFeatured")}
                  />
                </div>
              </div>
            </div>

            {/* ── Footer buttons ── */}
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                🗑️ Clear
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold transition-colors disabled:opacity-60"
              >
                💾 {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

// ── Toggle switch component ──────────────────────────────────────────────────
const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${checked ? "bg-[#fc8019]" : "bg-gray-200"}`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
    />
  </button>
);

export default AddDish;
