import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';

const FixedSlider = ({ values = [0, 25, 50, 75, 100], onValueChange }) => {
  const [value, setValue] = useState([values[0]]);

  const handleValueChange = (newValue) => {
    const closestValue = values.reduce((prev, curr) =>
      Math.abs(curr - newValue[0]) < Math.abs(prev - newValue[0]) ? curr : prev
    );
    setValue([closestValue]);
  };

  useEffect(() => {
    if (onValueChange) {
      onValueChange(value[0]);
    }
  }, [value, onValueChange]);

  return (
    <div className="w-full max-w-sm space-y-4">
      <Slider
        value={value}
        onValueChange={handleValueChange}
        max={Math.max(...values)}
        min={Math.min(...values)}
        step={1}
        className="w-full"
      />
    </div>
  );
};

export default FixedSlider;