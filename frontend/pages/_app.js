import "antd/dist/antd.css";
import "../scss/styles.scss";
// import config from "../config";
// import Amplify from "@aws-amplify/core";
// import Auth from "@aws-amplify/auth";

// const getAuth = async () => {
//   try {
//     const auth = await Auth.currentSession();
//     if (auth) {
//       return `Bearer ${auth.getAccessToken().getJwtToken()}`;
//     }
//     return "Bearer";
//   } catch (e) {
//     return "";
//   }
// };

// const configuration = {
//   Auth: {
//     region: config.cognito.REGION,
//     userPoolId: config.cognito.USER_POOL_ID,
//     identityPoolId: config.cognito.IDENTITY_POOL_ID,
//     userPoolWebClientId: config.cognito.APP_CLIENT_ID,
//     mandatorySignIn: false,
//     oauth: {
//       domain: `${
//         config.cognito.OAUTH_DOMAIN +
//         ".auth." +
//         config.cognito.REGION +
//         ".amazoncognito.com"
//       }`,
//       scope: ["email", "profile", "openid", "aws.cognito.signin.user.admin"],
//       // TODO: Replace when env vars are fixed
//       redirectSignIn: "http://localhost:3000",
//       redirectSignOut: "http://localhost:3000",
//       responseType: "token",
//     },
//   },
//   API: {
//     endpoints: [
//       {
//         name: "api",
//         endpoint: config.apiGateway.URL,
//         region: config.apiGateway.REGION,
//         custom_header: async () => {
//           // Alternatively, with Cognito User Pools use this:
//           return {
//             Authorization: await getAuth(),
//           };
//         },
//       },
//     ],
//   },
//   ssr: true,
// };
// Amplify.configure(configuration);
// console.log(configuration);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
