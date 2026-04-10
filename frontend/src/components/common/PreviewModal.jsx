import { TargetIcon } from "@radix-ui/react-icons";
import { Dialog } from "@radix-ui/themes";
import React, { useState } from "react";
import DialogBox from "../dialog-box/DialogBox";
import { ViewIcon } from "../../assets/icon/Icons";

const PreviewModal = ({ promo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!promo) return null;
  return (
    <DialogBox
      isModalOpen={isModalOpen}
      btn={
        <button
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#fc8019] transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          <ViewIcon />
        </button>
      }
    >
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <Dialog.Title>
            <span className="text-[11px] font-['Poppins'] font-bold text-gray-400 uppercase tracking-widest">
              User Preview
            </span>
          </Dialog.Title>
          <Dialog.Description>
            <span className="text-sm font-bold text-gray-700 mt-0.5">
              How customers see this
            </span>
          </Dialog.Description>
        </div>
      </div>

      <div className="px-5 py-4 bg-orange-50/40 border-b border-dashed border-orange-100">
        <div className="flex items-center gap-3 bg-white border border-orange-100 rounded-xl p-3 shadow-sm">
          <div className="w-10 h-10 min-w-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
            <TargetIcon className="text-[#fc8019]" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-gray-400 mt-0.5 tracking-wider uppercase">
              {promo.subTitle}
            </p>
            <p className="text-sm font-bold text-gray-800">{promo.title}</p>
          </div>
          <span className="ml-auto font-mono text-xs font-bold bg-orange-50 text-orange-500 border border-orange-100 px-2 py-1 rounded-lg">
            {promo.code}
          </span>
        </div>
      </div>

      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-sm font-bold text-gray-800 mb-1">{promo.title}</p>
        <p className="text-xs text-gray-500 leading-relaxed">
          {promo.discountType === "flat"
            ? `Get ₹${promo.value} off on orders above ₹${promo.minOrderAmount || 0}`
            : `Get ${promo.value}% off (upto ₹${promo.maxDiscount ?? "∞"}) on orders above ₹${promo.minOrderAmount || 0}`}
        </p>
      </div>

      <div className="px-5 py-4">
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">
          termsAndConditions & Conditions
        </p>
        <ul className="flex flex-col gap-2">
          {(promo.termsAndConditions || []).map((t, i) => (
            <li
              key={i}
              className="flex gap-2.5 text-xs text-gray-500 leading-relaxed"
            >
              <span className="text-[#fc8019] shrink-0 mt-px">•</span>
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="px-5 pb-5">
        <button
          onClick={() => setIsModalOpen(false)}
          className="w-full py-2.5 text-sm font-semibold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
        >
          Close Preview
        </button>
      </div>
    </DialogBox>
  );
};

export default PreviewModal;
