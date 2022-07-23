import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "../pages/Authentication/Login";

function PrivateRoutes(props) {
  const { authentication } = useContext(AuthContext);
  console.log(
    "🚀 ~ file: PrivateRoutes.js ~ line 7 ~ PrivateRoutes ~ Authentication",
    authentication
  );
  const { isAuth } = authentication;
  const { Component } = props;
  if (!isAuth) return <Login />;
  return <Component />;
}

export default PrivateRoutes;
