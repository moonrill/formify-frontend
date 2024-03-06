import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/useTittle";

export const Forbidden = () => {
  usePageTitle("Forbidden");

  return (
    <div className="not-found d-flex flex-column justify-content-center">
      <h1 style={{ fontSize: "5rem" }} className="text-center">
        403
      </h1>
      <p>Sorry you are not allowed to access this content</p>

      <Link to={"/"} className="btn btn-dark">
        Back to Home Page
      </Link>
    </div>
  );
};
