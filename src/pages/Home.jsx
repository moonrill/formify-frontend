import { useEffect, useState } from "react";
import { usePageTitle } from "../hooks/useTittle";
import { CheckIfLoggedIn } from "../utils/isLoggedIn";
import { api } from "../api";
import "../css/Home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  usePageTitle("Formify");
  const user = JSON.parse(localStorage.getItem("user"));
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);

  const userForms = forms.filter((form) => form.creator_id == user.id);

  useEffect(() => {
    setLoading(true);
    const token = user?.accessToken;
    // Get all forms
    api
      .get("/forms", { Authorization: `Bearer ${token}` })
      .then((res) => setForms(res.forms))
      .finally(() => setLoading(false));
  }, []);

  // Check if user is logged in
  CheckIfLoggedIn();

  return (
    <>
      <div className="row mt-3">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="fs-2 mb-3">Forms you Created</h1>
          <Link className="btn-tambah" to={"/create"}>
            Add form
          </Link>
        </div>
        <div className="d-flex gap-3 flex-wrap w-100">
          {loading && (
            <div className="m-auto d-flex align-items-center gap-3">
              <div className="spinner-border"></div>
              <p className="m-0">Getting forms...</p>
            </div>
          )}
          {userForms.length > 0 &&
            userForms?.map((form) => (
              <div
                key={form.id}
                className="border border-dark p-3 rounded"
                style={{ width: "20rem" }}
              >
                <h1 className="fs-5">{form.name}</h1>
                <span className="slug fw-semibold">{form.slug}</span>
                <p className="m-0 fs-6 mt-2">{form.description}</p>
                <Link
                  className="btn btn-dark mt-3 fw-semibold"
                  to={`/${form.slug}`}
                >
                  See details
                </Link>
              </div>
            ))}
          {!loading && userForms.length == 0 && (
            <p className="m-auto">No forms created</p>
          )}
        </div>
      </div>
      <div className="row mt-2">
        <h1 className="fs-2 mb-3">Available forms</h1>
        <div className="d-flex gap-3 flex-wrap">
          {loading && (
            <div className="m-auto d-flex align-items-center gap-3">
              <div className="spinner-border"></div>
              <p className="m-0">Getting forms...</p>
            </div>
          )}
          {forms?.map((form) => (
            <div
              key={form.id}
              className="border border-dark p-3 rounded"
              style={{ width: "20rem" }}
            >
              <h1 className="fs-5">{form.name}</h1>
              <span className="slug fw-semibold">{form.slug}</span>
              <p className="m-0 fs-6 mt-2">{form.description}</p>
              <Link
                className="btn btn-dark mt-3 fw-semibold"
                to={`/${form.slug}`}
              >
                See details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
