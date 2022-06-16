import Link from "next/link";
import { useState } from "react";
import { Button, notification } from "antd";
// import API from "@aws-amplify/api-rest";

const SignUpContainer = ({
  signUp,
  setFirstName,
  setEmail,
  setPassword,
  setConfirmPassword,
  loading,
  screens,
}) => {
  const [loadingRoute, setLoadingRoute] = useState(false);
  // const publicRoute = (e) => {
  //   setLoadingRoute(true);
  //   return API.post("api", "/public", { value: 1, name: "value" })
  //     .then((res) => {
  //       console.log(res);
  //       notification["success"]({
  //         message: "Successfully called api.",
  //         description: `${res}`,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       notification["error"]({
  //         message: "Failed to call api",
  //         description: `${err}`,
  //       });
  //     })
  //     .finally(() => setLoadingRoute(false));
  // };
  return (
    <div className="auth-form-container auth-right-container">
      <form onSubmit={signUp}>
        <h1 className="auth-headings">Create Account</h1>
        <input
          className="auth-input-forms"
          type="text"
          placeholder="First Name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <input
          className="auth-input-forms"
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="auth-input-forms"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          className="auth-input-forms"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />

        <button className="auth-btn" type="submit" disabled={loading}>
          {loading ? "Loading..." : "SIGN UP"}
        </button>
        <div className="terms-checkbox">
          <label>
            By clicking Sign Up, you agree to our
            <a href="#"> Terms</a>,<a href="#"> Data Policy </a>
            and
            <a href="#"> Cookie Policy. </a>
          </label>
        </div>
        {screens.xs ? (
          <Link href="/auth/sign-in" passHref>
            <button className="auth-btn link" style={{ width: "150px" }}>
              SIGN IN
            </button>
          </Link>
        ) : (
          <></>
        )}
      </form>
      <Button loading={loadingRoute}>TEST PUBLIC ROUTE</Button>
    </div>
  );
};

export default SignUpContainer;
