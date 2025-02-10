import ApplicationForm from '@/components/ApplicationForm';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { FaBed, FaToilet } from 'react-icons/fa';
import { MdBedroomParent, MdLiving } from 'react-icons/md';
import { detailsData } from '@/data/detailsData';

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
        <p>Loading...</p>
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
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
        {data?.title || 'Listing Title'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div className="w-full h-72 bg-gray-100 flex items-center justify-center rounded-xl">
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

        <div>
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            {data.listingName}
          </h2>
          <p className="text-gray-700 text-sm md:text-base">
            {data?.description || 'No description available.'}
          </p>
          <div className="mt-4 text-sm md:text-base">
            <p className="text-gray-600">
              <span className="font-semibold">Location:</span> {data?.address},{' '}
              {data?.city}, {data.country}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Price per night:</span> $
              {data?.price || 'N/A'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {[
              {
                icon: <FaBed className="text-blue-600" />,
                label: 'Beds',
                value: data.beds,
              },
              {
                icon: <MdBedroomParent className="text-green-600" />,
                label: 'Bedrooms',
                value: data.bedRoom,
              },
              {
                icon: <MdLiving className="text-orange-600" />,
                label: 'Living Room',
                value: data.livingRoom,
              },
              {
                icon: <FaToilet className="text-red-600" />,
                label: 'Bathrooms',
                value: data.wc,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-3xl">{item.icon}</div>
                <p className="text-sm text-gray-600 mt-2">{item.label}</p>
                <p className="text-lg font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-semibold my-4 text-center md:text-left">
        Additional Information
      </h2>

      <div className="flex flex-col lg:flex-row justify-around mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <ul className="text-gray-700 list-disc pl-5 space-y-2">
          <li>
            <strong>Check-in Time:</strong>{' '}
            {data?.checkInTime || 'Not specified'}
          </li>
          <li>
            <strong>Check-out Time:</strong>{' '}
            {data?.checkOutTime || 'Not specified'}
          </li>
          <li>
            <strong>House Rules:</strong>{' '}
            {data?.houseRules || 'No specific rules'}
          </li>
          <li>
            <strong>Pet Policy:</strong> {data?.petPolicy || 'Not specified'}
          </li>

          <li className="mt-4">
            <p className="text-lg font-semibold text-gray-800">
              Dates that are already booked:
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {data?.Application.length > 0 ? (
                data?.Application?.map((item, index) => (
                  <span
                    key={index}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                  >
                    {item.dateRange.from.split('', 10)} -{' '}
                    {item.dateRange.to.split('', 10)}
                  </span>
                ))
              ) : (
                <p className="text-red-500 font-semibold">
                  Current this listing doesn't have any bookings.
                </p>
              )}
            </div>
          </li>
        </ul>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 lg:mt-0">
          {data?.Amenities?.map((amenity, index) => {
            const matchingAmenity = detailsData.find(
              (item) => item.name === amenity
            );

            return (
              <div
                key={index}
                className="flex flex-col gap-3 items-start justify-start p-4 border rounded-lg text-sm md:text-lg"
              >
                {matchingAmenity ? matchingAmenity.icon : null}
                <span className="text-gray-700">{amenity}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <ApplicationForm data={data} id={id} />
      </div>
    </div>
  );
};

export default ListingPageId;
