import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { categoryData } from './categoryData';
import CategoryCard from '@/components/CategoryCard';

const CategoryStep = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/location');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <h2 className="text-3xl font-bold mb-4">Select a Category</h2>
      <p className="text-gray-600 mb-8">
        Choose the type of apartment you want to list.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-8 sm:grid-cols-3">
        {categoryData.map((item) => (
          <CategoryCard data={item} />
        ))}
      </div>

      <Button variant="destructive" onClick={handleNext}>
        Next
      </Button>
    </div>
  );
};

export default CategoryStep;
