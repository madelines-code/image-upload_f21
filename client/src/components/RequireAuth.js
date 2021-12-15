import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const RequireAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth.authenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>hello {auth.email}</h1>
      <Outlet />
    </div>
  );
};

export default RequireAuth;
