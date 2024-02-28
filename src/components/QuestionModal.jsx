import { useState } from "react";

export const QuestionModal = ({ isOpen, onClose }) => {
  const [choiceType, setChoiceType] = useState("short answer");
  const [choices, setChoices] = useState(["", ""]);
  const [questionName, setQuestionName] = useState("");
  const [isRequired, setIsRequired] = useState(true);

  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const handleAddChoice = () => {
    setChoices([...choices, ""]);
  };

  const handleRemoveChoice = (index) => {
    const newChoices = choices.filter((choice, i) => i !== index);
    setChoices(newChoices);
  };

  const renderChoicesOption = () => (
    <div className="mt-3 d-flex flex-column gap-2">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div>
          <p className="m-0">Choices :</p>
        </div>

        <button
          type="button"
          className="btn-tambah"
          onClick={handleAddChoice}
          style={{ border: "none", fontSize: ".9rem" }}
        >
          Add Choice
        </button>
      </div>
      {choices.map((choice, index) => (
        <div
          key={index}
          className="d-flex flex-column gap-1 justify-content-center"
        >
          <div className="d-flex gap-2">
            <label htmlFor={`question_${index}`}>{index + 1}.</label>
            <input
              type="text"
              className="flex-fill border rounded p-2"
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              required
            />
            {choices.length > 2 && (
              <button
                type="button"
                className="btn btn-danger btn-sm rounded-3 px-3"
                onClick={() => handleRemoveChoice(index)}
              >
                -
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const choiceOptions = {
    "short answer": null,
    paragraph: null,
    date: null,
    "multiple choice": renderChoicesOption(),
    dropdown: renderChoicesOption(),
    checkboxes: renderChoicesOption(),
  };

  if (!isOpen) {
    return null; // If isOpen is false, don't render anything
  }

  const handleSubmit = () => {
    // Filter choices so the choice cant be empty strin
    let filteredChoices = choices.filter((choice) => choice !== "");

    if (filteredChoices.length == 0) {
      filteredChoices = null;
    }

    const data = {
      name: questionName,
      choice_type: choiceType,
      choices: filteredChoices,
      is_required: isRequired,
    };

    console.log(data);
  };

  return (
    <>
      <div className="modal-overlay shadow">
        <div className="modal-content">
          <div className="d-flex shadow-sm border bg-dark text-bg-dark py-2 px-3 border-dark rounded-4 mb-2">
            <h1 className="fs-2">Add Question</h1>
          </div>
          <div
            className="bg-white border border-dark p-3 rounded-4 shadow-sm overflow-y-auto"
            style={{ minHeight: "13rem" }}
          >
            <div className="d-flex gap-1 flex-column mb-3">
              <label htmlFor="name">Question name : </label>
              <input
                type="text"
                id="name"
                className="flex-fill border rounded-2 p-2"
                onChange={(e) => setQuestionName(e.target.value)}
              />
            </div>
            <div className="d-flex gap-1 flex-column">
              <label htmlFor="ct">Choice type : </label>
              <select
                name="choice_type"
                id="ct"
                value={choiceType}
                className="p-2 outline-none border rounded-3"
                onChange={(e) => setChoiceType(e.target.value)}
              >
                <option value="short answer">Short Answer</option>
                <option value="paragraph">Paragraph</option>
                <option value="date">Date</option>
                <option value="multiple choice">Multiple Choice</option>
                <option value="dropdown">Dropdown</option>
                <option value="checkboxes">Checkboxes</option>
              </select>
            </div>
            {choiceOptions[choiceType]}
            <div className="d-flex gap-2 mt-4">
              <input
                type="checkbox"
                id="is-required"
                style={{
                  width: "1em",
                  accentColor: "#000000",
                }}
                onClick={(e) => setIsRequired(e.target.checked)}
              />
              <label htmlFor="is-required">Required question</label>
            </div>
            <div className="mt-3 float-end d-flex gap-2">
              <button
                className="btn border border-dark fw-semibold cancel-btn"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="btn btn-dark fw-semibold"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
