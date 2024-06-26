/**
 * A function to render an alert component based on the status and message props.
 *
 * @param {string} status - the status of the alert (e.g. "error" or "success")
 * @param {string} message - the message to be displayed in the alert
 * @return {JSX.Element} the rendered alert component
 */
export const Alert = ({ status, message, customStyle = {} }) => {
  // Define the CSS classes and icon based on the status prop
  const alertClass = `m-2 position-fixed shadow bg-white p-3 border rounded-3 end-0 top-0 d-flex gap-3`;
  const iconSrc = status === "error" ? "/xmark.svg" : "/checkmark.svg";
  const title = status === "error" ? "Failed" : "Success";

  return (
    <div
      className={alertClass}
      style={{ ...customStyle, maxWidth: "400px", zIndex: 999 }}
    >
      <img
        src={iconSrc}
        alt={status === "error" ? "danger icon" : "success icon"}
        width={35}
      />
      <div>
        <h1
          className={`fs-6 m-0 mb-1`}
          style={{ color: status === "error" ? "#FF0000" : "#04FF00" }}
        >
          {title}
        </h1>
        <div className="m-0 fs-6">{message}</div>
      </div>
    </div>
  );
};
