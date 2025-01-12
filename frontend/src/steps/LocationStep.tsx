import { useState, useEffect } from 'react';
import axios from 'axios';

const LocationStep = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

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

  console.log(selectedCountry);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    const filtered = countries.filter((country: any) =>
      country.country.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleSelectCountry = (country: any) => {
    setSelectedCountry(country);
    setSearchTerm(country.country);
    setIsOpen(false);
  };

  console.log(filteredCountries);

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Select Your Country
      </h2>

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
              {filteredCountries.map((country: any) => (
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

      {selectedCountry && (
        <div className="mt-4 text-gray-600">
          You selected: <strong>{selectedCountry.country}</strong>
        </div>
      )}
    </div>
  );
};

export default LocationStep;
