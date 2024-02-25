import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: "90px" }}>
        <Outlet />
      </div>
    </>
  );
};
