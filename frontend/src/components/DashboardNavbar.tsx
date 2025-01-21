import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import useAuth from '@/hooks/useAuth';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div>
          <Link to={'/'} className="text-xl font-bold text-gray-800">
            AirBnb Logo
          </Link>
        </div>

        <div className="hidden md:flex flex-row items-center gap-5">
          <p className="text-gray-600">{user?.email}</p>
          <Link to={'/dashboard'} className="hover:text-gray-800">
            Dashboard
          </Link>
          <Link to={'/apartments'} className="hover:text-gray-800">
            Your apartments
          </Link>
          <p className="cursor-pointer hover:underline">Helping Center</p>
          <Button onClick={handleLogout} className="text-sm">
            Logout
          </Button>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg p-5">
          <div className="flex flex-col items-start gap-3">
            <p className="text-gray-600">{user?.email}</p>

            <Link
              to={'/apartments'}
              className="hover:text-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              Your apartments
            </Link>
            <p
              className="cursor-pointer hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Helping Center
            </p>
            <Button
              onClick={handleLogout}
              className="text-sm"
              variant="destructive"
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardNavbar;
