import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";

// Accept children and activeMenu as props
const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          {/* Sidebar - hidden on small screens */}
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} setOpenSideMenu={() => {}}/>
          </div>

          {/* Main Content */}
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
