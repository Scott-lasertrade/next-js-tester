// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Amplify, { withSSRContext } from "aws-amplify";
import config from "../../config";

// Amplify SSR configuration needs to be done within each API route
const configuration = {
  Auth: {
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    mandatorySignIn: false,
    oauth: {
      domain: `${
        config.cognito.OAUTH_DOMAIN +
        ".auth." +
        config.cognito.REGION +
        ".amazoncognito.com"
      }`,
      scope: ["email", "profile", "openid", "aws.cognito.signin.user.admin"],
      // TODO: Replace when env vars are fixed
      redirectSignIn: "http://localhost:3000",
      redirectSignOut: "http://localhost:3000",
      responseType: "token",
    },
  },
  API: {
    endpoints: [
      {
        name: "api",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
        // custom_header: async () => {
        //   // Alternatively, with Cognito User Pools use this:
        //   return {
        //     Authorization: await getAuth(),
        //   };
        // },
      },
    ],
  },
  ssr: true,
};
Amplify.configure(configuration);
console.log(configuration);

export default async function handler(req, res) {
  const { email, password, given_name } = req.body;
  const { Auth } = withSSRContext({ req });
  try {
    const user = await Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email,
        given_name: given_name,
      },
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error });
  }
}
