export const Question = ({ question, index }) => {
  const choices = question.choices ? question.choices.split(",") : null;
  const inputType = {
    "short answer": <input type="text" className="flex-fill input-text" />,
    paragraph: (
      <textarea
        cols="30"
        rows="5"
        className="flex-fill rounded border p-2"
      ></textarea>
    ),
    date: <input type="date" className="flex-fill rounded border p-2" />,
    "multiple choice": (
      <div>
        {choices?.map((choice, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`${question.id}_${index}`}
              name={`question_${question.id}`}
              value={choice}
              style={{ zoom: "1.3" }}
            />
            <label htmlFor={`${question.id}_${index}`} className="ms-2">
              {choice}
            </label>
          </div>
        ))}
      </div>
    ),
    dropdown: (
      <select>
        {choices?.map((choice, index) => {
          <option value={choice} key={index}>
            {choice}
          </option>;
        })}
      </select>
    ),
    checkboxes: (
      <div>
        {choices?.map((choice, index) => {
          <div key={index}>
            <input
              type="checkbox"
              id={`${question.id}_${index}`}
              name={`question_${index}_${index}`}
              value={choice}
            />
            <label htmlFor={`${question.id}_${index}`}>{choice}</label>
          </div>;
        })}
      </div>
    ),
  };

  const inputElement = inputType[question.choice_type] || null;

  return (
    <div key={question.id} className="border rounded-3 p-3">
      <div className="d-flex gap-2">
        <p>{index + 1}.</p>
        <div className="w-100">
          <div className="d-flex">
            <p className="flex-fill m-1">{question.name}</p>
            {question.is_required == 1 && (
              <span className="required fw-semibold fs-5">*</span>
            )}
          </div>
          <div className="d-flex">{inputElement}</div>
        </div>
      </div>
    </div>
  );
};
