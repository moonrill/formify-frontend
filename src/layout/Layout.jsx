import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { CheckIfLoggedIn } from "../utils/isLoggedIn";

export const Layout = () => {
  // Check if user is logged in
  CheckIfLoggedIn();

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: "90px" }}>
        <Outlet />
      </div>
    </>
  );
};
