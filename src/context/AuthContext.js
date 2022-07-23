import React, { useReducer, createContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

const initialState = { isAuth: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuth: true,
      };
    case "LOGOUT":
      return {
        isAuth: false,
      };

    default:
      return state;
  }
};
function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        console.log(user);
        console.log("User is signed In");
        dispatch({ type: "LOGIN" });
        // ...
      } else {
        console.log("User is signed out");
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ authentication: state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
