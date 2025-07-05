import React, { useContext, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { BLOG_NAVBAR_DATA } from "../../../utils/data";
import Logo from "../../../assets/logo.png";
import { LuSearch } from "react-icons/lu";
import SideMenu from "../SideMenu";
import { UserContext } from "../../../context/userContext";
import ProfileInfoCard from "../../Cards/ProfileInfoCard";
import SignUp from "../../Auth/SignUp";
import Login from "../../Auth/Login";
import Modal from "../../Modal";

const BlogNavbar = () => {
  const { user, setOpenAuthForm } = useContext(UserContext); // ✅ using context state only
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const location = useLocation();

  return (
    <>
      <div className="bg-white border-b border-gray-200/50 backdrop-blur-[12px] py-4 px-7 sticky top-0 z-30">
        <div className="container mx-auto flex items-center justify-between gap-5">
          {/* Left: Menu Icon + Logo */}
          <div className="flex items-center gap-5">
            <div className="lg:hidden">
              <button
                className="text-black -mt-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenSideMenu(!openSideMenu);
                }}
              >
                {openSideMenu ? (
                  <HiOutlineX className="text-2xl" />
                ) : (
                  <HiOutlineMenu className="text-2xl" />
                )}
              </button>
            </div>

            <div>
              <Link to="/">
                <img src={Logo} alt="logo" className="h-[75px] md:h-[40px]" />
              </Link>
            </div>
          </div>

          {/* Center: Nav Menu */}
          <nav className="hidden md:flex items-center gap-10">
            <ul className="flex gap-8 items-center">
              {BLOG_NAVBAR_DATA.map((item) => {
                if (item?.onlySideMenu) return null;
                const isActive = location.pathname === item.path;

                return (
                  <li key={item.id} className="list-none">
                    <Link
                      to={item.path}
                      className={`relative text-sm font-medium transition-all ${
                        isActive ? "text-black" : "text-gray-600"
                      } group`}
                    >
                      {item.label}
                      <span
                        className={`absolute left-0 -bottom-1 h-[2px] bg-sky-500 transition-transform duration-300 origin-left ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        } group-hover:scale-x-100 w-full`}
                      ></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Search + Auth */}
          <div className="flex items-center gap-6">
            <button
              className="hover:text-sky-500 cursor-pointer"
              onClick={() => setOpenSearchBar(true)}
            >
              <LuSearch className="text-[22px]" />
            </button>

            {!user ? (
              <button
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 to-cyan-400 text-xs md:text-sm font-semibold text-white px-5 md:px-7 py-2 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-cyan-200"
                onClick={() => setOpenAuthForm(true)}
              >
                Login/SignUp
              </button>
            ) : (
              <div className="hidden md:block">
                <ProfileInfoCard />
              </div>
            )}
          </div>
        </div>

        {/* Side Menu for mobile */}
        {openSideMenu && (
          <div className="absolute top-[61px] left-3 z-50">
            <SideMenu isBlogMenu activeMenu={location.pathname} setOpenSideMenu={setOpenSideMenu}/>
          </div>
        )}
      </div>

      <AuthModel />
    </>
  );
};

export default BlogNavbar;

const AuthModel = () => {
  const { openAuthForm, setOpenAuthForm } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState("login");

  return (
    <Modal
      isOpen={openAuthForm}
      onClose={() => {
        setOpenAuthForm(false);
        setCurrentPage("login");
      }}
      hideHeader
    >
      <div>
        {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
      </div>
    </Modal>
  );
};
