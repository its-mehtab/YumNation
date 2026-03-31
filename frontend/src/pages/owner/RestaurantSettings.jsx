import { Switch } from "@radix-ui/themes";
import React, { useState, useRef } from "react";
import Field from "../../components/common/Field";
import Input from "../../components/common/Input";
import { useRestaurant } from "../../context/owner/RestaurantContext";
import axios from "axios";
import { useAuth } from "../../context/user/AuthContext";
import slugify from "slugify";

// ── Mock data ─────────────────────────────────────────────────────────────────
const mockSettings = {
  name: "Pizza Palace",
  slug: "pizza-palace",
  description:
    "Authentic Italian pizza made with fresh ingredients and wood-fired ovens.",
  email: "contact@pizzapalace.com",
  phone: "+91 9876543210",
  logo: null,
  coverImage: null,
  address: {
    addressLine1: "42 Park Street",
    addressLine2: "Ground Floor",
    city: "Kolkata",
    state: "West Bengal",
    pinCode: "700016",
  },
  openingHours: { open: "10:00", close: "23:00" },
  deliveryTime: 35,
  minOrderAmount: 10,
  deliveryFee: 2.5,
  isPureVeg: false,
  isOpen: true,
};

const Section = ({ title, desc, children }) => (
  <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.05)] overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-100">
      <p className="text-sm font-bold text-gray-700">{title}</p>
      {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
    </div>
    <div className="p-6 space-y-4">{children}</div>
  </div>
);

const tabs = ["General", "Address", "Hours & Delivery", "Danger Zone"];

