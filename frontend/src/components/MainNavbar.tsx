import { useState } from 'react';
import { IoMenuSharp } from 'react-icons/io5';
import DefaultLogo from '../assets/profile-default-icon-512x511-v4sw4m29.png';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import SearchingOptions from './SearchingOptions';
import useAuth from '@/hooks/useAuth';
import { Button } from './ui/button';
import { Link } from 'react-router';
import { Separator } from './ui/separator';

const MainNavbar = () => {
  const [isUserMenu, setIsUserMenu] = useState(false);
  const [isRegiserModal, setIsRegisterModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const toggleUserMenu = () => {
    setIsUserMenu((prev) => !prev);
  };

  const onCloseRegisterModal = () => {
    setIsRegisterModal(false);
  };

  const onCloseLoginModal = () => {
    setIsLoginModal(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="flex justify-between items-center mt-[-10px]">
        <div>
          <Link to={'/'}>AirBnb Logo</Link>
        </div>
        <div>
          <SearchingOptions />
        </div>

        <div
          onClick={toggleUserMenu}
          className={`flex items-center p-2 relative rounded-3xl gap-3 bg-white border-gray-200 border-2 hover:shadow-md hover:transition-shadow`}
        >
          <IoMenuSharp size={23} />
          <img src={DefaultLogo} alt="logo" width={33} />
          {isUserMenu && (
            <div className="flex flex-col gap-3 absolute top-full mt-2 right-0 bg-white shadow-md p-4 rounded-lg items-start w-72 z-50">
              {isLoggedIn ? (
                <>
                  <p>{user?.email}</p>
                  <div className="border-t border-gray-300 w-full my-2" />
                  <Link to={'/dashboard'}>Dashboard</Link>
                  <Link to={'/apartments'}>Your apartments</Link>
                  <p className="cursor-pointer hover:underline">
                    Helping Center
                  </p>
                  <Button onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <p
                    onClick={() => setIsRegisterModal(true)}
                    className="cursor-pointer hover:underline font-semibold"
                  >
                    Register
                  </p>
                  <p
                    onClick={() => setIsLoginModal(true)}
                    className="cursor-pointer hover:underline"
                  >
                    Login
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {isRegiserModal && <RegistrationForm onClose={onCloseRegisterModal} />}
        {isLoginModal && <LoginForm onClose={onCloseLoginModal} />}
      </div>
      <Separator className="mt-5" />
    </>
  );
};

export default MainNavbar;
