import { useEffect, useState } from "react";
import { api } from "../api";
import { usePageTitle } from "../hooks/useTittle";
import { Link, useParams } from "react-router-dom";
import { QuestionModal } from "../components/QuestionModal";
import { QuestionInfo } from "../components/QuestionInfo";
import { CheckIfCreator } from "../utils/isCreator";

export const FormDetail = () => {
  // Get form slug
  const { slug } = useParams();
  // Set title to form slug
  usePageTitle(`${slug} detail`);
  // State
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to fetch form data
  const fetchFormData = () => {
    setLoading(true);
    api
      .get(`/forms/${slug}`, { Authorization: `Bearer ${user?.accessToken}` })
      .then(({ form }) => {
        setForm(form);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle all question change
  const handleQuestionChange = () => {
    fetchFormData();
  };

  // Handle question added
  const handleQuestionAdded = () => {
    setIsModalOpen(false); // Close modal
    handleQuestionChange(); // Refresh form data
  };

  const handleQuestionRemove = (questionId) => {
    api
      .delete(`/forms/${slug}/questions/${questionId}`, {
        Authorization: `Bearer ${user?.accessToken}`,
      })
      .then(() => {
        handleQuestionChange();
      })
      .catch((error) => {
        console.error("Error removing question:", error);
        setLoading(false);
      });
  };

  // Get form
  useEffect(() => {
    fetchFormData();
  }, [slug, user?.accessToken]);

  CheckIfCreator(form?.creator_id, user.id);

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
          <div className="col-lg-5 col-md-12">
            <div className="d-flex shadow-sm border bg-dark text-bg-dark px-3 py-2 border-dark rounded-4 mb-2">
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
                  <tr>
                    <td className="fw-semibold">Link</td>
                    <td>:</td>
                    <td>
                      <Link
                        to={`/${form.slug}/submit`}
                        className="link d-flex gap-1"
                        style={{ width: "fit-content" }}
                      >
                        <img src="/arrow-up.svg" alt="Arrow" width={12} />
                        Visit form
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* Button to open the modal */}
              <button
                className="btn btn-dark mt-4 rounded-3"
                onClick={() => setIsModalOpen(true)}
                style={{ padding: "8px 0" }}
              >
                Add Question
              </button>
              {/* Button to open the modal */}
            </div>
            <div className="my-3">
              <div className="d-flex border bg-dark text-bg-dark px-3 py-2 border-dark rounded-4 mb-2">
                <h1 className="fs-2">Questions</h1>
              </div>
              <div
                className="d-flex flex-column border p-4 border-dark rounded-4 shadow-sm"
                style={{ minHeight: "205px" }}
              >
                {form.questions.length ? (
                  form.questions.map((question, index) => (
                    <QuestionInfo
                      key={question.id}
                      question={question}
                      index={index}
                      onRemove={handleQuestionRemove}
                    />
                  ))
                ) : (
                  <p className="text-center text-secondary">
                    No questions created
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Table of responses */}
          <div className="col-lg-7">
            <div className="d-flex border bg-dark text-bg-dark px-3 py-2 border-dark rounded-4 mb-2">
              <h1 className="fs-2">Responses</h1>
            </div>
          </div>
          {/* Table of responses */}
        </div>
      )}

      {/* Render the question modal */}
      {isModalOpen && !loading && (
        <QuestionModal
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          form={form}
          onSuccess={handleQuestionAdded}
        />
      )}
    </>
  );
};
