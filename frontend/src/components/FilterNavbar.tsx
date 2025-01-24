import { categoryData } from '@/data/categoryData';
import React, { useState } from 'react';

const FilterNavbar = ({ listings }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  console.log(selectedCategory);

  const filteredListings =
    selectedCategory === null
      ? listings
      : listings.filter((item) => item.category === selectedCategory);

  console.log(filteredListings);

  return (
    <div className="flex flex-row gap-5 items-center justify-between p-5">
      {categoryData.map((category) => (
        <div
          key={category.name}
          onClick={() => handleCategorySelect(category.name)}
          className={`flex flex-col items-center ${
            selectedCategory === category.name
              ? 'text-red-600 underline underline-offset-8 hover:text-red-600'
              : 'text-gray-500'
          } hover:text-gray-900 hover:underline hover:underline-offset-8`}
        >
          <div className="text-3xl ">{category.icon}</div>
          <p className="font-light">{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default FilterNavbar;
