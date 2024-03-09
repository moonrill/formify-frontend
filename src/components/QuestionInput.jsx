import { useState } from "react";

export const QuestionInput = ({ question, onInputChange }) => {
  const choices = question.choices ? question.choices.split(",") : null;
  const [checkboxValues, setCheckboxValues] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    onInputChange(question.id, value);
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    let updatedValues;
    if (isChecked) {
      updatedValues = [...checkboxValues, value];
    } else {
      updatedValues = checkboxValues.filter((item) => item !== value);
    }
    setCheckboxValues(updatedValues);

    const joinedValues = updatedValues.join(",");
    onInputChange(question.id, joinedValues);
  };

  const inputType = {
    "short answer": (
      <input
        type="text"
        className="flex-fill p-2 rounded border"
        placeholder="Enter your answer"
        required={question.is_required}
        onChange={handleInputChange}
      />
    ),
    paragraph: (
      <textarea
        cols="30"
        rows="5"
        className="flex-fill rounded border p-2"
        placeholder="Enter your answer"
        required={question.is_required}
        onChange={handleInputChange}
      ></textarea>
    ),
    date: (
      <input
        type="date"
        className="flex-fill rounded border p-2"
        required={question.is_required}
        onChange={handleInputChange}
      />
    ),
    "multiple choice": (
      <div>
        {choices?.map((choice, index) => (
          <div
            key={index}
            className="mb-2 ms-2 d-flex align-align-items-center"
          >
            <input
              type="radio"
              id={`${question.id}_${index}`}
              name={`question_${question.id}`}
              value={choice}
              style={{ zoom: "1.3", accentColor: "#000" }}
              required={question.is_required}
              onChange={handleInputChange}
            />
            <label htmlFor={`${question.id}_${index}`} className="ms-2">
              {choice}
            </label>
          </div>
        ))}
      </div>
    ),
    dropdown: (
      <select
        required={question.is_required}
        className="form-select"
        onChange={handleInputChange}
        defaultValue={""}
      >
        <option value="" disabled={question.is_required}>
          Select an option
        </option>
        {choices?.map((choice, index) => (
          <option value={choice} key={index}>
            {choice}
          </option>
        ))}
      </select>
    ),
    checkboxes: (
      <div>
        {choices?.map((choice, index) => (
          <div key={index} className="mb-1 d-flex align-items-center ms-2">
            <input
              type="checkbox"
              id={`${question.id}_${index}`}
              name={`question_${index}_${index}`}
              value={choice}
              style={{ zoom: "1.3", accentColor: "#000" }}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`${question.id}_${index}`} className="ms-2">
              {choice}
            </label>
          </div>
        ))}
      </div>
    ),
  };

  const inputElement = inputType[question.choice_type] || null;

  return (
    <div
      key={question.id}
      className="border border-dark rounded-4 py-3 px-4 mb-3"
    >
      <div className="d-flex gap-2">
        <div className="w-100">
          <div className="d-flex">
            <p className="flex-fill m-0 mb-3">
              {question.name}
              {question.is_required ? (
                <span className="required fw-semibold fs-5 p-0 ps-1">*</span>
              ) : null}
            </p>
          </div>
          <div className="d-flex">{inputElement}</div>
        </div>
      </div>
    </div>
  );
};
