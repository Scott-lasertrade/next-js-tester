import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { notification, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
// import { Auth } from "@aws-amplify/auth";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import config from "../config";

const AccountConfirmationPage = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmedAccount, setConfirmedAccount] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    setEmail(new URLSearchParams(window.location.search).get("email"));
  }, []);

  const confirmAccount = (cognitoUser, code) => {
    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, function (err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  };

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code && email) {
      const poolData = {
        UserPoolId: config.cognito.USER_POOL_ID, // Your user pool id here
        ClientId: config.cognito.APP_CLIENT_ID, // Your client id here
      };
      const userPool = new CognitoUserPool(poolData);
      console.log(`${code} ${email}`);
      const userData = {
        Username: email,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);
      confirmAccount(cognitoUser, code)
        .then(() => {
          setConfirmedAccount(true);
          notification["success"]({
            message: "Account Confirmed.",
            description: `Your account has been confirmed successfully.`,
          });
        })
        .catch((err) => {
          const error = err.response ? err.response : err;
          console.error(error);
          if (
            error.message ===
            "User cannot be confirmed. Current status is CONFIRMED"
          ) {
            router.push("/sign-in");
          }
        })
        .finally(() => setLoaded(true));
    }
  }, [email]);

  return (
    <div className="auth-outer-container">
      <div className="auth-container">
        <div className="auth-overlay-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/sign-in");
            }}
          >
            <h1 className="auth-headings-alt">
              {loaded
                ? confirmedAccount
                  ? "Account Confirmed."
                  : "Failed to confirm."
                : "Confirming your account..."}
            </h1>
            <h2 className="auth-headings-alt">Email: {email}</h2>
            {loaded ? (
              <button className="auth-btn ghost" type="submit">
                Go To Login
              </button>
            ) : (
              <button className="auth-btn" type="submit" disabled>
                <Spin indicator={antIcon} />
                &nbsp;Loading...
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountConfirmationPage;
