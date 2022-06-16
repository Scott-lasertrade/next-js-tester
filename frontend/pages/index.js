import { useState } from "react";
import { useRouter } from "next/router";
// import { Auth } from "@aws-amplify/auth";
import { notification, Grid } from "antd";
// import { switchPages } from "~/utilities/auth/layoutHelper";
import SignUpContainer from "../components/SignUpContainer";
import SideBanner from "../components/SideBanner";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from "amazon-cognito-identity-js";
import config from "../config";

const { useBreakpoint } = Grid;

export const switchPages = (page) => {
  if (page === "sign-in") {
    return "auth-container";
  } else if (page === "sign-up") {
    return "auth-container right-panel-active";
  } else if (page === "forgot-password") {
    return "auth-container right-panel-active";
  }
};

const SignUp = () => {
  const screens = useBreakpoint();
  const Router = useRouter();
  const [accountRegistered, setAccountRegistered] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("sign-up");

  const validateMissing = () => {
    let missingFields = [];

    if (!firstName) {
      missingFields = [...missingFields, "First Name"];
    }

    if (!email) {
      missingFields = [...missingFields, "Email"];
    }

    if (!password) {
      missingFields = [...missingFields, "Password"];
    }

    if (!confirmPassword) {
      missingFields = [...missingFields, "Confirm Password"];
    }

    if (missingFields.length !== 0) {
      notification["warning"]({
        message: `Please Enter`,
        description: `${missingFields.join(", ")}`,
      });

      return true;
    }

    return false;
  };

  const validatePasswords = () => {
    if (!password && !confirmPassword) {
      return true;
    }

    if (password !== confirmPassword) {
      notification["warning"]({
        message: `Passwords do not match`,
        description: `The passwords do not match!`,
      });
      return true;
    }

    return false;
  };

  const valuesToAttributes = ({ email, given_name }) => {
    const attributeEmail = new CognitoUserAttribute({
      Name: "email",
      Value: email,
    });
    const attributeGivenName = new CognitoUserAttribute({
      Name: "given_name",
      Value: given_name,
    });
    return [attributeEmail, attributeGivenName];
  };

  const register = (userPool, email, password, attribute_list) => {
    return new Promise((resolve, reject) => {
      userPool.signUp(email, password, attribute_list, null, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        const cognitoUser = result.user;
        resolve(cognitoUser);
      });
    });
  };

  const submit = async () => {
    // try {
    setLoading(true);
    const attributes = valuesToAttributes({ email, given_name: firstName });
    console.log(attributes);
    const poolData = {
      UserPoolId: config.cognito.USER_POOL_ID, // Your user pool id here
      ClientId: config.cognito.APP_CLIENT_ID, // Your client id here
    };
    const userPool = new CognitoUserPool(poolData);
    register(userPool, email, password, attributes)
      .then((usr) => {
        notification["success"]({
          message: `Account Registered.`,
          description: `${usr.getUsername()} has been registered, please check your email to continue.`,
        });
        setAccountRegistered(true);
        console.log("Created User", usr);
      })
      .catch((err) => {
        if (err.code === "UsernameExistsException") {
          notification["warning"]({
            message: `Account already exists.`,
            description: `${email} already exists within our system, try logging in`,
          });
        } else {
          notification["warning"]({
            message: `Error: ${err.code}`,
            description: `${err.message}`,
          });
        }
      })
      .finally(() => setLoading(false));
  };

  const signUp = (e) => {
    e.preventDefault();

    let hasError = [];

    hasError = [...hasError, validateMissing()];
    hasError = [...hasError, validatePasswords()];

    if (!hasError.includes(true)) {
      submit();
    }
  };

  return (
    <div className="auth-outer-container">
      {accountRegistered ? (
        <div className="auth-container">
          <div className="auth-overlay-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                Router.push("/sign-in");
              }}
            >
              <h1 className="auth-headings-alt">
                Your account has been registered.
              </h1>
              <h2 className="auth-headings-alt">
                Please check your email to continue.
              </h2>
              <button className="auth-btn ghost" type="submit">
                Back To Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className={switchPages(page)}>
          <SignUpContainer
            signUp={signUp}
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            setFirstName={setFirstName}
            loading={loading}
            screens={screens}
          />
          {!screens.xs ? (
            <SideBanner
              page={page}
              setPage={setPage}
              initialTitle="One of us?"
              initialDesc="To keep connected with us please login with your personal info"
              initialBtn="SIGN IN"
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default SignUp;
