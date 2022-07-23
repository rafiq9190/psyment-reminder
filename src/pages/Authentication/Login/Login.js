import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Frontend/component/Header/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = { email: "", password: "" };

function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [isProcessing, setProcessing] = useState(false);

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };
  const handleLogin = (e) => {
    e.preventDefault();
    let { email, password } = state;
    setProcessing(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("🚀 ~ file: Login.js ~ line 30 ~ handleLogin ~ err", err);
      })
      .finally(() => {
        setProcessing(false);
      });
    setProcessing(false);
  };
  return (
    <>
      <div className="auth">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <div className="card p-2 py-md-3 p-lg-4">
                <div className="row">
                  <div className="col">
                    <h3 className="mb-4">Login</h3>
                  </div>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col">
                      <button className="btn w-100" disabled={isProcessing}>
                        {!isProcessing ? (
                          "Login"
                        ) : (
                          <div className="spinner-grow spinner-grow-sm"></div>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col">
                    <p className="mb-0 text-center">
                      Need an account?
                      <Link to="/authentication/register">Register</Link>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
