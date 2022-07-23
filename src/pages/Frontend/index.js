import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Login from "../Authentication/Login/Login";

function index() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default index;
