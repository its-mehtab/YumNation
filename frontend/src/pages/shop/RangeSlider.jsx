import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 100;

const RangeSlider = () => {
  const [range, setRange] = useState([0, 500]);

  const handleChange = (event, newValue, activeThumb) => {
    if (activeThumb === 0) {
      setRange([Math.min(newValue[0], range[1] - minDistance), range[1]]);
    } else {
      setRange([range[0], Math.max(newValue[1], range[0] + minDistance)]);
    }
  };

  return (
    <>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={range}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        max={500}
        disableSwap
      />

      <div className="flex gap-4.5 items-center">
        <div className="flex items-center gap-2 border border-gray-300 px-2 py-1.5 w-1/2">
          <span className="text-gray-600">$</span>
          <input type="number" value={range[0]} className="text-end w-full" />
        </div>
        <span>to</span>
        <div className="flex items-center gap-2 border border-gray-300 px-2 py-1.5 w-1/2">
          <span className="text-gray-600">$</span>
          <input type="number" value={range[1]} className="text-end w-full" />
        </div>
      </div>
    </>
  );
};

export default RangeSlider;
