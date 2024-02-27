import { useEffect, useState } from "react";
import { usePageTitle } from "../hooks/useTittle";
import "../css/login.css";
import { api } from "../api";
import { Alert } from "../components/Alert";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  usePageTitle("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine email and password data
    const data = { email, password };

    // Set loading to true when submitting
    setLoading(true);

    // Send POST request
    api
      .post("/auth/login", data)
      .then((res) => {
        // Set loading to false after response
        setLoading(false);

        // Set user to localStorage
        localStorage.setItem("user", JSON.stringify(res?.user));

        // Redirect to home page
        navigate("/");
      })
      .catch((error) => {
        // Set loading to false after error
        setLoading(false);

        // Set error
        setError(error);
      })
      .finally(() => {
        // Set loading to false after after finish
        setLoading(false);
        // Clear error && success after 3 seconds
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div
          className="col-7 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#000000" }}
        >
          <img
            src="./checklist-person.png"
            alt="Icon"
            width={600}
            className="align-self-center"
            style={{ filter: "invert(100%)" }}
          />
        </div>

        <div className="col-5 p-5 d-flex flex-column justify-content-center align-items-center position-relative">
          <div
            className="bg-white d-flex flex-column justify-content-center"
            style={{ width: "27rem" }}
          >
            <h1 className="mb-5 align-self-center">Sign in</h1>
            <form onSubmit={handleSubmit}>
              <div className="d-flex gap-1 flex-column mb-3">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="rounded-3 border border-2 border-dark"
                  style={{ padding: "12px 15px" }}
                  placeholder="Email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="d-flex gap flex-column mb-4">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="rounded-3 border border-2 border-dark"
                  style={{ padding: "12px 15px" }}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="btn fw-semibold btn-dark w-100 rounded-3"
                style={{ padding: "12px 15px" }}
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign in"}
              </button>
            </form>

            {error && (
              <Alert
                status={"error"}
                message={error?.message}
                customStyle={{ top: "0" }}
              />
            )}
          </div>

          <div className="mt-4 text-center footer">
            <a href="">Reset password</a>
            <p style={{ color: "#7f7f7f" }}>
              Don&apos;t have an account?{" "}
              <a href="" className="sign-up">
                Create here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
