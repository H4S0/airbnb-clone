import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { IoMenu } from 'react-icons/io5';
import { listingProps } from '@/pages/Listings/ListingPage';

const RowListing = ({ listing, handleDelete }: listingProps) => {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-4 text-gray-500 font-semibold mt-12">
        <p>Listing Name</p>
        <p>Created At</p>
        <p>Location</p>
        <p className="text-right">Actions</p>
      </div>
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
              <DropdownMenuItem>
                <button onClick={handleDelete}>Delete listing</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default RowListing;
