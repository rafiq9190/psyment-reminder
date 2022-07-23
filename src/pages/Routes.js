import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Authentication from "./Authentication";
import Frontend from "./Frontend";
import { AuthContext } from "../context/AuthContext";
import PrivateRoutes from "../components/PrivateRoutes";

function Index() {
  const { authentication } = useContext(AuthContext);

  const { isAuth } = authentication;

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Frontend />} />
        <Route
          path="/authentication/*"
          element={!isAuth ? <Authentication /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard/*"
          element={<PrivateRoutes Component={Dashboard} />}
        />
      </Routes>
    </Router>
  );
}

export default Index;
