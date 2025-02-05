import { useState } from 'react';
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
      <h1 className="text-2xl font-bold mb-4">
        {data?.title || 'Listing Title'}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
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
          <h2 className="text-xl font-semibold mb-2">{data.listingName}</h2>
          <p className="text-gray-700">
            {data?.description || 'No description available.'}
          </p>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Location:</span> {data?.address},{' '}
              {data?.city}, {data.country}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Price per night:</span> $
              {data?.price || 'N/A'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-5">
            <div className="flex items-center gap-3 p-3 text-2xl bg-gray-100 rounded-lg shadow hover:shadow-md transition-shadow">
              <FaBed />
              <p>{data.beds}</p>
            </div>
            <div className="flex items-center gap-3 p-3 text-2xl bg-gray-100 rounded-lg shadow hover:shadow-md transition-shadow">
              <MdBedroomParent />
              <p>{data.bedRoom}</p>
            </div>
            <div className="flex items-center gap-3 p-3 text-2xl bg-gray-100 rounded-lg shadow hover:shadow-md transition-shadow">
              <MdLiving />
              <p>{data.livingRoom}</p>
            </div>
            <div className="flex items-center gap-3 p-3 text-2xl bg-gray-100 rounded-lg shadow hover:shadow-md transition-shadow">
              <FaToilet />
              <p>{data.wc}</p>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-3">Additional Information</h2>
      <div className="flex flex-row justify-around mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <ul className="text-gray-700 list-disc pl-5">
          <li>
            <strong>Check-in Time:</strong>{' '}
            {data?.checkInTime || 'Not specified'}
          </li>
          <li>
            <strong>Check-out Time:</strong>{' '}
            {data?.checkOutTime || 'Not specified'}
          </li>
          <li>
            <strong>Cancellation Policy:</strong>{' '}
            {data?.cancellationPolicy || 'Not specified'}
          </li>
          <li>
            <strong>Nearby Attractions:</strong>{' '}
            {data?.nearbyAttractions?.join(', ') || 'None listed'}
          </li>
          <li>
            <strong>House Rules:</strong>{' '}
            {data?.houseRules || 'No specific rules'}
          </li>
          <li>
            <strong>Parking Availability:</strong>{' '}
            {data?.parking || 'Not mentioned'}
          </li>
          <li>
            <strong>Pet Policy:</strong> {data?.petPolicy || 'Not specified'}
          </li>
          <li>
            <strong>Security Deposit:</strong>{' '}
            {data?.securityDeposit
              ? `$${data.securityDeposit}`
              : 'None required'}
          </li>
          <li>
            <strong>Wi-Fi & Connectivity:</strong>{' '}
            {data?.wifi || 'Not mentioned'}
          </li>
          <li>
            <strong>Accessibility Features:</strong>{' '}
            {data?.accessibility || 'Not mentioned'}
          </li>
        </ul>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {data?.Amenities?.map((amenity, index) => {
            const matchingAmenity = detailsData.find(
              (item) => item.name === amenity
            );

            return (
              <div
                key={index}
                className="flex flex-col gap-3 items-start justify-start p-4 border rounded-lg text-lg"
              >
                {matchingAmenity ? matchingAmenity.icon : null}
                <span className="text-gray-700">{amenity}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <ApplicationForm data={data} id={id} />
      </div>
    </div>
  );
};

export default ListingPageId;
