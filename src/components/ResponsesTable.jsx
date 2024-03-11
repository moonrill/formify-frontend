export const ResponsesTable = ({ form, responses }) => {
  return (
    <table className="responses-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>User</th>
          {form?.questions.map((question, index) => (
            <th key={index}>{question.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {responses.length ? (
          responses?.map((response, index) => (
            <tr key={index}>
              <td>{response.date}</td>
              <td>{response.user.email}</td>
              {Object.values(response.answers).map((answer, index) => (
                <td key={index}>{answer || "-"}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={form?.questions.length + 2} className="text-center">
              No responses
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
