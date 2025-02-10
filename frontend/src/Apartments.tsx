import { useNavigate } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Separator } from './components/ui/separator';
import { Checkbox } from './components/ui/checkbox';

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
          <div className="space-y-12">
            <div className="space-y-12">
              <div className="space-y-12">
                {[1, 2, 3].map((number) => (
                  <div
                    key={number}
                    className="flex items-start gap-6 p-6 rounded-lg shadow-lg"
                  >
                    <div className="flex items-center justify-center min-w-[50px] min-h-[50px] text-white bg-red-900 rounded-full font-bold text-xl">
                      {number}
                    </div>

                    <div>
                      {number === 1 && (
                        <>
                          <h2 className="text-xl font-semibold mb-2">
                            Choose a Category
                          </h2>
                          <p className="text-gray-600">
                            The first step is selecting the right category.
                            Whether you're listing a rental, vehicle, or
                            service, choosing the correct category helps with
                            visibility and searchability.
                          </p>
                        </>
                      )}

                      {number === 2 && (
                        <>
                          <h2 className="text-xl font-semibold mb-2">
                            Add Listing Details
                          </h2>
                          <p className="text-gray-600">
                            Enter key details such as **location**,
                            **amenities**, and other relevant information.
                            Providing more details makes your listing more
                            attractive and helps potential users make informed
                            decisions.
                          </p>
                        </>
                      )}

                      {number === 3 && (
                        <>
                          <h2 className="text-xl font-semibold mb-2">
                            Set a Price
                          </h2>
                          <p className="text-gray-600">
                            Determine the price for your listing. You can set a
                            fixed price or allow negotiations. A clear and
                            competitive price increases engagement and attracts
                            more potential users.
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

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
