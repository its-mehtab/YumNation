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

  const calendarClassNames = {
    root: "w-full text-sm",
    months: "flex flex-col sm:flex-row justify-center gap-8",
    month: "space-y-4",
    month_caption: "flex justify-center items-center h-9 relative",
    caption_label: "text-sm font-semibold text-gray-800",
    nav: "absolute inset-x-0 top-0 ml-auto pe-5 pt-5 max-w-26 flex items-center justify-between",
    button_previous:
      "h-8 w-8 inline-flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors",
    button_next:
      "h-8 w-8 inline-flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors",
    month_grid: "w-full border-collapse",
    weekdays: "flex",
    weekday: "w-10 text-center text-xs font-medium text-gray-400",
    week: "flex w-full mt-1",
    day: "relative h-10 w-10 p-0 text-center text-sm",
    day_button:
      "h-10 w-10 rounded-lg inline-flex items-center justify-center text-gray-700 hover:bg-orange-50 hover:text-[#fc8019] transition-colors focus:outline-none focus:ring-2 focus:ring-orange-200",
    selected: "bg-[#fc8019] text-white rounded-lg",
    range_start: "bg-[#fc8019] text-white rounded-l-lg rounded-r-none",
    range_end: "bg-[#fc8019] text-white rounded-r-lg rounded-l-none",
    range_middle: "bg-orange-50 text-[#fc8019] rounded-none",
    today: "font-bold text-[#fc8019]",
    outside: "text-gray-300",
    disabled: "text-gray-300 opacity-40 cursor-not-allowed",
    hidden: "invisible",
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
          mode="range"
          selected={dateRange}
          onSelect={(range) => setDateRange(range || {})}
          numberOfMonths={2}
          disabled={{ after: new Date() }}
          defaultMonth={dateRange.from}
          showOutsideDays
          classNames={calendarClassNames}
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
