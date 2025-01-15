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
import { Checkbox } from '@/components/ui/checkbox';

const DetailsStep = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListingSchemaType>({
    resolver: zodResolver(registerSchema),
  });
  const [bedrooms, setBedrooms] = useState(0);
  {
    /* dodati za ostale sobe stateove */
  }
  const [isSelected, setIsSelected] = useState<string[]>([]);

  const handleSelect = (index: string) => {
    setIsSelected((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
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

  const handleIncrease = () => {
    setBedrooms(bedrooms + 1);
  };

  const handleDecrease = () => {
    setBedrooms(bedrooms - 1);
  };

  return (
    <div className="flex flex-row items-center justify-between mt-10">
      <div className="w-1/2">
        <form action="">
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
              placeholder="Enter description for you listing"
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
              <Button type="button" onClick={handleIncrease}>
                +
              </Button>
              <p>{bedrooms}</p>
              <Button type="button" onClick={handleDecrease}>
                -
              </Button>
            </div>
          </div>
          <Separator />
          <div className="flex flex-row items-center justify-between p-8">
            <h2 className="text-2xl">WC</h2>
            <div className="flex items-center gap-4">
              <Button type="button" onClick={handleIncrease}>
                +
              </Button>
              <p>{bedrooms}</p>
              <Button type="button" onClick={handleDecrease}>
                -
              </Button>
            </div>
          </div>
          <Separator />
          <div className="flex flex-row items-center justify-between p-8">
            <h2 className="text-2xl">Living room</h2>
            <div className="flex items-center gap-4">
              <Button type="button" onClick={handleIncrease}>
                +
              </Button>
              <p>{bedrooms}</p>
              <Button type="button" onClick={handleDecrease}>
                -
              </Button>
            </div>
          </div>
          <Separator />
          <div className="flex flex-row items-center justify-between p-8">
            <h2 className="text-2xl">Beds</h2>
            <div className="flex items-center gap-4">
              <Button type="button" onClick={handleIncrease}>
                +
              </Button>
              <p>{bedrooms}</p>
              <Button type="button" onClick={handleDecrease}>
                -
              </Button>
            </div>
          </div>
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

const checkboxStyle = 'flex flex-row items-center';

export default DetailsStep;
