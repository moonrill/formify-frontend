import { useEffect, useState } from "react";
import { usePageTitle } from "../hooks/useTittle";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { QuestionInput } from "../components/QuestionInput";

export const SubmitForm = () => {
  const { slug } = useParams();
  usePageTitle(slug);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    api
      .get(`/forms/${slug}`, { Authorization: `Bearer ${user?.accessToken}` })
      .then(({ form }) => {
        setForm(form);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug, user?.accessToken]);

  return (
    <>
      {loading ? (
        <div className="m-auto d-flex align-items-center gap-3 loading">
          <div className="spinner-border"></div>
          <p className="m-0">Getting form data...</p>
        </div>
      ) : (
        <div className="main">
          <div className="row justify-content-center">
            <div className="col col-md-10 col-lg-7 border border-dark rounded-4 p-4 mx-3">
              <h1>{form.name}</h1>
              <p>{form.description}</p>
              <p className="m-0 fw-semibold">{user?.email}</p>
            </div>
          </div>
          <div className="row justify-content-center my-3">
            <div className="col col-md-10 col-lg-7 mx-3 p-0">
              {form?.questions.length ? (
                <>
                  {form?.questions.map((question) => (
                    <QuestionInput key={question.id} question={question} />
                  ))}
                  <div className="d-flex justify-content-between">
                    <Link className="btn-tambah px-3" to={"/"}>
                      Back to home
                    </Link>
                    <button className="btn btn-dark rounded-3 fw-semibold">
                      Submit
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-center">No questions found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
