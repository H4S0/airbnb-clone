import { listingProps } from './pages/Listings/ListingPage';
import { useQuery } from '@tanstack/react-query';
import DefaultLogo from './assets/4595376-200.png';

import { useRef, useState, useEffect } from 'react';
import { categoryData } from './data/categoryData';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import { useSearchStore } from './store/searchStore';

const fetchListings = async () => {
  const response = await fetch('http://localhost:4000/listing/getAllListings');
  if (!response.ok) {
    throw new Error('not ok');
  }
  return response.json();
};

const Home = () => {
  const { location, persons } = useSearchStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isScrolledToStart, setIsScrolledToStart] = useState(true);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['listings'],
    queryFn: fetchListings,
  });

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({
      left: -200,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({
      left: 200,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        setIsScrolledToStart(scrollLeft === 0);
        setIsScrolledToEnd(scrollLeft + clientWidth >= scrollWidth);
      }
    };

    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  const filterListingsByLocation = (listings, location) => {
    if (!location) return listings;
    return listings.filter((listing) =>
      listing.city.toLowerCase().includes(location.toLowerCase())
    );
  };

  const filterListingsByPersons = (listings, persons) => {
    if (!persons) return listings;
    return listings.filter(
      (listing) => Number(listing.maxPerson) >= Number(persons)
    );
  };

  const filteredListings = filterListingsByPersons(
    filterListingsByLocation(
      selectedCategory === null
        ? data
        : data.filter((item) => item.category === selectedCategory),
      location
    ),
    persons
  );

  console.log(filteredListings);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="relative flex items-center gap-5 px-5">
        {!isScrolledToStart && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md z-10 md:hidden"
            onClick={scrollLeft}
          >
            <FaArrowLeft className="text-gray-700" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex items-center sm:justify-between space-x-10 overflow-x-auto scrollbar-hide w-full mt-5"
        >
          {categoryData.map((category) => (
            <div
              key={category.name}
              onClick={() => handleCategorySelect(category.name)}
              className={`flex flex-col items-center cursor-pointer ${
                selectedCategory === category.name
                  ? 'text-red-600 underline underline-offset-8 hover:text-red-600'
                  : 'text-gray-500'
              } hover:text-gray-900 hover:underline hover:underline-offset-8`}
            >
              <div className="text-3xl">{category.icon}</div>
              <p className="font-light">{category.name}</p>
            </div>
          ))}
        </div>

        {!isScrolledToEnd && (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md z-10 md:hidden"
            onClick={scrollRight}
          >
            <FaArrowRight className="text-gray-700" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {data.length > 0 ? (
          filteredListings.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              There's no listing with that category
            </p>
          ) : (
            filteredListings.map((listing: listingProps) => (
              <div
                key={listing.id}
                className="flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative w-full h-48 bg-gray-200">
                  <img
                    src={DefaultLogo}
                    alt="logo"
                    className="absolute left-[25%]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xl font-bold">{listing.listingName}</p>
                  <p className="text-lg font-semibold text-gray-800">{`${listing.city}, ${listing.country}`}</p>
                  <div className="flex flex-row justify-between">
                    <p className="text-gray-500 mt-1">
                      ${listing.price} per night
                    </p>
                    <Link to={`${listing.id}`}>
                      <Button>View listing</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No active listings
          </p>
        )}
      </div>
    </>
  );
};

export default Home;
