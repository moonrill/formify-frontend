import { useState } from "react";

export const QuestionInfo = ({ question, index, onRemove }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleRemove = () => {
    setIsDeleting(true);
    onRemove(question.id)
      .then(() => {
        setIsDeleting(false);
      })
      .catch(() => {
        setIsDeleting(false);
      });
  };

  return (
    <div className="border rounded p-3 mb-3" key={question.id}>
      <div className="mb-1 d-flex justify-content-between align-items-center">
        <p className="m-0 fw-semibold">Question {index + 1}</p>
        <span
          className="fw-semibold py-1 px-3 rounded-3"
          style={{
            fontSize: "0.8rem",
            backgroundColor: question.is_required ? "#ff0040" : "#4dff00",
            color: question.is_required ? "#fff" : "#000",
          }}
        >
          {question.is_required ? "Required" : "Optional"}
        </span>
      </div>

      <table
        className="mt-3"
        style={{ borderCollapse: "separate", borderSpacing: "0 5px" }}
      >
        <tbody>
          <tr>
            <td className="fw-semibold">Question name</td>
            <td className="ps-1 pe-2">:</td>
            <td>{question.name}</td>
          </tr>
          <tr>
            <td className="fw-semibold">Choice type</td>
            <td className="ps-1 pe-2">:</td>
            <td className="text-capitalize">{question.choice_type}</td>
          </tr>
          {question.choices && (
            <tr>
              <td className="fw-semibold">Choices</td>
              <td className="ps-1 pe-2">:</td>
              <td className="d-flex gap-1 flex-wrap">
                {question.choices.split(",").map((c) => (
                  <span className="slug fw-semibold" key={c}>
                    {c}
                  </span>
                ))}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button
        className="btn btn-outline-danger mt-4"
        type="button"
        onClick={handleRemove}
        disabled={isDeleting}
      >
        {isDeleting ? "Removing..." : "Remove question"}
      </button>
    </div>
  );
};