// ── Main ──────────────────────────────────────────────────────────────────────
const RestaurantSettings = () => {
  const { restaurant } = useRestaurant();
  const [form, setForm] = useState(restaurant);
  const [activeTab, setActiveTab] = useState("General");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const logoRef = useRef();
  const coverRef = useRef();
  const { serverURL } = useAuth();

  const set = (path, value) => {
    const keys = path.split(".");
    setForm((prev) => {
      const next = { ...prev };
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const handleImage = (e, key) => {
    const file = e.target.files[0];
    if (file) set(key, URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.patch(`${serverURL}/api/owner/restaurant`, form, {
        withCredentials: true,
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.log("Restaurant Error:", error?.response?.data || error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-700">Settings</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage your restaurant profile and preferences
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors disabled:opacity-60"
        >
          {saving ? "Saving..." : saved ? "✅ Saved!" : "💾 Save Changes"}
        </button>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all
              ${
                activeTab === tab
                  ? tab === "Danger Zone"
                    ? "bg-red-500 text-white shadow-sm"
                    : "bg-white text-[#fc8019] shadow-sm"
                  : tab === "Danger Zone"
                    ? "text-red-400"
                    : "text-gray-400"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* ── General ── */}
        {activeTab === "General" && (
          <>
            {/* Images */}
            <Section
              title="Brand"
              desc="Your logo and cover image shown to customers"
            >
              <div className="flex gap-6 items-start">
                {/* Logo */}
                <div className="text-center">
                  <div
                    onClick={() => logoRef.current.click()}
                    className="w-24 h-24 rounded-2xl border-2 border-dashed border-[#fc8019] bg-orange-50 flex items-center justify-center cursor-pointer hover:bg-orange-100 transition-colors overflow-hidden"
                  >
                    {form.logo ? (
                      <img
                        src={form.logo}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl">🍽️</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Logo</p>
                  <input
                    ref={logoRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImage(e, "logo")}
                  />
                </div>
                {/* Cover */}
                <div className="flex-1">
                  <div
                    onClick={() => coverRef.current.click()}
                    className="w-full h-32 rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-100 transition-colors overflow-hidden"
                  >
                    {form.coverImage ? (
                      <img
                        src={form.coverImage}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <span className="text-3xl mb-1">🖼️</span>
                        <p className="text-xs text-gray-400 font-medium">
                          Upload Cover Image
                        </p>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Cover Image — shown at the top of your restaurant page
                  </p>
                  <input
                    ref={coverRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImage(e, "coverImage")}
                  />
                </div>
              </div>
            </Section>

            {/* Basic info */}
            <Section
              title="Basic Info"
              desc="Public-facing restaurant information"
            >
              <div className="grid grid-cols-2 gap-4">
                <Field label="Restaurant Name">
                  <Input
                    value={form.name}
                    onChange={(e) => {
                      const slug = slugify(e.target.value, {
                        lower: true,
                        strict: true,
                      });

                      set("slug", slug);
                      set("name", e.target.value);
                    }}
                    placeholder="Restaurant Name"
                  />
                </Field>
                <Field
                  label="Slug"
                  hint="Auto-generated from name — used in your URL"
                >
                  <div className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors bg-white">
                    {form.slug || "..."}
                  </div>
                </Field>
              </div>
              <Field label="Description">
                <textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="Tell customers about your restaurant..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors resize-none"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Email">
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="contact@restaurant.com"
                  />
                </Field>
                <Field label="Phone">
                  <Input
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+91 9876543210"
                  />
                </Field>
              </div>
            </Section>

            {/* Preferences */}
            <Section title="Preferences">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Pure Veg Restaurant
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Show green "Pure Veg" banner on your page
                    </p>
                  </div>
                  <Switch
                    checked={form.isPureVeg}
                    onCheckedChange={() => set("isPureVeg", !form.isPureVeg)}
                  />
                </div>
                <div className="flex items-center justify-between py-2 border-t border-gray-50">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Open for Orders
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Toggle to temporarily stop accepting orders
                    </p>
                  </div>
                  <Switch
                    checked={form.isOpen}
                    onCheckedChange={() => set("isOpen", !form.isOpen)}
                  />
                </div>
              </div>
            </Section>
          </>
        )}

        {/* ── Address ── */}
        {activeTab === "Address" && (
          <Section
            title="Delivery Address"
            desc="Your restaurant's physical address"
          >
            <Field label="Address Line 1">
              <Input
                value={form.address.addressLine1}
                onChange={(e) => set("address.addressLine1", e.target.value)}
                placeholder="Street address"
              />
            </Field>
            <Field label="Address Line 2 (Optional)">
              <Input
                value={form.address.addressLine2}
                onChange={(e) => set("address.addressLine2", e.target.value)}
                placeholder="Apartment, floor, etc."
              />
            </Field>
            <div className="grid grid-cols-3 gap-4">
              <Field label="City">
                <Input
                  value={form.address.city}
                  onChange={(e) => set("address.city", e.target.value)}
                  placeholder="City"
                />
              </Field>
              <Field label="State">
                <Input
                  value={form.address.state}
                  onChange={(e) => set("address.state", e.target.value)}
                  placeholder="State"
                />
              </Field>
              <Field label="Pin Code">
                <Input
                  value={form.address.pinCode}
                  onChange={(e) => set("address.pinCode", e.target.value)}
                  placeholder="700016"
                />
              </Field>
            </div>
          </Section>
        )}

        {/* ── Hours & Delivery ── */}
        {activeTab === "Hours & Delivery" && (
          <>
            <Section
              title="Opening Hours"
              desc="When customers can place orders"
            >
              <div className="grid grid-cols-2 gap-4">
                <Field label="Opens At">
                  <Input
                    type="time"
                    value={form.openingHours.open}
                    onChange={(e) => set("openingHours.open", e.target.value)}
                  />
                </Field>
                <Field label="Closes At">
                  <Input
                    type="time"
                    value={form.openingHours.close}
                    onChange={(e) => set("openingHours.close", e.target.value)}
                  />
                </Field>
              </div>
            </Section>

            <Section
              title="Delivery Settings"
              desc="Control how delivery works for your restaurant"
            >
              <div className="grid grid-cols-3 gap-4">
                <Field
                  label="Delivery Time (minutes)"
                  hint="Estimated time to deliver"
                >
                  <Input
                    type="number"
                    value={form.deliveryTime}
                    onChange={(e) => set("deliveryTime", e.target.value)}
                    placeholder="30"
                  />
                </Field>
                <Field label="Delivery Fee ($)" hint="Charged per order">
                  <Input
                    type="number"
                    value={form.deliveryFee}
                    onChange={(e) => set("deliveryFee", e.target.value)}
                    placeholder="2.50"
                    step="0.5"
                  />
                </Field>
                <Field
                  label="Minimum Order ($)"
                  hint="Orders below this are rejected"
                >
                  <Input
                    type="number"
                    value={form.minOrderAmount}
                    onChange={(e) => set("minOrderAmount", e.target.value)}
                    placeholder="10"
                  />
                </Field>
              </div>
            </Section>
          </>
        )}

        {/* ── Danger Zone ── */}
        {activeTab === "Danger Zone" && (
          <div className="bg-white rounded-2xl border-2 border-red-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-red-100 bg-red-50">
              <p className="text-sm font-bold text-red-500">Danger Zone</p>
              <p className="text-xs text-red-400 mt-0.5">
                These actions are permanent and cannot be undone
              </p>
            </div>
            <div className="p-6 space-y-5">
              {/* Temporarily close */}
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <p className="text-sm font-bold text-gray-700">
                    Temporarily Close Restaurant
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Stop accepting orders without deleting your account. You can
                    reopen anytime.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => set("isOpen", false)}
                  className="px-4 py-2 rounded-lg border-2 border-yellow-300 text-yellow-600 text-sm font-semibold hover:bg-yellow-50 transition-colors shrink-0"
                >
                  Close Restaurant
                </button>
              </div>

              {/* Delete all dishes */}
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <p className="text-sm font-bold text-gray-700">
                    Delete All Dishes
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Permanently remove all dishes from your menu. Orders won't
                    be affected.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    window.confirm("Delete all dishes? This cannot be undone.")
                  }
                  className="px-4 py-2 rounded-lg border-2 border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors shrink-0"
                >
                  Delete All Dishes
                </button>
              </div>

              {/* Delete account */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-bold text-red-600">
                    Delete Restaurant Account
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Permanently delete your restaurant, all dishes, and data.
                    This cannot be reversed.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    window.confirm(
                      "Are you absolutely sure? This will permanently delete your restaurant.",
                    )
                  }
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors shrink-0"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab !== "Danger Zone" && (
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60"
            >
              {saving ? "Saving..." : saved ? "✅ Saved!" : "💾 Save Changes"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default RestaurantSettings;
