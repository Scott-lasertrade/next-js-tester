/* eslint-disable indent */
import middy from "@middy/core";
import { Handler as LambdaHandler } from "aws-lambda";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import httpSecurityHeaders from "@middy/http-security-headers";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import cors from "@middy/http-cors";
import validator from "@middy/validator";

export default function middify({
  validators,
}: any): (baseHandler: LambdaHandler) => middy.MiddyfiedHandler {
  return (baseHandler) => {
    const lambda = middy(baseHandler);

    lambda
      .use(httpSecurityHeaders()) // Applies best practice security headers to responses.
      .use(httpHeaderNormalizer({ canonical: true })) // Normalizes HTTP header names to their canonical format
      // Normalizes HTTP events by adding an empty object for queryStringParameters, multiValueQueryStringParameters or pathParameters if they are missing.
      .use(httpEventNormalizer({ payloadFormatVersion: 2 }))
      // Automatically parses HTTP requests with JSON body and converts the body into an object.
      // Also handles gracefully broken JSON if used in combination of httpErrorHandler.
      .use(jsonBodyParser())
      .use(httpErrorHandler())
      .use(cors());

    if (validators?.inputSchema) {
      lambda.use(
        validator({
          inputSchema: validators.inputSchema,
          ajvOptions: {
            strict: false,
            useDefaults: false,
          },
        })
      );
    }

    if (validators?.outputSchema) {
      lambda.use(
        validator({
          outputSchema: validators.outputSchema,
          ajvOptions: {
            strict: false,
            useDefaults: false,
          },
        })
      );
    }

    return lambda;
  };
}
