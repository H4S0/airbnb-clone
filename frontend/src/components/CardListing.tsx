import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { IoMenu } from 'react-icons/io5';
import { listingProps } from '@/pages/Listings/ListingPage';

const CardListing = ({ listing, handleDelete }: listingProps) => {
  return (
    <div className="max-w-sm bg-white shadow-md rounded-lg mt-5">
      {/* Card Header */}
      <div className="bg-gray-200 p-4 rounded-lg">
        <h2 className="font-bold text-xl text-gray-800 truncate">
          {listing.listingName}
        </h2>
        <p className="text-sm text-gray-500">
          Created on: {listing.createdAt.split('T')[0]}
        </p>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Location</h3>
          <p className="text-gray-600">{listing.address}</p>
          <p className="text-sm text-gray-500">{listing.city}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-700 font-medium">Actions</p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <IoMenu className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <button className="w-full text-left">Update listing</button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button
                  onClick={handleDelete}
                  className="w-full text-left text-red-500 hover:text-red-700"
                >
                  Delete listing
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default CardListing;
