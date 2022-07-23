import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../../config/firebase";
import { setDoc, doc } from "firebase/firestore/lite";
import { connectStorageEmulator } from "firebase/storage";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = { email: "", password: "" };

function Register() {
  const { navigate } = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [state, setState] = useState(initialState);
  const [isProcessing, setProcessing] = useState(false);

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };
  const handleRegister = (e) => {
    e.preventDefault();
    let { email, password } = state;
    setProcessing(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        addDocument(user);

        console.log("user created");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: Register.js ~ line 36 ~ handleRegister ~ err",
          err
        );

        setProcessing(false);
      });
  };

  const addDocument = async (user) => {
    try {
      await setDoc(doc(firestore, "users", user.uid), {
        firstName: "",
        lastName: "",
        country: "",
        uid: user.uid,
      });
      console.log("user document created ");
      dispatch({ type: "LOGIN" });
    } catch (error) {
      console.log(error);
    }
    setProcessing(false);
  };

  return (
    <div className="auth">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <div className="card p-2 py-md-3 p-lg-4">
              <div className="row">
                <div className="col">
                  <h3 className="mb-4">Register</h3>
                </div>
              </div>
              <form onSubmit={handleRegister}>
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
                        "Register"
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
                    Already have an account?
                    <Link to="/authentication/login">Login</Link>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
