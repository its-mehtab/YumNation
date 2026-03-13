import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@radix-ui/themes";
import Input from "../../components/restaurant/Input";
import Field from "../../components/restaurant/Field";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useRestaurant } from "../../context/restaurant/RestaurantContext";

// ── Step config ───────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, title: "Basic Info", desc: "Tell us about your restaurant" },
  { id: 2, title: "Location", desc: "Where are you located?" },
  { id: 3, title: "Hours & Delivery", desc: "When and how do you deliver?" },
  {
    id: 4,
    title: "Review & Submit",
    desc: "Check everything before submitting",
  },
];

const initialForm = {
  // Step 1
  name: "",
  description: "",
  email: "",
  phone: "",
  logo: "sdf",
  coverImage: "sdf",
  isPureVeg: false,
  // Step 2
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pinCode: "",
  // Step 3
  openTime: "10:00",
  closeTime: "23:00",
  deliveryTime: 30,
  deliveryFee: 2.5,
  minOrderAmount: 10,
};

const ReviewRow = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-gray-50 last:border-0 text-sm">
    <span className="text-gray-400">{label}</span>
    <span className="text-gray-700 font-semibold text-right max-w-56">
      {value || <span className="text-gray-300 font-normal">—</span>}
    </span>
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const RestaurantApply = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // const logoRef = useRef();
  // const coverRef = useRef();

  const { serverURL, logout } = useAuth();
  const { restaurant, setRestaurant } = useRestaurant();

  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // const handleImage = (e, key) => {
  //   const file = e.target.files[0];
  //   if (file) set(key, URL.createObjectURL(file));
  // };

  // ── Validation per step ──
  const validate = () => {
    const errs = {};
    if (step === 1) {
      if (!form.name.trim()) errs.name = "Restaurant name is required";
      if (!form.description.trim())
        errs.description = "Description is required";
      if (!form.email.trim()) errs.email = "Email is required";
      if (!form.phone.trim()) errs.phone = "Phone is required";
    }
    if (step === 2) {
      if (!form.addressLine1.trim()) errs.addressLine1 = "Address is required";
      if (!form.city.trim()) errs.city = "City is required";
      if (!form.state.trim()) errs.state = "State is required";
      if (!form.pinCode.trim()) errs.pinCode = "Pin code is required";
    }
    if (step === 3) {
      if (!form.deliveryTime) errs.deliveryTime = "Required";
      if (!form.deliveryFee && form.deliveryFee !== 0)
        errs.deliveryFee = "Required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validate()) setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      const { data } = await axios.post(
        `${serverURL}/api/restaurant/apply`,
        form,
        {
          withCredentials: true,
        },
      );

      setRestaurant(data);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div
          className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.08)] max-w-md w-full p-10 text-center"
          style={{ animation: "fadeUp 0.5s ease both" }}
        >
          <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }`}</style>
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            Application Submitted!
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            Thanks for applying! Our team will review your application and get
            back to you within{" "}
            <strong className="text-gray-600">2–3 business days</strong>. You'll
            receive an email once you're approved.
          </p>
          <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 text-left mb-6">
            <p className="text-xs font-semibold text-[#fc8019] mb-1">
              What happens next?
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>✅ Application received</li>
              <li>⏳ Admin reviews your details</li>
              <li>📧 You'll get an approval email</li>
              <li>🚀 Your dashboard unlocks</li>
            </ul>
          </div>
          <button
            onClick={logout}
            className="w-full bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold py-3 rounded-xl transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-5 pb-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ── Header ── */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🍽️</div>
          <h1 className="text-2xl font-bold text-gray-700">Partner with Us</h1>
          <p className="text-sm text-gray-400 mt-1">
            Fill in your restaurant details to apply for listing
          </p>
        </div>

        {/* ── Stepper ── */}
        <div className="flex items-center mb-8">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
                  ${
                    step > s.id
                      ? "bg-[#fc8019] border-[#fc8019] text-white"
                      : step === s.id
                        ? "border-[#fc8019] bg-white text-[#fc8019]"
                        : "border-gray-200 bg-white text-gray-300"
                  }`}
                >
                  {step > s.id ? "✓" : s.id}
                </div>
                <p
                  className={`text-xs mt-1.5 font-semibold whitespace-nowrap ${step >= s.id ? "text-gray-600" : "text-gray-300"}`}
                >
                  {s.title}
                </p>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 mb-4 transition-all ${step > s.id ? "bg-[#fc8019]" : "bg-gray-200"}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── Card ── */}
        <div className="bg-white rounded-2xl shadow-[0_0_2.3125rem_rgba(8,21,66,0.08)] overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-orange-50">
            <p className="text-sm font-bold text-gray-700">
              {STEPS[step - 1].title}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {STEPS[step - 1].desc}
            </p>
          </div>

          <div className="p-6 space-y-4">
            {/* ── Step 1 — Basic Info ── */}
            {step === 1 && (
              <>
                {/* Images */}
                <div className="flex gap-4 items-start">
                  {/* <div className="text-center">
                    <div
                      onClick={() => logoRef.current.click()}
                      className="w-20 h-20 rounded-2xl border-2 border-dashed border-[#fc8019] bg-orange-50 flex items-center justify-center cursor-pointer hover:bg-orange-100 transition-colors overflow-hidden"
                    >
                      {form.logo ? (
                        <img
                          src={form.logo}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl">📷</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">Logo</p>
                    <input
                      ref={logoRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      // onChange={(e) => handleImage(e, "logo")}
                    />
                  </div> */}
                  {/* <div className="flex-1">
                    <div
                      onClick={() => coverRef.current.click()}
                      className="w-full h-24 rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-100 transition-colors overflow-hidden"
                    >
                      {form.coverImage ? (
                        <img
                          src={form.coverImage}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          <span className="text-2xl">🖼️</span>
                          <p className="text-xs text-gray-400 mt-1">
                            Upload Cover Image
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      ref={coverRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      // onChange={(e) => handleImage(e, "coverImage")}
                    />
                  </div> */}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Restaurant Name" required>
                    <Input
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Pizza Palace"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                    )}
                  </Field>
                  <Field label="Contact Email" required>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="contact@restaurant.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </Field>
                </div>

                <Field label="Phone Number" required>
                  <Input
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+91 9876543210"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
                  )}
                </Field>

                <Field label="Description" required>
                  <textarea
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="Tell customers about your restaurant, cuisine, and specialties..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 outline-none focus:border-[#fc8019] transition-colors resize-none"
                  />
                  {errors.description && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.description}
                    </p>
                  )}
                </Field>

                <div className="flex items-center justify-between py-3 px-4 bg-green-50 rounded-xl border border-green-100">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Pure Veg Restaurant
                    </p>
                    <p className="text-xs text-gray-400">
                      We serve only vegetarian food
                    </p>
                  </div>
                  <Switch
                    color="orange"
                    checked={form.isPureVeg}
                    onCheckedChange={() => set("isPureVeg", !form.isPureVeg)}
                  />
                </div>
              </>
            )}

            {/* ── Step 2 — Location ── */}
            {step === 2 && (
              <>
                <Field label="Address Line 1" required>
                  <Input
                    value={form.addressLine1}
                    onChange={(e) => set("addressLine1", e.target.value)}
                    placeholder="Street address, building name"
                  />
                  {errors.addressLine1 && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.addressLine1}
                    </p>
                  )}
                </Field>
                <Field
                  label="Address Line 2"
                  hint="Apartment, floor, landmark (optional)"
                >
                  <Input
                    value={form.addressLine2}
                    onChange={(e) => set("addressLine2", e.target.value)}
                    placeholder="Floor, landmark..."
                  />
                </Field>
                <div className="grid grid-cols-3 gap-4">
                  <Field label="City" required>
                    <Input
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      placeholder="Kolkata"
                    />
                    {errors.city && (
                      <p className="text-xs text-red-400 mt-1">{errors.city}</p>
                    )}
                  </Field>
                  <Field label="State" required>
                    <Input
                      value={form.state}
                      onChange={(e) => set("state", e.target.value)}
                      placeholder="West Bengal"
                    />
                    {errors.state && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors.state}
                      </p>
                    )}
                  </Field>
                  <Field label="Pin Code" required>
                    <Input
                      value={form.pinCode}
                      onChange={(e) => set("pinCode", e.target.value)}
                      placeholder="700016"
                    />
                    {errors.pinCode && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors.pinCode}
                      </p>
                    )}
                  </Field>
                </div>
              </>
            )}

            {/* ── Step 3 — Hours & Delivery ── */}
            {step === 3 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Opens At">
                    <Input
                      type="time"
                      value={form.openTime}
                      onChange={(e) => set("openTime", e.target.value)}
                    />
                  </Field>
                  <Field label="Closes At">
                    <Input
                      type="time"
                      value={form.closeTime}
                      onChange={(e) => set("closeTime", e.target.value)}
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Field
                    label="Delivery Time (min)"
                    hint="Estimated delivery time"
                  >
                    <Input
                      type="number"
                      value={form.deliveryTime}
                      onChange={(e) => set("deliveryTime", e.target.value)}
                      placeholder="30"
                    />
                    {errors.deliveryTime && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors.deliveryTime}
                      </p>
                    )}
                  </Field>
                  <Field label="Delivery Fee ($)">
                    <Input
                      type="number"
                      value={form.deliveryFee}
                      onChange={(e) => set("deliveryFee", e.target.value)}
                      placeholder="2.50"
                      step="0.5"
                    />
                    {errors.deliveryFee && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors.deliveryFee}
                      </p>
                    )}
                  </Field>
                  <Field label="Min Order ($)" hint="Minimum order amount">
                    <Input
                      type="number"
                      value={form.minOrderAmount}
                      onChange={(e) => set("minOrderAmount", e.target.value)}
                      placeholder="10"
                    />
                  </Field>
                </div>
              </>
            )}

            {/* ── Step 4 — Review ── */}
            {step === 4 && (
              <div className="space-y-5">
                <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3">
                  <p className="text-xs font-semibold text-[#fc8019]">
                    Please review your details before submitting.
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Our team will verify and approve your application within 2–3
                    business days.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Basic Info
                  </p>
                  <ReviewRow label="Restaurant Name" value={form.name} />
                  <ReviewRow label="Email" value={form.email} />
                  <ReviewRow label="Phone" value={form.phone} />
                  <ReviewRow label="Description" value={form.description} />
                  <ReviewRow
                    label="Pure Veg"
                    value={form.isPureVeg ? "Yes ✅" : "No"}
                  />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Location
                  </p>
                  <ReviewRow
                    label="Address"
                    value={`${form.addressLine1}${form.addressLine2 ? `, ${form.addressLine2}` : ""}`}
                  />
                  <ReviewRow label="City" value={form.city} />
                  <ReviewRow label="State" value={form.state} />
                  <ReviewRow label="Pin Code" value={form.pinCode} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Hours & Delivery
                  </p>
                  <ReviewRow
                    label="Hours"
                    value={`${form.openTime} – ${form.closeTime}`}
                  />
                  <ReviewRow
                    label="Delivery Time"
                    value={`${form.deliveryTime} min`}
                  />
                  <ReviewRow
                    label="Delivery Fee"
                    value={`$${form.deliveryFee}`}
                  />
                  <ReviewRow
                    label="Min Order"
                    value={`$${form.minOrderAmount}`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── Navigation ── */}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-30"
            >
              ← Back
            </button>

            <div className="flex items-center gap-1.5">
              {STEPS.map((s) => (
                <div
                  key={s.id}
                  className={`w-2 h-2 rounded-full transition-all ${step === s.id ? "bg-[#fc8019] w-5" : step > s.id ? "bg-orange-200" : "bg-gray-200"}`}
                />
              ))}
            </div>

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold transition-colors"
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-[#fc8019] hover:bg-[#e5721f] text-white text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Application 🚀"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantApply;
