import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/useTittle";

export const PageNotFound = () => {
  usePageTitle("Page Not Found");

  return (
    <div className="not-found d-flex flex-column justify-content-center">
      <h1 style={{ fontSize: "5rem" }} className="text-center">
        404
      </h1>
      <p>Sorry the page you are looking for does not exist</p>

      <Link to={"/"} className="btn btn-dark">
        Back to Home Page
      </Link>
    </div>
  );
};
