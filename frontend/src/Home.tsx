import { listingProps } from './pages/Listings/ListingPage';
import { useQuery } from '@tanstack/react-query';
import DefaultLogo from './assets/profile-default-icon-512x511-v4sw4m29.png';

const fetchListings = async () => {
  const response = await fetch('http://localhost:4000/listing/getAllListings');
  if (!response.ok) {
    throw new Error('not ok');
  }
  return response.json();
};

const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['listings'],
    queryFn: fetchListings,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div>{/* ikonice za filter */}</div>
      <div>
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
