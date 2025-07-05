import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react"; // ✅ This is missing


const PrivateRoute = ({allowedRoles}) => {

  const {user, loading} = useContext(UserContext);

  if(loading) {
    return <div>Loading...</div>;
  }

  if(!user){
    return <Navigate to="/" replace />; 
  }

  if(!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />; // This component will render the child routes if the user is authenticated
} 

export default PrivateRoute;