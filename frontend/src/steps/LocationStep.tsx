import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  listingSchema,
  ListingSchemaType,
} from '../../../backend/src/shared/libs/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useListingStore } from '@/store/store';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import slika from '../assets/Screenshot 2025-01-14 095848.png';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const LocationStep = () => {
  const navigate = useNavigate();
  const { listingData, updateLocation } = useListingStore();
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [dropdowns, setDropdowns] = useState({ country: false, city: false });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          'https://countriesnow.space/api/v0.1/countries'
        );
        setCountries(response.data.data || []);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  const filteredCountries = useMemo(
    () =>
      countries.filter((country) =>
        country.country.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [countries, searchTerm]
  );

  const filteredCities = useMemo(
    () =>
      listingData.listingLocation.country
        ? countries
            .find(
              (country) =>
                country.country === listingData.listingLocation.country
            )
            ?.cities.filter((city) =>
              city.toLowerCase().includes(citySearch.toLowerCase())
            ) || []
        : [],
    [countries, listingData.listingLocation.country, citySearch]
  );

  const handleSearch = useCallback((e) => setSearchTerm(e.target.value), []);
  const handleCitySearch = useCallback(
    (e) => setCitySearch(e.target.value),
    []
  );

  const handleSelectCountry = useCallback(
    (country) => {
      updateLocation('country', country.country);
      setSearchTerm(country.country);
      updateLocation('city', '');
      setDropdowns((prev) => ({ ...prev, country: false }));
    },
    [updateLocation]
  );

  const handleSelectCity = useCallback(
    (city) => {
      updateLocation('city', city);
      setCitySearch(city);
      setDropdowns((prev) => ({ ...prev, city: false }));
    },
    [updateLocation]
  );

  const allFieldsSet = useMemo(
    () =>
      ['country', 'city', 'address', 'postalNumber'].every(
        (key) => listingData.listingLocation[key]
      ),
    [listingData.listingLocation]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListingSchemaType>({
    resolver: zodResolver(listingSchema),
  });

  const onSubmit: SubmitHandler<ListingSchemaType> = (data) => {
    Object.entries(data).forEach(([key, value]) => {
      updateLocation(key, value);
    });
  };

  const handleNext = useCallback(() => {
    if (allFieldsSet) navigate('/details');
  }, [allFieldsSet, navigate]);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start justify-between gap-40 p-4 sm:p-10 mt-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full sm:w-1/2 bg-white p-4 rounded-lg shadow-md"
        >
          <div className="relative mb-4">
            <Label>Country</Label>
            <Input
              onClick={() =>
                setDropdowns((prev) => ({ ...prev, country: !prev.country }))
              }
              placeholder={
                listingData.listingLocation.country || 'Select a country'
              }
              value={searchTerm}
              onChange={handleSearch}
              className="w-full"
            />
            {dropdowns.country && (
              <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto">
                {filteredCountries.map((country) => (
                  <div
                    key={country.country}
                    onClick={() => handleSelectCountry(country)}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  >
                    {country.country}
                  </div>
                ))}
              </div>
            )}
          </div>

          {listingData.listingLocation.country && (
            <div className="relative mb-4">
              <Label>City</Label>
              <Input
                onClick={() =>
                  setDropdowns((prev) => ({ ...prev, city: !prev.city }))
                }
                placeholder={
                  listingData.listingLocation.city || 'Select a city'
                }
                value={citySearch}
                onChange={handleCitySearch}
                className="w-full"
              />
              {dropdowns.city && (
                <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto">
                  {filteredCities.map((city) => (
                    <div
                      key={city}
                      onClick={() => handleSelectCity(city)}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {listingData.listingLocation.country &&
            listingData.listingLocation.city && (
              <>
                <div className="mb-4">
                  <Label>Address</Label>
                  <Input
                    {...register('address')}
                    value={listingData.listingLocation.address || ''}
                    onChange={(e) => updateLocation('address', e.target.value)}
                    placeholder="Enter your address"
                    className="w-full"
                  />
                </div>
                <div className="mb-4">
                  <Label>Postal Number</Label>
                  <Input
                    {...register('postalNumber')}
                    type="text"
                    value={listingData.listingLocation.postalNumber || ''}
                    onChange={(e) =>
                      updateLocation('postalNumber', e.target.value)
                    }
                    placeholder="Enter your postal number"
                    className="w-full"
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
          className="w-full sm:w-1/2 flex justify-center"
        >
          <img
            src={slika}
            alt="Your Image Description"
            className="max-w-full h-auto rounded-lg"
          />
        </motion.div>
      </div>

      <Footer handleNext={handleNext} disabled={!allFieldsSet} />
    </>
  );
};

export default LocationStep;
