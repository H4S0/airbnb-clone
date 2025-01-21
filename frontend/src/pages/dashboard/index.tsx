import useAuth from '@/hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome, {user?.email || 'Guest'}
        </h2>
      </div>

      <div className="mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Your Bookings</h2>
          <h2 className="text-sm text-blue-600 underline cursor-pointer">
            All Reservations: 0
          </h2>
        </div>

        <div className="flex flex-wrap gap-4">
          <button className="border border-gray-300 bg-white hover:bg-gray-100 rounded-full px-6 py-2 text-sm font-medium shadow-sm transition">
            Current Bookings
          </button>
          <button className="border border-gray-300 bg-white hover:bg-gray-100 rounded-full px-6 py-2 text-sm font-medium shadow-sm transition">
            Upcoming Bookings
          </button>
          <button className="border border-gray-300 bg-white hover:bg-gray-100 rounded-full px-6 py-2 text-sm font-medium shadow-sm transition">
            Past Bookings
          </button>
        </div>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Inactive Bookings
        </h3>
        <p className="text-sm text-gray-500">
          You currently have no inactive bookings.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
