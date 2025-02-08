import { useSearchStore } from '@/store/searchStore';
import { max } from 'date-fns';
import { useState, useRef, useEffect } from 'react';

const SearchingOptions = () => {
  const { location, persons, setLocation, setPersons } = useSearchStore();
  const [isWhere, setIsWhere] = useState(false);
  const [isWho, setIsWho] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsWhere(false);
        setIsWho(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const incrementPersons = () => {
    setPersons(persons + 1);
  };

  const decrementPersons = () => {
    setPersons(Math.max(persons - 1, 0));
  };

  return (
    <div
      ref={ref}
      className="relative flex flex-row justify-between gap-5 p-4 bg-white border border-gray-300 rounded-xl shadow-sm"
    >
      <div className="relative">
        <p
          onClick={() => {
            setIsWhere(!isWhere);
            setIsWho(false);
          }}
          className="cursor-pointer text-blue-500 hover:underline"
        >
          Where
        </p>
        {isWhere && (
          <div className="absolute left-0 top-full mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-xl p-3 z-50">
            <p className="text-sm text-gray-700 font-semibold">
              Choose a location:
            </p>
            <ul className="mt-2">
              {['Zagreb', 'London', 'Tokyo'].map((city) => (
                <li
                  key={city}
                  className={`hover:bg-gray-100 p-2 cursor-pointer rounded ${
                    location === city ? 'font-bold bg-gray-200' : ''
                  }`}
                  onClick={() => setLocation(city)}
                >
                  {city}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="relative">
        <p
          onClick={() => {
            setIsWho(!isWho);
            setIsWhere(false);
          }}
          className="cursor-pointer text-blue-500 hover:underline"
        >
          Who
        </p>
        {isWho && (
          <div className="absolute left-0 top-full mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-xl p-3 z-50">
            <p className="text-sm text-gray-700 font-semibold">Max persons:</p>
            <div className="flex items-center justify-between">
              <button
                onClick={decrementPersons}
                className="p-2 bg-gray-200 rounded-full text-lg"
              >
                -
              </button>
              <span className="text-lg font-semibold">{persons}</span>
              <button
                onClick={incrementPersons}
                className="p-2 bg-gray-200 rounded-full text-lg"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchingOptions;
