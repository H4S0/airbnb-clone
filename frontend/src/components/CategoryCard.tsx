import React from 'react';

interface CategoryProps {
  name: string;
  icon: string;
}

const CategoryCard = ({ data }: { data: CategoryProps }) => {
  return (
    <button className="flex flex-col items-start border p-3 gap-2 border-black rounded-lg w-40 transform hover:scale-105 transition-transform duration-200">
      {data.icon} <h2 className="font-semibold text-xl">{data.name}</h2>
    </button>
  );
};

export default CategoryCard;
