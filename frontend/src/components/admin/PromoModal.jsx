import React, { useState } from "react";
import { useCoupon } from "../../context/admin/CouponContext";
import { useAuth } from "../../context/user/AuthContext";
import dayjs from "dayjs";
import axios from "axios";
import DialogBox from "../dialog-box/DialogBox";
import { Dialog } from "@radix-ui/themes";
import SectionDivider from "./SectionDivider";
import Field from "./Field";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { notifyError, notifySuccess } from "../../utils/toast";

const EMPTY_FORM = {
  code: "",
  title: "",
  subTitle: "",
  discountType: "flat",
  value: "",
  minOrderAmount: "",
  maxDiscount: "",
  maxUses: "",
  maxUsesPerUser: "",
  expiresAt: dayjs().add(1, "day"),
  termsAndConditions: "",
};

const PromoModal = ({ initial, btn }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setCoupons } = useCoupon();
  const { serverURL } = useAuth();
  const [form, setForm] = useState(
    initial
      ? {
          ...initial,
          termsAndConditions: (initial.termsAndConditions || []).join("\n"),
          value: String(initial.value),
          minOrderAmount: String(initial.minOrderAmount ?? ""),
          maxDiscount: initial.maxDiscount ?? "",
          maxUses: initial.maxUses,
          maxUsesPerUser: initial.maxUsesPerUser,
          expiresAt: initial.expiresAt
            ? dayjs(initial.expiresAt)
            : dayjs().add(1, "day"),
        }
      : EMPTY_FORM,
  );

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        expiresAt: form.expiresAt.toISOString(),
        termsAndConditions: form.termsAndConditions
          .split("\n")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      let response;

      if (initial) {
        response = await axios.patch(
          `${serverURL}/api/admin/coupon/${initial._id}`,
          payload,
          { withCredentials: true },
        );
      } else {
        response = await axios.post(`${serverURL}/api/admin/coupon`, payload, {
          withCredentials: true,
        });
      }

      setCoupons((prev) =>
        initial
          ? prev.map((p) => (p._id === response.data._id ? response.data : p))
          : [...prev, response.data],
      );
      setIsModalOpen(false);

      notifySuccess(
        initial ? "Coupons updated successfully" : "New coupons added",
      );
    } catch (error) {
      console.log("Coupons Error:", error?.response?.data || error.message);

      notifyError(
        error?.response?.data || (initial ? "Update failed" : "Create failed"),
      );
    }
  };

  return (
    <DialogBox
      isModalOpen={isModalOpen}
      size="600px"
      btn={<div onClick={() => setIsModalOpen(true)}>{btn}</div>}
    >
      {/* ── Modal Header ── */}
      <div className="sticky top-0 z-10 bg-white px-6 pt-4 flex items-center justify-between">
        <div>
          <Dialog.Description>
            <span className="text-[11px] font-['Poppins'] font-bold text-gray-400 uppercase tracking-widest">
              {initial ? "Edit" : "Create"} Promo Code
            </span>
          </Dialog.Description>
          <Dialog.Title>
            <span className="text-base font-['Poppins'] font-bold text-gray-700 mt-0.5">
              {initial ? `Editing — ${initial.code}` : "New discount offer"}
            </span>
          </Dialog.Title>
        </div>
      </div>

      {/* ── Form Body ── */}
      <div className="px-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          {/* Section: Identity */}
          <SectionDivider label="Identity" />

          <Field label="Promo Code *">
            <input
              type="text"
              className="field outline-none uppercase"
              value={form.code}
              onChange={(e) => set("code", e.target.value)}
              placeholder="e.g. SAVE99"
            />
          </Field>

          <Field label="Title *">
            <input
              type="text"
              className="field outline-none"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Items At ₹99"
            />
          </Field>

          <Field label="SubTitle (shown on card)" full>
            <input
              type="text"
              className="field outline-none"
              value={form.subTitle}
              onChange={(e) => set("subTitle", e.target.value)}
              placeholder="e.g. ON SELECT ITEMS"
            />
          </Field>

          {/* Section: Discount */}
          <SectionDivider label="Discount Rules" />

          <Field label="Discount discountType *">
            <select
              className="field outline-none"
              value={form.discountType}
              onChange={(e) => set("discountType", e.target.value)}
            >
              <option value="flat">Flat (fixed amount)</option>
              <option value="percentage">Percentage (%)</option>
            </select>
          </Field>

          <Field label="Discount Value *">
            <input
              className="field outline-none"
              type="number"
              value={form.value}
              onChange={(e) => set("value", e.target.value)}
              placeholder={form.discountType === "flat" ? "e.g. 99" : "e.g. 20"}
            />
          </Field>

          <Field label="Min Order Amount">
            <input
              className="field outline-none"
              type="number"
              value={form.minOrderAmount}
              onChange={(e) => set("minOrderAmount", e.target.value)}
              placeholder="e.g. 199"
            />
          </Field>

          {form.discountType === "percentage" && (
            <Field label="Max Discount Cap (% discountType)">
              <input
                className="field outline-none"
                type="number"
                value={form.maxDiscount}
                onChange={(e) => set("maxDiscount", e.target.value)}
                placeholder="e.g. 150"
              />
            </Field>
          )}

          {/* Section: Validity */}
          <SectionDivider label="Validity & Limits" />

          <Field label="Max Total Uses">
            <input
              className="field outline-none"
              type="number"
              value={form.maxUses}
              onChange={(e) => set("maxUses", e.target.value)}
              placeholder="e.g. 500"
            />
          </Field>

          <Field label="Max Per User">
            <input
              className="field outline-none"
              type="number"
              value={form.maxUsesPerUser}
              onChange={(e) => set("maxUsesPerUser", e.target.value)}
              placeholder="e.g. 5"
            />
          </Field>

          <Field label="Valid Till" full>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={form.expiresAt}
                onChange={(newValue) => {
                  if (newValue !== null) {
                    set("expiresAt", newValue);
                  }
                }}
                slotProps={{
                  textField: { fullWidth: true },
                  popper: { disablePortal: true },
                }}
                disablePast
                minDate={dayjs().add(1, "day").startOf("day")}
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
          </Field>

          {/* Section: termsAndConditions */}
          <SectionDivider label="termsAndConditions & Conditions" />

          <Field label="One term per line" full>
            <textarea
              className="field outline-none resize-none"
              rows={4}
              value={form.termsAndConditions}
              onChange={(e) => set("termsAndConditions", e.target.value)}
              placeholder={
                "Offer valid on select restaurants\nCannot be combined with other couponss\nOffer valid till Dec 31, 2026"
              }
            />
          </Field>
        </div>
      </div>

      {/* ── Modal Footer ── */}
      <div className="sticky bottom-0 bg-white px-6 py-4 flex justify-end gap-2">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 text-sm font-semibold text-gray-500 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-5 py-2 text-sm font-semibold text-white bg-[#fc8019] hover:bg-[#e5721f] rounded-md transition-colors"
        >
          {initial ? "Save Changes" : "Create Promo Code"}
        </button>
      </div>
    </DialogBox>
  );
};

export default PromoModal;
