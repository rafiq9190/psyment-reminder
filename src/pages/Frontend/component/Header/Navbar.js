import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { Link } from "react-router-dom";
import { GrNotification } from "react-icons/gr";
import { signOut } from "firebase/auth";
import { auth } from "../../../../config/firebase";
function Navbar() {
  // const isAuth = false;
  const { authentication, dispatch } = useContext(AuthContext);
  const { isAuth } = authentication;

  const handlLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {!isAuth ? (
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Payment Reminder App
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Payment Reminder App
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="d-flex justify-content-between">
              <div className="d-flex ml-6">
                {!isAuth ? (
                  <Link
                    to="/authentication/login"
                    className="btn btn-primary text-white "
                  >
                    Login
                  </Link>
                ) : (
                  <button
                    className="btn btn-primary text-white"
                    onClick={handlLogout}
                  >
                    LogOut
                  </button>
                )}
              </div>
              <span className="ml-6">
                <GrNotification style={{ fontSize: "21px" }} />
              </span>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
