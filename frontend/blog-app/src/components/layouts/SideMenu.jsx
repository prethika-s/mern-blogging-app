import React, { useContext } from "react";
import { BLOG_NAVBAR_DATA, SIDE_MENU_DATA } from "../../utils/data";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import { UserContext } from "../../context/userContext";

const SideMenu = ({ activeMenu, isBlogMenu, setOpenSideMenu }) => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "logout") {
            handleLogout();
            return;
        }

        console.log(route);
        
        setOpenSideMenu((prevState) => !prevState);
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        setOpenSideMenu((prevState) => !prevState);
        navigate("/");
    };

    return (
        <div className="w-56 bg-white border border-gray-200 shadow-xl rounded-lg mt-3 ml-3 max-h-[90vh] min-h-fit overflow-y-auto p-4">
            {user && (
                <div className="flex flex-col items-center justify-center gap-1 mt-3 mb-7">
                    {user?.profileImageUrl ? (
                        <img
                            src={user.profileImageUrl}
                            alt="Profile"
                            className="w-20 h-20 bg-slate-400 rounded-full object-cover"
                        />
                    ) : (
                            <CharAvatar
                                fullName={user?.name || ""}
                                width="w-20"
                                height="h-20"
                                style="text-xl"
                            />
                    )}
                    <div>
                        <h5 className="text-gray-950 font-semibold text-center leading-6 mt-1">
                            {user?.name}
                        </h5>
                        <p className="text-[13px] font-medium text-gray-800 text-center">
                            {user?.email}
                        </p>
                    </div>
                </div>
            )}

            {(isBlogMenu ? BLOG_NAVBAR_DATA : SIDE_MENU_DATA).map((item, index) => (
                <button
                    key={`menu_${index}`}
                    className={`w-full flex items-center gap-4 text-[15px] ${
                        activeMenu === item.label
                            ? "text-white bg-gradient-to-r from-sky-500 to-cyan-400"
                            : "text-gray-700 hover:bg-gray-100"
                    } py-2.5 px-4 rounded-md mb-2 transition-all duration-200 cursor-pointer`}
                    onClick={() => handleClick(item.path)}
                >
                    <item.icon className="text-xl" />
                    {item.label}
                </button>
            ))}

            {user && (
                <button
                    className="w-full flex items-center gap-4 text-[15px] py-2.5 px-4 rounded-md mb-2 text-gray-700 hover:bg-red-100 transition-colors cursor-pointer"
                    onClick={handleLogout}
                >
                    <LuLogOut className="text-xl" />
                    Logout
                </button>
            )}
        </div>
    );
};

export default SideMenu;
