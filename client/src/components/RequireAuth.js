import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const RequireAuth = () => {
  const [checkingAuthStatus, setCheckingAuthStatus] = useState(true);
  const auth = useContext(AuthContext);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    // if we are athenticated or we do not have a token
    // TODO: localStorage is clear when I quit chrome (dont want this to happens)
    if (auth.authenticated || !localStorage.getItem("access-token")) {
      console.log("check one");
      setCheckingAuthStatus(false);
      return;
    }

    // we have a token in local-storage, and are not authed
    // so we need to check the token see if it is valid
    try {
      console.log("check two");
      const res = await axios.get("/api/auth/validate_token");
      // if token is valid it will giver back the user
      auth.setUser(res.data.data);
    } catch (err) {
      // if token is invalid or error occurs we come here
      console.log("unable to validate token");
    } finally {
      // regardless if token is or not we have checked it here
      setCheckingAuthStatus(false);
    }
  };

  // if in process of checking status have a loading screen or we
  // return null
  if (checkingAuthStatus) {
    return <p>Checking if logged in or not</p>;
  }

  // checked if not authed
  if (!auth.authenticated) {
    return <Navigate to="/login" />;
  }

  // here we are authenticated render the Route
  return <Outlet />;
};

export default RequireAuth;
