import React, { useState } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

// We probably won't use this (use AuthContext and useContext instead)
export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = (props) => {
  // a null user is a user that is not logged in
  const [user, setUser] = useState(null);

  const handleRegister = async (user, navigate) => {
    // axios call to register users (interacting with DB)
    try {
      let res = await axios.post("api/auth", user);
      setUser(res.data.data);
      navigate("/protected");
      // naviagate to a certain page
    } catch (err) {
      console.log(err.response);
      alert("error occured registring user");
    }
  };

  const handleLogin = async (user, navigate) => {
    // axios call to login users (interacting with DB)
    try {
      let res = await axios.post("api/auth/sign_in", user);
      setUser(res.data.data);
      // let headers = res.headers;
      // axios.defaults.headers.common["access-token"] = headers["access-token"];
      // axios.defaults.headers.common["token-type"] = headers["token-type"];
      // axios.defaults.headers.common["client"] = headers["client"];
      // axios.defaults.headers.common["expiry"] = headers["expiry"];
      // axios.defaults.headers.common["uid"] = headers["uid"];
      navigate("/protected");
      // naviagate to a certain page
    } catch (err) {
      console.log(err.response);
      alert("error occured registring user");
    }
  };

  const handleLogout = async (y) => {
    // axios call to logout users (interacting with DB)
    try {
      let res = await axios.delete("/api/auth/sign_out");
      console.log(res);
      setUser(null);
      y("/login");
    } catch (err) {
      console.log(err.response);
      alert("error occured registring user");
    }
    // y bad name for tutorial sake
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
