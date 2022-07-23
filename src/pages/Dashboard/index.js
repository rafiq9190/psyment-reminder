import React from "react";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";

function index() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default index;
