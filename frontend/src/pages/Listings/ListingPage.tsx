import { listingData } from '@/hooks/useListing';
import { useQuery } from '@tanstack/react-query';

const fetchListings = async () => {
  const response = await fetch('http://localhost:4000/listing/getAllListings');
  if (!response.ok) {
    throw new Error('not ok');
  }
  return response.json();
};

const ListingPage = () => {
  const { isPending, error, data } = useQuery<listingData>({
    queryKey: ['listings'],
    queryFn: fetchListings,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.map((listing) => (
        <p>{listing.listingName}</p>
      ))}
    </div>
  );
};

export default ListingPage;
