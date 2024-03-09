import { useEffect, useState } from "react";
import { usePageTitle } from "../hooks/useTittle";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { Alert } from "../components/Alert";
import { QuestionInput } from "../components/QuestionInput";

export const SubmitForm = () => {
  const { slug } = useParams();
  usePageTitle(slug);

  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [answers, setAnswers] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    api
      .get(`/forms/${slug}`, { Authorization: `Bearer ${user?.accessToken}` })
      .then(({ form }) => {
        setForm(form);
        setAnswers(
          form.questions.map((question) => ({
            question_id: question.id,
            value: "",
          }))
        );
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug, user?.accessToken]);

  const handleInputChange = (questionId, value) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.question_id === questionId ? { ...answer, value } : answer
      )
    );
  };

  const handleSubmit = () => {
    setSubmitLoading(true);
    const data = { answers };
    api
      .post(`/forms/${slug}/responses`, data, {
        Authorization: `Bearer ${user?.accessToken}`,
      })
      .then(({ message }) => {
        setSuccess(message);
      })
      .catch((err) => setError(err.message))
      .finally(() => setSubmitLoading(false));

    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 3000);
  };

  return (
    <>
      {loading && !error ? (
        <div className="m-auto d-flex align-items-center gap-3 loading">
          <div className="spinner-border"></div>
          <p className="m-0">Getting form data...</p>
        </div>
      ) : (
        <div className="main">
          <div className="row justify-content-center">
            <div className="col col-md-10 col-lg-7 border border-dark rounded-4 p-4 mx-3">
              <h1>{form.name}</h1>
              <div className="d-flex align-items-center gap-2 my-3">
                {form?.allowed_domains.length ? (
                  <>
                    <p className="m-0 fw-semibold">Allowed to domain : </p>
                    {form?.allowed_domains.map((domain) => (
                      <span
                        key={domain}
                        className="slug fw-semibold d-inline-block"
                        style={{
                          backgroundColor: "#C3DDFD",
                          color: "rgb(30 66 159)",
                        }}
                      >
                        {domain}
                      </span>
                    ))}
                  </>
                ) : (
                  <>
                    <p className="m-0">Allowed to : </p>
                    <span
                      className="fw-semibold d-inline-block slug"
                      style={{ backgroundColor: "#4dff00" }}
                    >
                      Anyone
                    </span>
                  </>
                )}
              </div>
              <p>{form.description}</p>
              <p className="m-0 fw-semibold">{user?.email}</p>
            </div>
          </div>
          <div className="row justify-content-center my-3">
            <div className="col col-md-10 col-lg-7 mx-3 p-0">
              {form?.questions.length ? (
                <>
                  {form?.questions.map((question) => (
                    <QuestionInput
                      key={question.id}
                      question={question}
                      onInputChange={handleInputChange}
                    />
                  ))}
                  <div className="d-flex justify-content-between">
                    <Link className="btn-tambah px-3" to={"/"}>
                      Back to home
                    </Link>
                    <button
                      className="btn btn-dark rounded-3 fw-semibold"
                      onClick={handleSubmit}
                      disabled={submitLoading}
                    >
                      {submitLoading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-center">No questions found</p>
              )}
            </div>
          </div>
          {(error || success) && (
            <Alert
              status={error ? "error" : "success"}
              message={error || success}
            />
          )}
        </div>
      )}
    </>
  );
};
