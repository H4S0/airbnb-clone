import { useDeclineApplication } from '@/hooks/declineApplication';
import useAuth from '@/hooks/useAuth';
import { applicationDetails } from '@/store/applicationStore';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const fetchApplication = async () => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('http://localhost:4000/listing/byuser', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('not ok');
  }

  return response.json();
};

const Dashboard = () => {
  const { user } = useAuth();
  const [activeButton, setActiveButton] = useState('current');
  const declineApplication = useDeclineApplication();
  const { isPending, error, data } = useQuery({
    queryKey: ['application'],
    queryFn: fetchApplication,
  });

  const applications = data?.flatMap((listing) => listing.Application);
  const isAccepted = applications?.map((item) => item.isAccepted);

  const queryClient = useQueryClient();

  const handleStatusUpdate = async (id: number, status) => {
    try {
      const response = await fetch(
        `http://localhost:4000/application/${id}/update`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(status),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert('Application updated successfully!');
        queryClient.invalidateQueries(['application']); // Refresh data
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDecline = (id: number) => {
    declineApplication.mutationFn(id);
    queryClient.invalidateQueries(['application']); // Refresh data after decline
  };

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
          <button
            onClick={() => setActiveButton('current')}
            className={`border border-gray-300 rounded-full px-6 py-2 text-sm font-medium shadow-sm transition ${
              activeButton === 'current'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            Current Bookings
          </button>
          <button
            onClick={() => setActiveButton('upcoming')} // Set active button to 'upcoming'
            className={`border border-gray-300 rounded-full px-6 py-2 text-sm font-medium shadow-sm transition ${
              activeButton === 'upcoming'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            Upcoming Bookings
          </button>
        </div>
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          {activeButton === 'current'
            ? 'Current Bookings'
            : 'Upcoming Bookings'}
        </h3>
        <div className="space-y-4">
          {activeButton === 'current' ? (
            applications?.filter((item: applicationDetails) => item.isAccepted)
              .length > 0 ? (
              applications
                .filter((item: applicationDetails) => item.isAccepted)
                .map((item: applicationDetails) => (
                  <div
                    key={item.email}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Email:</span>{' '}
                          {item.email}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Full Name:</span>{' '}
                          {item.fullName}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Phone:</span>{' '}
                          {item.phoneNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Dates:</span>{' '}
                          {item.dateRange.from} - {item.dateRange.to}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Adults:</span>{' '}
                          {item.adults}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Kids:</span> {item.kids}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-sm text-gray-500">
                No current bookings available.
              </p>
            )
          ) : applications?.filter(
              (item: applicationDetails) => item.isAccepted === false
            ).length > 0 ? (
            applications
              ?.filter((item: applicationDetails) => item.isAccepted === false)
              .map((item: applicationDetails) => (
                <div
                  key={item.email}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Email:</span> {item.email}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Full Name:</span>{' '}
                        {item.fullName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Phone:</span>{' '}
                        {item.phoneNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Dates:</span>{' '}
                        {item.dateRange.from} - {item.dateRange.to}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Adults:</span>{' '}
                        {item.adults}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Kids:</span> {item.kids}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-3 mt-5">
                    <button
                      onClick={() =>
                        handleStatusUpdate(item.id, {
                          isAccepted: true,
                          isDeclined: false,
                        })
                      }
                      className="bg-green-500 text-white p-2 rounded-lg"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDecline(item.id)}
                      className="bg-red-500 text-white p-2 rounded-lg"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-sm text-gray-500">
              No upcoming bookings available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
