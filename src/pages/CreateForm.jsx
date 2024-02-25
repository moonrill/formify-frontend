import { useState } from "react";
import { usePageTitle } from "../hooks/useTittle";

export const CreateForm = () => {
  usePageTitle("Create Form");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [allowedDomain, setAllowedDomain] = useState([]);
  const [limit, setLimit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      slug,
      description,
      allowed_domain: allowedDomain,
      limit_one_response: limit,
    };

    console.log(data);
  };

  return (
    <div className="row mt-3 justify-content-center">
      <div className="col-lg-6 col-md-8 border border-dark border-2 rounded-4 p-3 shadow">
        <h1 className="fs-2 mb-2 text-center">Create new Form</h1>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-4 d-flex flex-column gap-2">
            <label htmlFor="domain">Allowed Domain : </label>
            <textarea
              id="desc"
              cols="30"
              rows="2"
              className="rounded-3 border border-dark"
              style={{ padding: "12px 15px" }}
              placeholder="example.com, webtech.id"
              onChange={(e) => setAllowedDomain(e.target.value.split(","))}
            ></textarea>
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
          <button className="btn btn-dark fw-semibold w-100 py-2 mt-3">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
