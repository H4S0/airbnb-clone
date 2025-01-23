import { useQuery } from '@tanstack/react-query';
import { IoMenu } from 'react-icons/io5';

const fetchListings = async () => {
  const response = await fetch('http://localhost:4000/listing/getAllListings');
  if (!response.ok) {
    throw new Error('not ok');
  }
  return response.json();
};

const ListingPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['listings'],
    queryFn: fetchListings,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-4 gap-4 p-4 text-gray-500 font-semibold">
        <p>Listing Name</p>
        <p>Created At</p>
        <p>Location</p>
        <p className="text-right">Actions</p>
      </div>

      {data.map((listing) => (
        <div
          key={listing.id}
          className="grid grid-cols-4 gap-4 bg-gray-50 rounded-3xl p-4 mb-4 items-center hover:bg-gray-200"
        >
          <h2 className="font-bold">{listing.listingName}</h2>

          <div>
            <p>{listing.createdAt.split('T')[0]}</p>
          </div>

          <div>
            <p>{listing.address}</p>
            <p className="text-sm text-gray-500">{listing.city}</p>
          </div>

          <div className="flex justify-end">
            <IoMenu className="text-3xl text-gray-600 cursor-pointer hover:text-gray-800" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingPage;
