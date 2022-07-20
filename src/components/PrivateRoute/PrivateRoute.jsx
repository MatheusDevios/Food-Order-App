import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const authIsLoggedIn = localStorage.getItem("token");

  return authIsLoggedIn ? props.children : <Navigate to="/auth" />;
};

export default PrivateRoute;
