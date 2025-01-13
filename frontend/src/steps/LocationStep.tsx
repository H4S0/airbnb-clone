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

const LocationStep = () => {
  const { mutate } = useListing();
  const { listingData, updateLocation } = useListingStore();
  {
    /* naci neku sliku i staviti desno ili ss ili google */
  }
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const [citySearch, setCitySearch] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  // Fetch countries
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

  // Search for a country
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    const filtered = countries.filter((country) =>
      country.country.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  // Select a country
  const handleSelectCountry = (country) => {
    updateLocation('country', country.country);
    setSearchTerm(country.country);
    setFilteredCities(country.cities);
    setIsOpen(false);
    setCitySearch('');
    updateLocation('city', ''); // Reset city
  };

  // Search for a city
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

  // Select a city
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
    mutate(
      {
        ...data,
        listingLocation: listingData.listingLocation,
        listingDetails: undefined,
      },
      {
        onSuccess: () => {
          console.log('Location successfully submitted');
          console.log(data);
        },
        onError: (error) => {
          console.error('Failed to submit location', error);
        },
      }
    );
  };

  console.log(listingData);

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Select Your Country and City
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Country Selection */}
        <div className="relative mb-6">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-full border border-gray-300 rounded-lg p-3 cursor-pointer text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {listingData.listingLocation.country || 'Select a country'}
          </div>
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

        {/* City Selection */}
        {listingData.listingLocation.country && (
          <div className="relative mb-6">
            <div
              onClick={() => setCityOpen(!cityOpen)}
              className="w-full border border-gray-300 rounded-lg p-3 cursor-pointer text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {listingData.listingLocation.city || 'Select a city'}
            </div>
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

        {/* Address and Postal Number */}
        {listingData.listingLocation.country &&
          listingData.listingLocation.city && (
            <>
              <div>
                <Label>Address</Label>
                <Input
                  {...register('address')}
                  value={listingData.listingLocation.address}
                  onChange={(e) => updateLocation('address', e.target.value)}
                  placeholder="Enter your address"
                />
              </div>
              <div>
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

        <Button variant="destructive" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default LocationStep;
