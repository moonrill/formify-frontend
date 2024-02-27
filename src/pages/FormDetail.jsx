import { useEffect, useState } from "react";
import { api } from "../api";
import { usePageTitle } from "../hooks/useTittle";
import { Link, useParams } from "react-router-dom";
import { Question } from "../components/Question";

export const FormDetail = () => {
  // Get form slug
  const { slug } = useParams();
  // Set title to form slug
  usePageTitle(slug);
  const { accessToken } = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get form
  useEffect(() => {
    api
      .get(`/forms/${slug}`, { Authorization: `Bearer ${accessToken}` })
      .then((res) => {
        setForm(res.form);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  console.log(form);

  return (
    <>
      {loading && (
        <div className="m-auto d-flex align-items-center gap-3 loading">
          <div className="spinner-border"></div>
          <p className="m-0">Getting form detail...</p>
        </div>
      )}

      {error == "Form not found" && (
        <div className="m-auto d-flex justify-content-center flex-column align-items-center gap-2 error">
          <h1 style={{ fontSize: "5rem" }} className="text-center m-0">
            404
          </h1>
          <p className="m-0 fw-semibold">Form Not Found</p>
          <Link className="btn btn-dark" to={"/"}>
            Back to Home
          </Link>
        </div>
      )}

      {!loading && !error && (
        <div className="row gap-lg-0 gap-md-3 gap-sm-3">
          <div className="col-lg-6 col-sm-12">
            <div className="sticky-lg-top" style={{ top: "90px" }}>
              <div className="d-flex shadow-sm border bg-dark text-bg-dark p-3 border-dark rounded-4 mb-2">
                <h1 className="fs-2">Form Detail</h1>
              </div>
              <div className="d-flex flex-column border p-3 border-dark rounded-4 shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span
                    className="limit fw-semibold"
                    style={{
                      backgroundColor: form.limit_one_response
                        ? "#7300ff"
                        : "#0077ff",
                    }}
                  >
                    {form.limit_one_response
                      ? "Limited to One Response"
                      : "Unlimited Responses"}
                  </span>
                  <div>
                    <button className="btn-tambah border-1 shadow-sm py-2">
                      Add question
                    </button>
                  </div>
                </div>
                <table>
                  <tbody>
                    <tr>
                      <td className="fw-semibold">Name</td>
                      <td className="ps-1 pe-2">:</td>
                      <td className="fw-semibold">{form.name}</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Slug</td>
                      <td className="ps-1 pe-2">:</td>
                      <td>
                        <span className="slug fw-semibold">{form.slug}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Description</td>
                      <td className="ps-1 pe-2">:</td>
                      <td>{form.description}</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Created by</td>
                      <td className="ps-1 pe-2">:</td>
                      <td className="text-primary">{form.creator?.email}</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Allowed Domains</td>
                      <td className="ps-1 pe-2">:</td>
                      <td>
                        {form.allowed_domains.length == 0 && (
                          <span className="domain fw-semibold">All</span>
                        )}
                        <div className="d-flex gap-2">
                          {form.allowed_domains.map((domain) => (
                            <span className="domain fw-semibold" key={domain}>
                              {domain}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 mb-4">
            <div className="d-flex border bg-dark text-bg-dark p-3 border-dark rounded-4 mb-2">
              <h1 className="fs-2">Form Questions</h1>
            </div>
            <div
              className="d-flex flex-column border p-3 border-dark rounded-4 shadow-sm"
              style={{ minHeight: "205px" }}
            >
              {form.questions.length == 0 && (
                <p className="text-center text-secondary">
                  No questions created
                </p>
              )}
              {form.questions.length > 0 && (
                <div className="d-flex flex-column gap-3">
                  {form.questions.map((question, index) => (
                    <Question
                      question={question}
                      index={index}
                      key={question.id}
                    />
                  ))}
                </div>
              )}
              <div className="d-flex justify-content-end mt-4">
                <button className="btn btn-dark fw-semibold">Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
