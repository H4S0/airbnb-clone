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
  const { listingData, updateDetails } = useListingStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListingSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const [bedrooms, setBedrooms] = useState<number>(0);
  const [beds, setBeds] = useState<number>(0);
  const [livingRoom, setLivingRoom] = useState<number>(0);
  const [wc, setWc] = useState<number>(0);
  const [maxPerson, setMaxPerson] = useState<number>(0);
  const [isPet, setIsPet] = useState<boolean>(false);
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
      ['name', 'description', 'maxPerson'].every(
        (key) => listingData.listingDetails[key]
      ),
    [listingData.listingDetails]
  );

  const handleIncreaseMaxPerson = (key: keyof ListingSchemaType) => {
    const updatedValue = maxPerson + 1;
    setMaxPerson(updatedValue);
    updateDetails(key, updatedValue);
  };

  const handleDecreaseMaxPerson = (key: keyof ListingSchemaType) => {
    const updatedValue = Math.max(maxPerson - 1, 0);
    setMaxPerson(updatedValue);
    updateDetails(key, updatedValue);
  };

  const handleNext = useCallback(() => {
    if (allFieldSet) navigate('/price');
  }, [allFieldSet, navigate]);

  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap items-start justify-between mt-10 gap-6">
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-3">
              <Label>Listing name</Label>
              <Input
                {...register('listingName')}
                placeholder="Enter the name of your listing"
                onChange={(e) => updateDetails('name', e.target.value)}
              />
              {errors.listingName && (
                <p className="text-red-500 text-sm">
                  {errors.listingName.message}
                </p>
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

            {[
              {
                label: 'Bedroom',
                value: bedrooms,
                increase: handleIncrease,
                decrease: handleDecrease,
                key: 'bedRoom',
              },
              {
                label: 'Beds',
                value: beds,
                increase: handleIncreaseBeds,
                decrease: handleDecreaseBeds,
                key: 'beds',
              },
              {
                label: 'Living room',
                value: livingRoom,
                increase: handleIncreaseLivingRoom,
                decrease: handleDecreaseLivingRoom,
                key: 'livingRoom',
              },
              {
                label: 'WC',
                value: wc,
                increase: handleIncreaseWc,
                decrease: handleDecreaseWc,
                key: 'wc',
              },
              {
                label: 'Maximum person',
                value: maxPerson,
                increase: handleIncreaseMaxPerson,
                decrease: handleDecreaseMaxPerson,
                key: 'maxPerson',
              },
            ].map((room, index) => (
              <div key={index}>
                <div className="flex flex-col sm:flex-row items-center justify-between p-4">
                  <h2 className="text-center sm:text-left">{room.label}</h2>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      onClick={() => room.decrease(room.key)}
                    >
                      -
                    </Button>
                    <p>{room.value}</p>
                    <Button
                      type="button"
                      onClick={() => room.increase(room.key)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </form>
        </div>

        <div className="flex flex-col items-start gap-5 w-full md:w-1/2">
          <h2 className="text-2xl">Additional information</h2>
          <Separator />

          <div className="grid grid-cols-3 sm:grid-cols-4 sm:items-center md:grid-cols-3 gap-5">
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

          <div className="flex flex-wrap items-center justify-between p-6 bg-gray-50 rounded-lg shadow-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800">
              Is this pet-friendly?
            </h2>
            <div className="flex items-center gap-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPet}
                  onChange={() => {
                    setIsPet(!isPet);
                    updateDetails('isPet', !isPet);
                  }}
                  className="sr-only peer"
                />
                <div className="w-12 h-7 bg-gray-300 rounded-full peer peer-checked:bg-red-500 transition-colors">
                  <div
                    className={`absolute top-1 left-1 h-5 w-5 bg-white rounded-full shadow-md transition-transform ${
                      isPet ? 'translate-x-5' : ''
                    }`}
                  ></div>
                </div>
              </label>
              <span className="text-sm font-medium text-gray-700">
                {isPet ? "Yes, it's pet-friendly!" : 'No, not pet-friendly'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer handleNext={handleNext} disabled={!allFieldSet} />
    </>
  );
};

export default DetailsStep;
