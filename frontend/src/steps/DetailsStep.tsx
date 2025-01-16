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
import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useListingStore } from '@/store/store';
import { detailsData } from '@/data/detailsData';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router';

const DetailsStep = () => {
  const { listingData, updateDetails, updateListing } = useListingStore(); // Access Zustand store methods
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListingSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

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

  const handleIncreaseBeds = (key: keyof ListingSchemaType) => {
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

  const allFieldSet = useMemo(
    () =>
      ['name', 'description'].every((key) => listingData.listingDetails[key]),
    [listingData.listingDetails]
  );

  const handleNext = useCallback(() => {
    if (allFieldSet) navigate('/price');
  }, [allFieldSet, navigate]);
  console.log(listingData);

  return (
    <>
      <div className="flex flex-row items-start justify-between mt-10">
        <div className="w-1/2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-3">
              <Label>Listing name</Label>
              <Input
                {...register('name')}
                placeholder="Enter the name of your listing"
                onChange={(e) => updateDetails('name', e.target.value)}
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
                onChange={(e) => updateDetails('description', e.target.value)}
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
                <Button type="button" onClick={() => handleIncrease('bedRoom')}>
                  +
                </Button>
                <p>{bedrooms}</p>
                <Button type="button" onClick={() => handleDecrease('bedRoom')}>
                  -
                </Button>
              </div>
            </div>
            <Separator />
            <div className="flex flex-row items-center justify-between p-8">
              <h2 className="text-2xl">Beds</h2>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  onClick={() => handleIncreaseBeds('beds')}
                >
                  +
                </Button>
                <p>{beds}</p>
                <Button
                  type="button"
                  onClick={() => handleDecreaseBeds('beds')}
                >
                  -
                </Button>
              </div>
            </div>
            <Separator />
            <div className="flex flex-row items-center justify-between p-8">
              <h2 className="text-2xl">Licing room</h2>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  onClick={() => handleIncreaseLivingRoom('livingRoom')}
                >
                  +
                </Button>
                <p>{livingRoom}</p>
                <Button
                  type="button"
                  onClick={() => handleDecreaseLivingRoom('livingRoom')}
                >
                  -
                </Button>
              </div>
            </div>
            <Separator />
            <div className="flex flex-row items-center justify-between p-8">
              <h2 className="text-2xl">Wc</h2>
              <div className="flex items-center gap-4">
                <Button type="button" onClick={() => handleIncreaseWc('wc')}>
                  +
                </Button>
                <p>{wc}</p>
                <Button type="button" onClick={() => handleDecreaseWc('wc')}>
                  -
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="flex flex-col items-start gap-5">
          <h2 className="text-2xl">Additional infromation</h2>
          <Separator />
          <div className="grid grid-cols-3 gap-5">
            {detailsData.map((amenity) => (
              <div
                key={amenity.name}
                onClick={() => handleSelect(amenity.name)}
                className={`flex flex-col gap-3 items-start justify-start p-4 border rounded-lg cursor-pointer ${
                  isSelected.includes(amenity.name)
                    ? 'bg-red-500 text-white border-red-500'
                    : 'bg-gray-200 text-black border-gray-300'
                }`}
              >
                <p className="text-2xl">{amenity.icon}</p>
                <p>{amenity.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer handleNext={handleNext} disabled={!allFieldSet} />
    </>
  );
};

export default DetailsStep;
