import React, { useState } from 'react';
import { IoMenuSharp } from 'react-icons/io5';
import DefaultLogo from '../assets/profile-default-icon-512x511-v4sw4m29.png';

const MainNavbar = () => {
  const [isUserMenu, setIsUserMenu] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenu((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center mt-[-10px]">
      <div>
        <p>AirBnb logo</p>
      </div>
      <div>
        <p>mjest,dolazak,odlazak,gosti</p>
      </div>
      <div
        onClick={toggleUserMenu}
        className="flex items-center p-2 relative rounded-3xl gap-3 border-gray-200 border-2 hover:shadow-md hover:transition-shadow"
      >
        <IoMenuSharp size={23} />
        <img src={DefaultLogo} alt="logo" width={33} />
        {isUserMenu && (
          <div className="flex flex-col gap-3 absolute top-full mt-2 right-0 bg-white shadow-md p-4 rounded-lg items-start w-72">
            <p className="cursor-pointer hover:underline font-semibold">
              Register
            </p>
            <p className="cursor-pointer hover:underline">Login</p>
            <p className="cursor-pointer hover:underline">Your Apartments</p>
            <p className="cursor-pointer hover:underline">Helping Center</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainNavbar;
