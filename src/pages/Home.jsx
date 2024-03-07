import { useEffect, useState } from "react";
import { usePageTitle } from "../hooks/useTittle";
import { api } from "../api";
import { Link } from "react-router-dom";
import { FormCard } from "../components/FormCard";

export const Home = () => {
  // CheckIfLoggedIn();
  usePageTitle("Formify");
  const user = JSON.parse(localStorage.getItem("user"));
  const [forms, setForms] = useState([]);
  const [userForms, setUserForms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Get all forms
    api
      .get("/forms", { Authorization: `Bearer ${user.accessToken}` })
      .then(({ forms }) => {
        setForms(forms);
        const filteredForms = forms.filter(
          (form) => form.creator_id == user.id
        );
        setUserForms(filteredForms);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <div className="m-auto d-flex align-items-center gap-3 loading">
          <div className="spinner-border"></div>
          <p className="m-0">Getting forms...</p>
        </div>
      ) : (
        <>
          {/* USER'S FORM SECTION */}
          <div className="d-flex align-items-center p-0 justify-content-between">
            <h1 className="fs-2">Your Forms</h1>
            <Link className="btn-tambah" to={"/create"}>
              Add form
            </Link>
          </div>
          <div className="row g-3 mt-1">
            {userForms.length > 0 &&
              userForms?.map((form) => (
                <div key={form.id} className="col-lg-3 col-md-4 col-sm-6">
                  <FormCard form={form} key={form.id} />
                </div>
              ))}
            {!loading && userForms.length == 0 && (
              <p className="m-auto">No forms created</p>
            )}
          </div>
          {/* USER'S FORM SECTION */}

          {/* AVAILABLE FORM SECTION */}
          <h1 className="fs-2 mt-5 p-0">Available forms</h1>
          <div className="row g-3 mb-4 mt-1">
            {forms.length ? (
              forms?.map((form) => (
                <div key={form.id} className="col-lg-3 col-md-4 col-sm-6">
                  <FormCard form={form} disableDetails={true} />
                </div>
              ))
            ) : (
              <p className="m-auto">No forms available</p>
            )}
          </div>
          {/* AVAILABLE FORM SECTION */}
        </>
      )}
    </>
  );
};
