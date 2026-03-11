import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialForm = {
  name: "",
  ownerName: "",
  email: "",
  phone: "",
  password: "",
  category: "",
  description: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pinCode: "",
  openTime: "",
  closeTime: "",
  deliveryTime: "",
  minOrderAmount: "",
  deliveryFee: "",
  isActive: true,
  isFeatured: false,
  acceptsOnlinePayment: true,
};

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

const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
      {label}
    </label>
    {children}
  </div>
);

const Input = ({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  ...rest
}) => (
  <input
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors"
    {...rest}
  />
);

const SectionTitle = ({ children }) => (
  <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 pb-2 border-b border-gray-100">
    {children}
  </h2>
);

const AddRestaurant = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [logo, setLogo] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const logoRef = useRef();
  const coverRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key) =>
    setForm((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleImage = (e, setter) => {
    const file = e.target.files[0];
    if (file) setter({ file, preview: URL.createObjectURL(file) });
  };

  const handleClear = () => {
    setForm(initialForm);
    setLogo(null);
    setCoverImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Restaurant form:", form);
      await new Promise((r) => setTimeout(r, 1000));
      navigate("/admin/restaurants");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-700">Add Restaurant</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link
            to="/admin/restaurants"
            className="hover:text-[#fc8019] transition-colors"
          >
            Restaurants
          </Link>
          <span className="text-gray-300">›</span>
          <span className="text-[#fc8019] font-medium">Add Restaurant</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ── Images ── */}
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-3">
            <p className="text-xs font-semibold text-gray-500 mb-2">
              Restaurant Logo
            </p>
            <div
              onClick={() => logoRef.current.click()}
              className="aspect-square rounded-2xl border-2 border-dashed border-[#fc8019] bg-orange-50 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-100 transition-colors overflow-hidden"
            >
              {logo ? (
                <img
                  src={logo.preview}
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  <div className="text-4xl mb-2">🏪</div>
                  <p className="text-xs text-gray-400 font-medium">
                    Upload Logo
                  </p>
                </div>
              )}
              <input
                ref={logoRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImage(e, setLogo)}
              />
            </div>
          </div>
          <div className="col-span-9">
            <p className="text-xs font-semibold text-gray-500 mb-2">
              Cover Image
            </p>
            <div
              onClick={() => coverRef.current.click()}
              className="w-full h-full min-h-44 rounded-2xl border-2 border-dashed border-[#fc8019] bg-orange-50 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-100 transition-colors overflow-hidden"
            >
              {coverImage ? (
                <img
                  src={coverImage.preview}
                  alt="cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-xs text-gray-400 font-medium">
                    Upload Cover Image
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Recommended: 1200×400px
                  </p>
                </div>
              )}
              <input
                ref={coverRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImage(e, setCoverImage)}
              />
            </div>
          </div>
        </div>

        {/* ── Form card ── */}
        <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] p-6 space-y-8">
          {/* Basic Info */}
          <div>
            <SectionTitle>Basic Information</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Restaurant Name">
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Pizza Palace"
                />
              </Field>
              <Field label="Category">
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-[#fc8019] transition-colors bg-white"
                >
                  <option value="">Select category...</option>
                  {[
                    "Pizza",
                    "Burger",
                    "Noodles",
                    "Dessert",
                    "Indian",
                    "Chinese",
                    "Italian",
                    "Fast Food",
                  ].map((c) => (
                    <option key={c} value={c.toLowerCase()}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="col-span-2">
                <Field label="Description">
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Brief description of the restaurant..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors resize-none"
                  />
                </Field>
              </div>
            </div>
          </div>

          {/* Owner Info */}
          <div>
            <SectionTitle>Owner / Account</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Owner Name">
                <Input
                  name="ownerName"
                  value={form.ownerName}
                  onChange={handleChange}
                  placeholder="Full name"
                />
              </Field>
              <Field label="Phone">
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  type="tel"
                />
              </Field>
              <Field label="Email">
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="owner@restaurant.com"
                  type="email"
                />
              </Field>
              <Field label="Password">
                <Input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Set login password"
                  type="password"
                />
              </Field>
            </div>
          </div>

          {/* Address */}
          <div>
            <SectionTitle>Address</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Field label="Address Line 1">
                  <Input
                    name="addressLine1"
                    value={form.addressLine1}
                    onChange={handleChange}
                    placeholder="Street, Building"
                  />
                </Field>
              </div>
              <div className="col-span-2">
                <Field label="Address Line 2 (optional)">
                  <Input
                    name="addressLine2"
                    value={form.addressLine2}
                    onChange={handleChange}
                    placeholder="Area, Landmark"
                  />
                </Field>
              </div>
              <Field label="City">
                <Input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </Field>
              <Field label="State">
                <Input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                />
              </Field>
              <Field label="Pin Code">
                <Input
                  name="pinCode"
                  value={form.pinCode}
                  onChange={handleChange}
                  placeholder="700001"
                  type="number"
                />
              </Field>
            </div>
          </div>

          {/* Operations */}
          <div>
            <SectionTitle>Operations</SectionTitle>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <Field label="Opening Time">
                <Input
                  name="openTime"
                  value={form.openTime}
                  onChange={handleChange}
                  type="time"
                />
              </Field>
              <Field label="Closing Time">
                <Input
                  name="closeTime"
                  value={form.closeTime}
                  onChange={handleChange}
                  type="time"
                />
              </Field>
              <Field label="Avg. Delivery Time (mins)">
                <Input
                  name="deliveryTime"
                  value={form.deliveryTime}
                  onChange={handleChange}
                  placeholder="e.g. 30"
                  type="number"
                />
              </Field>
              <Field label="Min. Order Amount ($)">
                <Input
                  name="minOrderAmount"
                  value={form.minOrderAmount}
                  onChange={handleChange}
                  placeholder="e.g. 10"
                  type="number"
                />
              </Field>
              <Field label="Delivery Fee ($)">
                <Input
                  name="deliveryFee"
                  value={form.deliveryFee}
                  onChange={handleChange}
                  placeholder="e.g. 2.50"
                  type="number"
                />
              </Field>
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  label: "Active",
                  key: "isActive",
                  desc: "Visible to customers",
                },
                {
                  label: "Featured",
                  key: "isFeatured",
                  desc: "Show on homepage",
                },
                {
                  label: "Online Payment",
                  key: "acceptsOnlinePayment",
                  desc: "Accept card / UPI",
                },
              ].map((t) => (
                <div
                  key={t.key}
                  className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3"
                >
                  <div>
                    <p className="text-xs font-semibold text-gray-600">
                      {t.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{t.desc}</p>
                  </div>
                  <Toggle
                    checked={form[t.key]}
                    onChange={() => handleToggle(t.key)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
            >
              🗑️ Clear
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/restaurants")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold transition-colors disabled:opacity-60"
            >
              💾 {loading ? "Saving..." : "Save Restaurant"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
