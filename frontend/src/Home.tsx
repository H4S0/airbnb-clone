import { fetchListings, listingProps } from './pages/Listings/ListingPage';
import { useQuery } from '@tanstack/react-query';
import DefaultLogo from './assets/profile-default-icon-512x511-v4sw4m29.png';
import FilterNavbar from './components/FilterNavbar';

const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['listings'],
    queryFn: fetchListings,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div>
        <FilterNavbar listings={data} />
      </div>
      <div className="mt-28">
        {data.length > 0 ? (
          data.map((listing: listingProps) => (
            <div key={listing.id}>
              <img src={DefaultLogo} alt="logo" width={33} />
              <p>{`${listing.city}, ${listing.country}`}</p>
              <p>${listing.price} per night</p>
            </div>
          ))
        ) : (
          <p>no data</p>
        )}
      </div>
    </div>
  );
};

export default Home;
