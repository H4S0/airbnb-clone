import React from 'react';
import { fetchListings, listingProps } from './pages/Listings/ListingPage';
import { useQuery } from '@tanstack/react-query';
import DefaultLogo from './assets/profile-default-icon-512x511-v4sw4m29.png';
const Home = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['listings'],
    queryFn: fetchListings,
  });

  return (
    <div>
      <div>{/* ikonice za filter */}</div>
      <div>
        {data.map((listing: listingProps) => (
          <div>
            <img src={DefaultLogo} alt="logo" width={33} />
            <p>{`${listing.city}, ${listing.country}`}</p>
            <p>${listing.price} per night</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
