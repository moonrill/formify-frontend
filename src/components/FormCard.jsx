import { Link } from "react-router-dom";

export const FormCard = ({ form }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="border border-dark p-3 rounded h-100 d-flex flex-column justify-content-between">
      <div>
        <h1 className="fs-5">{form.name}</h1>
        <span className="slug fw-semibold">{form.slug}</span>
        <p className="m-0 fs-6 mt-2">{form.description}</p>
      </div>
      <div className="d-flex align-items-center gap-2 mt-4 flex-lg-row flex-md-column">
        {form.creator_id == user.id && (
          <Link className="btn-tambah w-100" to={`/${form.slug}/detail`}>
            See details
          </Link>
        )}
        <Link
          to={`/${form.slug}/submit`}
          className="btn btn-dark fw-semibold w-100"
        >
          Visit form
        </Link>
      </div>
    </div>
  );
};
