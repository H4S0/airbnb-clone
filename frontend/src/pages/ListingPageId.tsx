import { useQuery } from '@tanstack/react-query';

import { useParams } from 'react-router';

const fetchListingId = async (id: number) => {
  const response = await fetch(`http://localhost:4000/listing/${id}`);
  if (!response.ok) {
    throw new Error('not ok');
  }
  return response.json();
};

const ListingPageId = () => {
  const { id } = useParams();
  const { data, error, isPending } = useQuery({
    queryKey: ['listingID', id],
    queryFn: () => fetchListingId(id),
    enabled: !!id,
  });

  console.log(data);

  return <div>ListingPageId</div>;
};

export default ListingPageId;
