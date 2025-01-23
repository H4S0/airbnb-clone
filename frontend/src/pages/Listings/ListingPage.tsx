import { useQuery } from '@tanstack/react-query';
import { IoMenu } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';
import { MdAddToPhotos } from 'react-icons/md';
import { BsGridFill } from 'react-icons/bs';
import { CiGrid2H } from 'react-icons/ci';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
    <div className="container mx-auto px-4 mt-14">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl">Your listings</h2>
        <div className="flex flex-row items-center gap-5">
          <div className="bg-gray-200 p-4 rounded-full">
            <FaSearch />
          </div>
          <div className="bg-gray-200 p-4 rounded-full">
            <MdAddToPhotos />
          </div>
          <div className="bg-gray-200 p-4 rounded-full">
            <BsGridFill />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 p-4 text-gray-500 font-semibold mt-12">
        <p>Listing Name</p>
        <p>Created At</p>
        <p>Location</p>
        <p className="text-right">Actions</p>
      </div>

      {data.map((listing) => (
        <div
          key={listing.id}
          className="grid grid-cols-4 gap-4 bg-gray-50 rounded-3xl p-4 mb-4 items-center hover:bg-gray-200 transition"
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
            <DropdownMenu>
              <DropdownMenuTrigger>
                <IoMenu className="text-3xl text-gray-600 cursor-pointer hover:text-gray-800" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Update listing</DropdownMenuItem>
                <DropdownMenuItem>Delete listing</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingPage;
