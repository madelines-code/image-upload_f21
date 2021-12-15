import React, { useState } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

// We probably won't use this (use AuthContext and useContext instead)
export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = (props) => {
  // a null user is a user that is not logged in
  const [user, setUser] = useState(null);

  const handleRegister = async () => {
    // axios call to register users (interacting with DB)
    // setUser
    console.log("handleRegister");
  };

  const handleLogin = async () => {
    // axios call to login users (interacting with DB)
    // setUser
    setUser({ email: "some email" });
    console.log("handleLogin");
  };

  const handleLogout = async () => {
    // axios call to logout users (interacting with DB)
    setUser(null);
    console.log("handleLogout");
  };

  return (
    <AuthContext.Provider
      value={{
        ...user,
        authenticated: user !== null,
        handleRegister,
        handleLogin,
        handleLogout,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
