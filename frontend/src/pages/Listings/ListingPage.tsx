import { useQuery } from '@tanstack/react-query';

import { FaSearch } from 'react-icons/fa';
import { MdAddToPhotos } from 'react-icons/md';
import { BsGridFill } from 'react-icons/bs';
import { CiGrid2H } from 'react-icons/ci';

import { useDeleteListing } from '@/hooks/deleteListing';
import RowListing from '@/components/RowListing';
import { useState } from 'react';
import CardListing from '@/components/CardListing';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { IoClose } from 'react-icons/io5';

export interface listingProps {
  id: number;
  listingName: string;
  address: string;
  createdAt: string;
  city: string;
  country: string;
  price: number;
  handleDelete: () => void;
}

export const fetchListings = async () => {
  const response = await fetch('http://localhost:4000/listing/getAllListings');
  if (!response.ok) {
    throw new Error('not ok');
  }
  return response.json();
};

const ListingPage = () => {
  const [grid, setGrid] = useState<boolean>(false);
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const deleteListing = useDeleteListing();
  const { isPending, error, data } = useQuery({
    queryKey: ['listings'],
    queryFn: fetchListings,
  });

  const handleDelete = () => {
    const listingId = data.map((listing: listingProps) => listing.id);
    deleteListing.mutationFn(listingId);
  };

  const handleGrid = () => {
    setGrid((prev) => !prev);
  };

  const handleSearch = () => {
    setActiveSearch((prev) => !prev);
  };

  const filteredListings = data
    ? data.filter(
        (listing: listingProps) =>
          listing.listingName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          listing.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 mt-14">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h2 className="text-3xl">Your listings</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={handleSearch}
              className="bg-gray-200 p-4 rounded-full"
            >
              {activeSearch ? <IoClose /> : <FaSearch />}
            </button>
            <Link to={'/apartments'}>
              <button className="bg-gray-200 p-4 rounded-full">
                <MdAddToPhotos />
              </button>
            </Link>
            <button
              onClick={handleGrid}
              className="bg-gray-200 p-4 rounded-full"
            >
              {grid ? <CiGrid2H /> : <BsGridFill />}
            </button>
          </div>
          {activeSearch && (
            <Input
              className="mt-2 w-full sm:w-80 rounded-md shadow-lg"
              placeholder="Search for your listing by name or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </div>
      </div>

      {data.length > 0 ? (
        filteredListings.map((listing: listingProps) => (
          <>
            {grid ? (
              <CardListing listing={listing} handleDelete={handleDelete} />
            ) : (
              <RowListing listing={listing} handleDelete={handleDelete} />
            )}
          </>
        ))
      ) : (
        <h2 className="text-2xl font-semibold flex items-center justify-center mt-20">
          Currently, you don't have active listings!
        </h2>
      )}
    </div>
  );
};

export default ListingPage;
