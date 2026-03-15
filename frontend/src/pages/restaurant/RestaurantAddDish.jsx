import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/restaurant/Input";
import Field from "../../components/restaurant/Field";
import { Switch } from "@radix-ui/themes";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { DeleteIcon, PlusIcon } from "../../assets/icon/Icons";
import { notifySuccess } from "../../utils/toast";
import { useCategory } from "../../context/CategoryContext";

// ── Initial state ─────────────────────────────────────────────────────────────
const initialForm = {
  name: "",
  shortDescription: "",
  longDescription: "",
  categoryId: "",
  price: "",
  cost: "",
  stock: "",
  variants: [],
  addOns: [],
  foodType: "veg",
  isAvailable: true,
  isFeatured: false,
};

// ── Main ──────────────────────────────────────────────────────────────────────
const RestaurantAddDish = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [dishImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [variantInput, setVariantInput] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const [addOnInput, setAddOnInput] = useState({ name: "", price: "" });

  const { serverURL } = useAuth();
  const { categories } = useCategory();
  const dishImageRef = useRef();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleToggle = (key) =>
    setForm((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleDishImage = (e) => {
    const file = e.target.files[0];
    if (file) setMainImage({ file, preview: URL.createObjectURL(file) });
  };

  // ── Variants ──
  const addVariant = () => {
    if (!variantInput.name.trim() || !variantInput.price || !variantInput.stock)
      return;

    setForm((prev) => ({
      ...prev,
      ["variants"]: [...prev.variants, variantInput],
    }));
    setVariantInput({ name: "", price: "", stock: "" });
  };

  const removeVariant = (name) =>
    setForm((prev) => ({
      ...prev,
      ["variants"]: prev.variants.filter((v) => v.name !== name),
    }));

  // ── Add-ons ──
  const addAddOn = () => {
    if (!addOnInput.name.trim() || !addOnInput.price) return;
    setForm((prev) => ({
      ...prev,
      ["addOns"]: [...prev.addOns, addOnInput],
    }));
    setAddOnInput({ name: "", price: "" });
  };

  const removeAddOn = (name) =>
    setForm((prev) => ({
      ...prev,
      ["addOns"]: prev.addOns.filter((a) => a.name !== name),
    }));

  const handleClear = () => {
    setForm(initialForm);
    setMainImage(null);
  };

  const handleSubmit = async (e) => {
    console.log({ ...form });

    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${serverURL}/api/dish`,
        { ...form },
        { withCredentials: true },
      );

      navigate("/restaurant/dishes");
      notifySuccess(`${form.name} added successfully`);
    } catch (error) {
      console.log(error);

      console.log("Add Dish Error:", error?.response?.data || error.message);
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
            to="/restaurant/dishes"
            className="hover:text-[#fc8019] transition-colors"
          >
            My Menu
          </Link>
          <span className="text-gray-300">›</span>
          <span className="text-[#fc8019] font-medium">Add Dish</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-5">
          {/* ── Left — images + toggles ── */}
          <div className="col-span-3 space-y-4">
            {/* Main image */}
            <div
              onClick={() => dishImageRef.current.click()}
              className="aspect-square rounded-2xl border-2 border-dashed border-[#fc8019] bg-orange-50 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-100 transition-colors overflow-hidden"
            >
              {dishImage ? (
                <img
                  src={dishImage.preview}
                  alt="main"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  <div className="text-3xl mb-2">📷</div>
                  <p className="text-xs text-gray-400 font-medium">
                    Main Image
                  </p>
                </div>
              )}
              <input
                ref={dishImageRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleDishImage}
              />
            </div>

            {/* Toggles */}
            <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-700">
                    Available
                  </p>
                  <p className="text-xs text-gray-400">Visible to customers</p>
                </div>
                <Switch
                  color="orange"
                  checked={form.isAvailable}
                  onCheckedChange={() => handleToggle("isAvailable")}
                />
              </div>
              <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                <div>
                  <p className="text-xs font-semibold text-gray-700">
                    Featured
                  </p>
                  <p className="text-xs text-gray-400">Show on home page</p>
                </div>
                <Switch
                  color="orange"
                  checked={form.isFeatured}
                  onCheckedChange={() => handleToggle("isFeatured")}
                />
              </div>
            </div>
          </div>

          {/* ── Right — form fields ── */}
          <div className="col-span-9 space-y-5">
            {/* ── Basic Info ── */}
            <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] p-6 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Basic Info
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Dish Name" required>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Margherita Pizza"
                  />
                </Field>
                <Field label="Category" required>
                  <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-[#fc8019] transition-colors bg-white"
                  >
                    <option value="">Select category...</option>
                    {categories.map((cat) => {
                      return (
                        <option value={cat._id} key={cat._id}>
                          {cat.name}
                        </option>
                      );
                    })}
                  </select>
                </Field>
              </div>
              <Field label="Short Description" required>
                <Input
                  name="shortDescription"
                  value={form.shortDescription}
                  onChange={handleChange}
                  placeholder="Brief shortDescription shown on menu cards"
                />
              </Field>
              <Field
                label="Long Description"
                hint="Shown on the dish detail page"
              >
                <textarea
                  name="longDescription"
                  value={form.longDescription}
                  onChange={handleChange}
                  placeholder="Describe ingredients, cooking method, taste..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors resize-none"
                />
              </Field>
            </div>

            {/* ── Pricing & Stock ── */}
            <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] p-6 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Pricing & Stock
              </p>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Selling Price ($)" required>
                  <Input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    type="number"
                    min="0"
                  />
                </Field>
                <Field label="Cost Price ($)" hint="Not visible to customers">
                  <Input
                    name="cost"
                    value={form.cost}
                    onChange={handleChange}
                    placeholder="0.00"
                    type="number"
                    min="0"
                  />
                </Field>
                <Field
                  label="Stock / stock"
                  required
                  hint="Leave 0 if using variants"
                >
                  <Input
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="0"
                    type="number"
                    min="0"
                  />
                </Field>
              </div>
              <Field label="Food Type" required>
                <div className="flex gap-3 mt-1">
                  {["veg", "non-veg", "vegan"].map((type) => (
                    <label
                      key={type}
                      className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl border-2 transition-all text-xs font-semibold
                      ${form.foodType === type ? "border-[#fc8019] bg-orange-50 text-[#fc8019]" : "border-gray-200 text-gray-400"}`}
                    >
                      <input
                        type="radio"
                        name="foodType"
                        value={type}
                        checked={form.foodType === type}
                        onChange={handleChange}
                        className="hidden"
                      />
                      {type === "veg" ? "🟢" : type === "non-veg" ? "🔴" : "🌿"}{" "}
                      {type}
                    </label>
                  ))}
                </div>
              </Field>
            </div>

            {/* ── Variants ── */}
            <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] p-6 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Variants
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  e.g. Small / Medium / Large — each with its own price and
                  stock
                </p>
              </div>

              {/* Existing variants */}
              {form.variants?.length > 0 && (
                <div className="overflow-hidden rounded-xl border border-gray-100">
                  {/* Header */}
                  <div className="grid grid-cols-12 px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <p className="col-span-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Name
                    </p>
                    <p className="col-span-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Price
                    </p>
                    <p className="col-span-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Stock
                    </p>
                    <p className="col-span-1" />
                  </div>
                  {form.variants.map((v, i) => (
                    <div
                      key={v.id}
                      className={`grid grid-cols-12 items-center px-4 py-3 ${i !== form.variants.length - 1 ? "border-b border-gray-50" : ""}`}
                    >
                      <p className="col-span-5 text-sm font-semibold text-gray-700">
                        {v.name}
                      </p>
                      <p className="col-span-3 text-sm font-bold text-[#fc8019]">
                        ${v.price}
                      </p>
                      <p className="col-span-3 text-sm text-gray-500">
                        {v.stock} units
                      </p>
                      <div className="col-span-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeVariant(v.name)}
                          className="text-red-400 hover:text-red-500 hover:bg-red-50 p-1 rounded-lg transition-colors"
                        >
                          <DeleteIcon size="13" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add variant input */}
              <div className="flex items-center gap-3">
                <input
                  value={variantInput.name}
                  onChange={(e) =>
                    setVariantInput((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Variant name (e.g. Large)"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors"
                />
                <input
                  value={variantInput.price}
                  onChange={(e) =>
                    setVariantInput((p) => ({ ...p, price: e.target.value }))
                  }
                  placeholder="Price ($)"
                  type="number"
                  min="0"
                  className="w-28 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors"
                />
                <input
                  value={variantInput.stock}
                  onChange={(e) =>
                    setVariantInput((p) => ({ ...p, stock: e.target.value }))
                  }
                  placeholder="Stock"
                  type="number"
                  min="0"
                  className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors"
                />
                <button
                  type="button"
                  onClick={addVariant}
                  disabled={
                    !variantInput.name.trim() ||
                    !variantInput.price ||
                    !variantInput.stock
                  }
                  className="flex gap-1 items-center px-4 py-2 rounded-lg bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold transition-colors whitespace-nowrap disabled:opacity-40"
                >
                  <PlusIcon color={"#fff"} />
                  Add
                </button>
              </div>
            </div>

            {/* ── Add-ons ── */}
            <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] p-6 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Add-ons
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  e.g. Extra Cheese, Olives, Jalapeños — optional extras
                  customers can choose
                </p>
              </div>

              {/* Existing add-ons */}
              {form.addOns.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.addOns.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl px-3 py-2"
                    >
                      <span className="text-xs font-semibold text-gray-700">
                        {a.name}
                      </span>
                      <span className="text-xs font-bold text-[#fc8019]">
                        +${a.price}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeAddOn(a.name)}
                        className="text-red-400 hover:text-red-500 transition-colors ml-1"
                      >
                        <DeleteIcon size="13" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add add-on input */}
              <div className="flex items-center gap-3">
                <input
                  value={addOnInput.name}
                  onChange={(e) =>
                    setAddOnInput((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Add-on name (e.g. Extra Cheese)"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors"
                />
                <input
                  value={addOnInput.price}
                  onChange={(e) =>
                    setAddOnInput((p) => ({ ...p, price: e.target.value }))
                  }
                  placeholder="Price ($)"
                  type="number"
                  min="0"
                  className="w-28 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors"
                />
                <button
                  type="button"
                  onClick={addAddOn}
                  disabled={!addOnInput.name.trim() || !addOnInput.price}
                  className="flex gap-1 items-center px-4 py-2 rounded-lg bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold transition-colors whitespace-nowrap disabled:opacity-40"
                >
                  <PlusIcon color={"#fff"} /> Add
                </button>
              </div>
            </div>

            {/* ── Footer buttons ── */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleClear}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                🗑️ Clear
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold transition-colors disabled:opacity-60"
              >
                💾 {loading ? "Saving..." : "Save Dish"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RestaurantAddDish;
