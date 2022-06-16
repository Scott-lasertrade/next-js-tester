import db from "./database";
import { listTesters } from "./database/Entity/actions";
import middify from "./middify";

const baseHandler = async (event: any) => {
  try {
    const testers = await listTesters(db);
    return {
      statusCode: 200,
      body: JSON.stringify(testers),
    };
  } catch (e: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
export const main = middify({})(baseHandler);
