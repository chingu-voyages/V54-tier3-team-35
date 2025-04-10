import QueryModel from "../models/queries-models";

interface QueriesData {
  userId: number,
  persona: string,
  context: string,
  task: string,
  output: string,
  constraint: string,
  response: string
}

class Queries {
  saveQuery = async (data: QueriesData): Promise<any> => {
    const { userId, persona, context, task, output, constraint, response } = data;
    const result = await QueryModel.postQuery(
      userId,
      persona,
      context,
      task,
      output,
      constraint,
      response
    )

    return result;
  } 
};

export const queries: Queries = new Queries();