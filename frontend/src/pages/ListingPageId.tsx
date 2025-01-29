import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

const fetchListingId = async (id: number) => {
  const response = await fetch(`http://localhost:4000/listing/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch the listing');
  }
  return response.json();
};

const ListingPageId = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ['listingID', id],
    queryFn: () => fetchListingId(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>loading</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Failed to load the listing. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Listing Details */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">
          {data?.title || 'Listing Title'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section: Image */}
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-xl">
            {data?.image ? (
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <p>No Image Available</p>
            )}
          </div>

          {/* Right Section: Description */}
          <div>
            <h2 className="text-xl font-semibold mb-2">{data.listingName}</h2>
            <p className="text-gray-700">
              {data?.description || 'No description available.'}
            </p>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Price:</span> $
                {data?.price || 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Location:</span>{' '}
                {data?.location || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPageId;
