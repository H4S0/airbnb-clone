import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { categoryData } from '@/data/categoryData.tsx';
import CategoryCard from '@/components/CategoryCard';
import { useState } from 'react';
import { useListingStore } from '@/store/store';

const CategoryStep = () => {
  const [isSelected, SetIsSelected] = useState<string | null>(null);
  const { updateListing, listingData } = useListingStore();
  const navigate = useNavigate();

  const handleNext = () => {
    if (isSelected) {
      navigate('/location');
    }
  };

  const handleCategorySet = (category: string) => {
    SetIsSelected(category);
    updateListing('category', category);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <h2 className="text-3xl font-bold mb-4">Select a Category</h2>
      <p className="text-gray-600 mb-8">
        Choose the type of apartment you want to list.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-8 sm:grid-cols-3">
        {categoryData.map((item) => (
          <CategoryCard
            data={item}
            selected={isSelected === item.name}
            onSelect={() => handleCategorySet(item.name)}
          />
        ))}
      </div>
      <div className=" border-gray-400 border-[1px] w-full"></div>

      <div className="flex flex-row mt-6 items-center justify-between w-full">
        <h2 className="font-semibold text-xl w-96">
          When you select category, go to next page to select location of your
          listing 
        </h2>
        <Button
          variant="destructive"
          onClick={handleNext}
          disabled={!isSelected}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CategoryStep;
