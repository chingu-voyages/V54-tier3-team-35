interface UpdatedHistoryItem {
  title: string;
  result: string;
  id: number;
  map?: <T, R>(callback: (item: T) => R) => R[];
  output_format?: string;
  constraint_scope?: string;
  response?: string;
  persona?: string;
  context?: string;
  task?: string;
}

//Uses the result variable to match with the correct userHistory which we later use to make sure the inputs are filled accordingly.

export const getFilteredHistory = (
  userHistory: UpdatedHistoryItem[],
  result: string
) => {
  console.log(userHistory);
  return (
    userHistory
      .map((item) => ({
        persona: item.persona || "",
        context: item.context || "", // Ensure context is included
        task: item.task || "",
        output: item.output_format || "", // Rename output_format to output
        constraint: item.constraint_scope || "", // Rename constraint_scope to constraint
        response: item.response,
      }))
      .find((history) => history.response === result) || {
      persona: "", // Default empty string if no history found
      context: "",
      task: "",
      output: "",
      constraint: "",
    }
  );
};
