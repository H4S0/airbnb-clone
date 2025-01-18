import { useState } from 'react';
import { Slider } from '@/components/ui/slider';

const PriceStep = () => {
  const [value, setValue] = useState([50]); // Initial value of the slider

  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-xl font-semibold text-center mb-4">
        Select Price Per Night
      </h2>

      <Slider
        defaultValue={value}
        step={1}
        min={1}
        max={1000}
        onValueChange={(newValue) => setValue(newValue)}
        className="w-full"
      />

      <div className="flex justify-between mt-4 text-lg">
        <span className="text-gray-600">Price: </span>
        <span className="font-semibold text-primary">${value[0]}</span>{' '}
      </div>

      <p className="mt-2 text-sm text-gray-500 text-center">
        Set the price per night for your listing.
      </p>
    </div>
  );
};

export default PriceStep;
