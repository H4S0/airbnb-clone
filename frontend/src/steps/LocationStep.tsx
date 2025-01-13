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

const LocationStep = () => {
  const { mutate } = useListing();
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [cityOpen, setCityOpen] = useState(false);

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
    setSelectedCountry(country);
    setSearchTerm(country.country);
    setFilteredCities(country.cities);
    setIsOpen(false);
    setCitySearch('');
    setSelectedCity('');
  };

  const handleCitySearch = (e) => {
    const query = e.target.value;
    setCitySearch(query);

    const cities = selectedCountry.cities;

    const filtered = cities.filter((city) =>
      city.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
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
    mutate(data, {
      onSuccess: () => {
        console.log('Location setted');
      },
      onError: (error) => {
        console.error('Location fail', error);
      },
    });
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Select Your Country and City
      </h2>
      <form>
        <div className="relative mb-6">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-full border border-gray-300 rounded-lg p-3 cursor-pointer text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {selectedCountry ? selectedCountry.country : 'Select a country'}
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
        {selectedCountry && (
          <div className="relative mb-6">
            <div
              onClick={() => setCityOpen(!cityOpen)}
              className="w-full border border-gray-300 rounded-lg p-3 cursor-pointer text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {selectedCity ? selectedCity : 'Select a city'}
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

        {selectedCountry && selectedCity ? (
          <>
            <div>
              <Label>Address</Label>
              <Input
                {...register('address')}
                placeholder="Enter your address"
              />
            </div>
            <div>
              <Label>Postal Number</Label>
              <Input
                {...register('postalNumber')}
                placeholder="Enter your postal number"
              />
            </div>
          </>
        ) : (
          <h2>nema forme</h2>
        )}
      </form>
    </div>
  );
};

export default LocationStep;
