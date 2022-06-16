import { Api, StackContext, use } from "@serverless-stack/resources";
import { AuthStack } from "./AuthStack";
import { DATABASE } from ".";
import { DatabaseStack } from "./DatabaseStack";

export function ApiStack({ stack }: StackContext) {
  const { userPool, userPoolClient } = use(AuthStack);
  const { database } = use(DatabaseStack);

  const api = new Api(stack, "Api", {
    authorizers: {
      Authorizer: {
        type: "user_pool",
        userPool: {
          id: userPool.userPoolId,
          clientIds: [userPoolClient.userPoolClientId],
        },
      },
    },
    defaults: {
      authorizer: "Authorizer",
      function: {
        environment: {
          DATABASE: DATABASE,
          CLUSTER_ARN: database.clusterArn,
          SECRET_ARN: database.secretArn,
        },
      },
    },
    routes: {
      "GET /private": {
        function: "src/private.main",
      },
      "POST /public": {
        function: "src/example.main",
        authorizer: "none",
      },
    },
  });
  api.attachPermissions([database]);
  return { api };
}
