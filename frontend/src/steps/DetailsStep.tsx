// Import your Zustand store
import { Label } from '@/components/ui/label';
import {
  ListingSchemaType,
  registerSchema,
} from '../../../backend/src/shared/libs/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useListingStore } from '@/store/store';

const DetailsStep = () => {
  const { listingData, updateDetails, updateListing } = useListingStore(); // Access Zustand store methods
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListingSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const [bedrooms, setBedrooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [livingRoom, setLivingRoom] = useState(0);
  const [wc, setWc] = useState(0);
  const [isSelected, setIsSelected] = useState<string[]>([]);

  const handleSelect = (index: string) => {
    setIsSelected((prev) => {
      const updatedSelection = prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index];

      updateDetails('amenities', updatedSelection);
      return updatedSelection;
    });
  };

  const amenities = [
    'Wi-Fi',
    'TV',
    'Kitchen',
    'Wash machine',
    'Free parking',
    'Air conditioner',
    'Pool',
    'Garden',
    'Gym',
    'Beach access',
    'Fire alarm',
    'First aid',
    'CO2 alarm',
  ];

  const handleIncrease = (key: keyof ListingSchemaType) => {
    const updatedValue = bedrooms + 1;
    setBedrooms(updatedValue);
    updateDetails(key, updatedValue);
  };

  const handleDecrease = (key: keyof ListingSchemaType) => {
    const updatedValue = Math.max(bedrooms - 1, 0);
    setBedrooms(updatedValue);
    updateDetails(key, updatedValue);
  };

  const handleIncreateBeds = (key: keyof ListingSchemaType) => {
    const updatedValue = beds + 1;
    setBeds(updatedValue);
    updateDetails(key, updatedValue);
  };

  const handleDecreaseBeds = (key: keyof ListingSchemaType) => {
    const updatedValue = Math.max(beds - 1, 0);
    setBeds(updatedValue);
    updateDetails(key, updatedValue);
  };

  const handleIncreaseLivingRoom = (key: keyof ListingSchemaType) => {
    const updatedValue = livingRoom + 1;
    setLivingRoom(updatedValue);
    updateDetails(key, updatedValue);
  };

  const handleDecreaseLivingRoom = (key: keyof ListingSchemaType) => {
    const updatedValue = Math.max(livingRoom - 1, 0);
    setLivingRoom(updatedValue);
    updateDetails(key, updatedValue);
  };

  const handleIncreaseWc = (key: keyof ListingSchemaType) => {
    const updatedValue = wc + 1;
    setWc(updatedValue);
    updateDetails(key, updatedValue);
  };

  const handleDecreaseWc = (key: keyof ListingSchemaType) => {
    const updatedValue = Math.max(wc - 1, 0);
    setWc(updatedValue);
    updateDetails(key, updatedValue);
  };

  const onSubmit = (data: ListingSchemaType) => {
    updateDetails('name', data.name);
    updateDetails('description', data.description);
  };
  console.log(listingData);

  return (
    <div className="flex flex-row items-center justify-between mt-10">
      <div className="w-1/2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            <Label>Listing name</Label>
            <Input
              {...register('name')}
              placeholder="Enter the name of your listing"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-3 mt-3">
            <Label>Listing description</Label>
            <Textarea
              {...register('description')}
              placeholder="Enter description for your listing"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <h2 className="py-5 text-2xl">Rooms information:</h2>
          <Separator />
          <div className="flex flex-row items-center justify-between p-8">
            <h2 className="text-2xl">Bedroom</h2>
            <div className="flex items-center gap-4">
              <Button type="button" onClick={() => handleIncrease('bedrooms')}>
                +
              </Button>
              <p>{bedrooms}</p>
              <Button type="button" onClick={() => handleDecrease('bedrooms')}>
                -
              </Button>
            </div>
          </div>
          {/* Repeat similar blocks for WC, Living Room, and Beds */}
        </form>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {amenities.map((amenity) => (
          <div
            key={amenity}
            onClick={() => handleSelect(amenity)}
            className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer ${
              isSelected.includes(amenity)
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-gray-200 text-black border-gray-300'
            }`}
          >
            {amenity}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsStep;
