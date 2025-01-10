import { useNavigate } from 'react-router-dom';
import { Button } from './components/ui/button';

const Apartments = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/category');
  };

  return (
    <div className="flex flex-col justify-between gap-6">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-48 p-6 lg:p-12">
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-2">It's really easy</h2>
          <h2 className="text-3xl font-bold mb-2">to post something on</h2>
          <h2 className="text-7xl font-extrabold text-red-900">Airbnb</h2>
        </div>

        <div className="space-y-12">
          {[1, 2, 3].map((number) => (
            <div
              key={number}
              className="flex items-start gap-6 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-center w-12 h-12 text-white bg-red-900 rounded-full font-bold text-xl">
                {number}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Recite nam nešto o svome smještaju
                </h2>
                <p className="text-gray-600">
                  Navedite nekoliko osnovnih informacija, kao što su lokacija
                  smještaja i koliko gostiju može u njemu boraviti.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t"></div>

      <div className="flex items-center justify-between p-6">
        <p className="text-gray-700 text-3xl font-semibold">
          Go to the next page or step
        </p>
        <Button variant="destructive" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Apartments;
