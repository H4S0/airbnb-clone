import { useState, useEffect } from 'react';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  listingSchema,
  ListingSchemaType,
} from '../../../backend/src/shared/libs/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useListing } from '@/hooks/useListing';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useListingStore } from '@/store/store';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import slika from '../assets/Screenshot 2025-01-14 095848.png';
//maketi mutate to staviti samo na kraj

const LocationStep = () => {
  const { mutate } = useListing();
  const { listingData, updateLocation } = useListingStore();
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          'https://countriesnow.space/api/v0.1/countries'
        );
        setCountries(response.data.data);
        setFilteredCountries(response.data.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    const filtered = countries.filter((country) =>
      country.country.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleSelectCountry = (country) => {
    updateLocation('country', country.country);
    setSearchTerm(country.country);
    setFilteredCities(country.cities);
    setIsOpen(false);
    setCitySearch('');
    updateLocation('city', '');
  };

  const handleCitySearch = (e) => {
    const query = e.target.value;
    setCitySearch(query);
    const filtered = listingData.listingLocation.country
      ? filteredCities.filter((city) =>
          city.toLowerCase().includes(query.toLowerCase())
        )
      : [];
    setFilteredCities(filtered);
  };

  const handleSelectCity = (city) => {
    updateLocation('city', city);
    setCitySearch(city);
    setCityOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListingSchemaType>({
    resolver: zodResolver(listingSchema),
  });

  const onSubmit: SubmitHandler<ListingSchemaType> = (data) => {
    const validKeys = ['address', 'postalNumber', 'country', 'city'];
    Object.entries(data).forEach(([key, value]) => {
      if (validKeys.includes(key)) {
        updateLocation(key, value);
      }
    });
  };

  console.log(listingData);
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-10 mt-10">
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/3">
          <div className="relative mb-3">
            <Label>Country</Label>
            <Input
              onClick={() => setIsOpen(!isOpen)}
              placeholder={
                listingData.listingLocation.country || 'Select a country'
              }
            />
            {isOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search for a country..."
                  className="w-full border-b border-gray-300 p-3 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div>
                  {filteredCountries.map((country) => (
                    <div
                      key={country.country}
                      onClick={() => handleSelectCountry(country)}
                      className="cursor-pointer p-3 hover:bg-gray-100 rounded-b-lg"
                    >
                      {country.country}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {listingData.listingLocation.country && (
            <div className="relative mb-3">
              <Label>City</Label>
              <Input
                onClick={() => setCityOpen(!cityOpen)}
                placeholder={
                  listingData.listingLocation.city || 'Select a city'
                }
              />
              {cityOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <input
                    type="text"
                    value={citySearch}
                    onChange={handleCitySearch}
                    placeholder="Search for a city..."
                    className="w-full border-b border-gray-300 p-3 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div>
                    {filteredCities.map((city) => (
                      <div
                        key={city}
                        onClick={() => handleSelectCity(city)}
                        className="cursor-pointer p-3 hover:bg-gray-100 rounded-b-lg"
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {listingData.listingLocation.country &&
            listingData.listingLocation.city && (
              <>
                <div className="mb-3">
                  <Label>Address</Label>
                  <Input
                    {...register('address')}
                    value={listingData.listingLocation.address}
                    onChange={(e) => updateLocation('address', e.target.value)}
                    placeholder="Enter your address"
                  />
                </div>
                <div className="mb-3">
                  <Label>Postal Number</Label>
                  <Input
                    {...register('postalNumber')}
                    type="text"
                    value={listingData.listingLocation.postalNumber}
                    onChange={(e) =>
                      updateLocation('postalNumber', e.target.value)
                    }
                    placeholder="Enter your postal number"
                  />
                  {errors.postalNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.postalNumber.message}
                    </p>
                  )}
                </div>
              </>
            )}

          <Button variant="destructive" type="submit" className="w-full">
            Submit
          </Button>
        </form>
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={slika} alt="Your Image Description" />
        </motion.div>
      </div>
      {/* napraviti footer componentu za button za sledeci step */}
      <div className="mt-10 flex flex-col items-center">
        <p className="text-gray-700 mb-4">
          After providing your location, you can proceed to the next step.
        </p>
        <Button
          onClick={() => console.log('Proceed to next step')}
          variant="primary"
          className="w-full sm:w-auto"
        >
          Proceed to Next Step
        </Button>
      </div>
    </>
  );
};

export default LocationStep;
