import * as sst from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";
import { AuthStack } from "./AuthStack";
import { DatabaseStack } from "./DatabaseStack";
import { FrontendStack } from "./FrontendStack";

export const DATABASE = "medii";
export default async function main(app: sst.App): Promise<void> {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    bundle: {
      format: "esm",
    },
  });

  app
    .stack(AuthStack)
    .stack(DatabaseStack)
    .stack(ApiStack)
    .stack(FrontendStack);
}
