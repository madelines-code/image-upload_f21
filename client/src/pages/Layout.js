import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/public">Public</Link>
      </div>
      <div>
        <Link to="/protected">Protected</Link>
      </div>
      <h1>OUTLET HERE</h1>
      <Outlet />
    </div>
  );
};

export default Layout;
