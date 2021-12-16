import React, { useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

// We probably won't use this (use AuthContext and useContext instead)
export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = (props) => {
  // const getUser = async () => {
  //   if (user || !localStorage.getItem("access-token")) {
  //     return;
  //   }
  //   try {
  //     const res = await axios.get("/api/auth/validate_token");
  //     console.log(res.data.data);
  //     setUser(res.data.data);
  //   } catch (err) {
  //     return;
  //   }
  // };
  // useEffect(() => {
  //   getUser();
  // }, []);
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

      navigate("/protected");
      // naviagate to a certain page
    } catch (err) {
      console.log(err.response);
      alert("error occured logining in user");
    }
  };

  const handleLogout = async (y) => {
    // axios call to logout users (interacting with DB)
    try {
      // destroy token on backend
      let res = await axios.delete("/api/auth/sign_out");
      setUser(null);
      y("/login");
    } catch (err) {
      console.log(err.response);
      alert("error occured loginout user");
    }
    // y bad name for tutorial sake
  };
  console.log("user", user);
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
