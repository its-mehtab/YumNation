import { Dialog } from "@radix-ui/themes";
import React, { useState } from "react";
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import DialogBox from "../dialog-box/DialogBox";

const DateSelectorModal = ({ onApply }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dateRange, setDateRange] = useState({
    from: dayjs().subtract(6, "day").toDate(),
    to: dayjs().toDate(),
  });

  const handleApply = () => {
    const { from, to } = dateRange;

    if (!from || !to) return;

    onApply?.({
      startDate: dayjs(from).startOf("day").toISOString(),
      endDate: dayjs(to).endOf("day").toISOString(),
    });

    setIsModalOpen(false);
  };

  return (
    <DialogBox
      isModalOpen={isModalOpen}
      size={"800px"}
      btn={
        <button
          type="button"
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => setIsModalOpen(true)}
        >
          Custom date
        </button>
      }
    >
      <div className="px-5 py-4 border-b border-gray-100">
        <Dialog.Title>
          <span className="text-[11px] font-['Poppins'] font-bold text-gray-400 uppercase tracking-widest">
            Custom Date Range
          </span>
        </Dialog.Title>

        <Dialog.Description>
          <span className="text-sm font-bold text-gray-700 mt-0.5 block">
            Select a start and end date to filter your dashboard analytics.
          </span>
        </Dialog.Description>
      </div>

      <div className="px-5 py-5 overflow-x-auto">
        <DayPicker
          animate
          mode="range"
          selected={dateRange}
          onSelect={(range) => setDateRange(range || {})}
          numberOfMonths={2}
          disabled={{ after: new Date() }}
          defaultMonth={dateRange.from}
          showOutsideDays
          // classNames={calendarClassNames}
        />
      </div>

      <div className="px-5 pb-5 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2.5 text-sm font-semibold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleApply}
          disabled={!dateRange.from || !dateRange.to}
          className="px-5 py-2.5 text-sm font-semibold text-white bg-[#fc8019] rounded-xl hover:bg-[#e96f10] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Apply
        </button>
      </div>
    </DialogBox>
  );
};

export default DateSelectorModal;
