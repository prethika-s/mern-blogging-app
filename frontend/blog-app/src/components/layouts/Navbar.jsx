import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import LOGO from "../../assets/logo.png";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-50">
      {/* Left Section: Menu Toggle + Logo */}
      <div className="flex items-center gap-3">
        {/* Toggle Button */}
        <button
          className="text-gray-800 text-2xl md:hidden"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>

        {/* Logo */}
        <img src={LOGO} alt="Logo" className="w-8 h-8 object-contain" />
      </div>

      {/* Right Section: (Can be future content, leave empty for now) */}
      <div />

      {/* SideMenu for mobile */}
      {openSideMenu && (
        <div className="absolute top-14 left-2 z-40">
          <SideMenu
            activeMenu={activeMenu}
            setOpenSideMenu={setOpenSideMenu}
            isBlogMenu={false}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
