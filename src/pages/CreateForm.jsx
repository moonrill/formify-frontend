import { useState } from "react";
import { usePageTitle } from "../hooks/useTittle";
import { api } from "../api";
import { Alert } from "../components/Alert";
import { useNavigate } from "react-router-dom";

export const CreateForm = () => {
  usePageTitle("Create Form");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [allowedDomain, setAllowedDomain] = useState([]);
  const [limit, setLimit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { accessToken } = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = (e) => {
    e.preventDefault();

    // Set loading to true
    setLoading(true);

    // Combine all data
    const data = {
      name,
      slug,
      description,
      allowed_domain: allowedDomain,
      limit_one_response: limit,
    };

    api
      .post("/forms", data, { Authorization: `Bearer ${accessToken}` })
      .then((res) => {
        setSuccess(res.message);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => setError(error.message))
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setError(null);
          setSuccess(null);
        }, 2000);
      });
  };

  return (
    <>
      {(error || success) && (
        <Alert
          status={error ? "error" : "success"}
          message={error || success}
          customStyle={{ top: "70px" }}
        />
      )}
      <div className="row m-2 justify-content-center align-items-center position-relative main">
        <div className="col-lg-10 col-md-12 border border-dark border-2 rounded-4 p-4 shadow">
          <h1 className="fs-2 mb-5 fw-bold text-center">Create New Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-12 col-md-7 d-flex flex-column">
                <div className="mb-3 d-flex gap-1 flex-column">
                  <label htmlFor="name">Form name :</label>
                  <input
                    type="text"
                    id="name"
                    className="rounded-3 border border-dark"
                    style={{ padding: "12px 15px" }}
                    autoFocus
                    placeholder="Your form name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3 d-flex gap-1 flex-column">
                  <label htmlFor="desc">Description:</label>
                  <textarea
                    id="desc"
                    cols="30"
                    rows="3"
                    className="rounded-3 border border-dark"
                    style={{ padding: "12px 15px" }}
                    placeholder="Your form description"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className=" col-sm-12 col-md-5">
                <div className="mb-3 d-flex gap-1 flex-column">
                  <label htmlFor="slug">Form slug :</label>
                  <input
                    type="text"
                    id="slug"
                    className="rounded-3 border border-dark"
                    style={{ padding: "12px 15px" }}
                    placeholder="your-form-slug"
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>

                <div className="mb-4 d-flex flex-column gap-2">
                  <label htmlFor="domain">Allowed Domain : </label>
                  <textarea
                    id="domain"
                    cols="30"
                    rows="3"
                    className="rounded-3 border border-dark"
                    style={{ padding: "12px 15px" }}
                    placeholder="example.com, webtech.id"
                    onChange={(e) =>
                      setAllowedDomain(e.target.value.split(","))
                    }
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="mb-3 d-flex gap-2 justify-content-end">
              <label htmlFor="limit_one_response" className="fw-semibold">
                Limit one response per user
              </label>
              <input
                type="checkbox"
                id="limit_one_response"
                style={{
                  width: "1.2rem",
                  accentColor: "#000000",
                }}
                onChange={(e) => setLimit(e.target.checked)}
              />
            </div>
            <button
              className="btn btn-dark fw-semibold w-100 rounded-4 mt-3"
              style={{ padding: "10px 0" }}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
