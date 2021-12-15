import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
const Home = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home!</h1>
      {JSON.stringify(auth)}
      <p onClick={auth.handleLogin}>Login</p>
      <p onClick={auth.handleLogout}>Logout</p>
      <Link to="/protected">Protected</Link>
      <Link to="/public">Public</Link>
      <p onClick={() => navigate("/public")}>navagate to public</p>
    </div>
  );
};
export default Home;
