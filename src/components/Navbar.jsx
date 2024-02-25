import { Link } from "react-router-dom";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    setLoading(true);

    api
      .post(
        "/auth/logout",
        {},
        { Authorization: `Bearer ${user?.accessToken}` }
      )
      .then(() => {
        localStorage.removeItem("user");
        navigate("/login");
      })
      .finally(() => setLoading(false));
  };

  return (
    <nav className="d-flex align-items-center justify-content-between bg-dark px-5 py-3 text-bg-dark">
      <Link
        to={"/"}
        className="fs-4 text-white text-decoration-none fw-semibold"
      >
        FORMIFY
      </Link>
      <div className="d-flex align-items-center gap-3">
        <p className="m-0">
          Hi, <span className="fw-semibold">{user?.name}</span>
        </p>
        <button
          className="btn btn-light fw-semibold"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </nav>
  );
};
