import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 10;

const RangeSlider = ({ filters, setFilters }) => {
  const [range, setRange] = useState([0, 100]);

  const handleChange = (event, newValue, activeThumb) => {
    if (activeThumb === 0) {
      setRange([Math.min(newValue[0], range[1] - minDistance), range[1]]);
    } else {
      setRange([range[0], Math.max(newValue[1], range[0] + minDistance)]);
    }
  };

  const handleChangeCommitted = () => {
    setFilters((prev) => ({
      ...prev,
      minPrice: range[0],
      maxPrice: range[1],
    }));
  };

  return (
    <>
      <Slider
        sx={{
          color: "#fc8019",
        }}
        getAriaLabel={() => "Minimum distance"}
        value={range}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="off"
        getAriaValueText={valuetext}
        max={100}
        disableSwap
      />

      <div className="flex gap-4.5 items-center mt-2">
        <div className="flex items-center gap-2 border border-gray-300 px-2 py-1.5 w-1/2">
          <span className="text-gray-600">$</span>
          <span className="text-end w-full">{range[0]}</span>
        </div>
        <span>to</span>
        <div className="flex items-center gap-2 border border-gray-300 px-2 py-1.5 w-1/2">
          <span className="text-gray-600">$</span>
          <span className="text-end w-full">{range[1]}</span>
        </div>
      </div>
    </>
  );
};

export default RangeSlider;
