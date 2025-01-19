import { useEffect, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { useListingStore } from '@/store/store';
import { Button } from '@/components/ui/button';
import { useListing } from '@/hooks/useListing';

const PriceStep = () => {
  const { listingData, updateListing } = useListingStore();
  const { mutate } = useListing();
  const [price, setPrice] = useState([listingData.price]);

  useEffect(() => {
    updateListing('price', price[0]);
  }, [price, updateListing]);

  console.log(listingData);

  const onSubmit = () => {
    console.log('Data sent to API:', listingData);
    mutate(listingData, {
      onSuccess: () => {
        console.log('uspjesno');
      },
      onError: () => {
        console.log('neuspjesno');
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-10 py-8 min-h-screen mt-9">
      <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Select Price Per Night
        </h2>

        <Slider
          value={price}
          step={1}
          min={1}
          max={1000}
          onValueChange={(newValue) => setPrice(newValue)}
          className="w-full"
        />

        <div className="flex justify-between mt-6 text-lg">
          <span className="text-gray-600">Price:</span>
          <span className="font-semibold text-green-600">${price[0]}</span>
        </div>

        <p className="mt-4 text-md text-gray-500 text-center">
          Use the slider to set the price per night for your listing. Make sure
          to pick a competitive price!
        </p>
      </div>

      <div className="w-full max-w-lg text-center">
        <h2 className="text-2xl font-medium text-gray-700 mb-4">
          Ready to post your listing?
        </h2>
        <p className="text-md text-gray-500 mb-6">
          Ensure all the details, including the price, are set correctly. Click
          the button below to finalize your listing.
        </p>
        <Button
          onClick={onSubmit}
          variant="destructive"
          className="w-full py-3 text-lg font-semibold bg-red-500 text-white hover:bg-red-600 transition rounded-md"
        >
          Post Your Listing
        </Button>
      </div>
    </div>
  );
};

export default PriceStep;
