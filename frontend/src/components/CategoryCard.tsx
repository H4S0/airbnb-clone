import React from 'react';

interface CategoryProps {
  data: { name: string; icon: React.ReactNode };
  selected: boolean;
  onSelect: (name: string) => void;
}

const CategoryCard = ({ data, selected, onSelect }: CategoryProps) => {
  return (
    <button
      onClick={onSelect}
      className={`flex flex-col items-start border p-3 gap-2 ${
        selected ? 'border-black bg-gray-100' : 'border-gray-300'
      } rounded-lg w-40 transform hover:scale-105 transition-transform duration-200`}
    >
      {data.name} <h2 className="font-semibold text-xl">{data.name}</h2>
    </button>
  );
};

export default CategoryCard;
