import React, { useReducer, useState } from "react";
import Input from "../../UI/Input/Input";
import styles from "./AuthForm.module.css";
import Button from "../../UI/Button/Button";
import { Link } from "react-router-dom";

const authReducer = (state, action) => {
  switch (action.type) {
    case "USER_EMAIL":
      const emailValid = action.payload.email.toString().includes("@");
      return {
        ...state,
        email: action.payload.email.toString().toLowerCase(),
        isValidEmail: emailValid,
      };
    case "USER_PASSWORD":
      return {
        ...state,
        password: action.payload.password.toString().trim(),
        isValidPassword: action.payload.password.length >= 6,
      };
    default:
      return state;
  }
};

function AuthForm(props) {
  const initialState = {
    email: "",
    isValidEmail: null,
    password: "",
    isValidPassword: null,
  };

  const [userDetail, dispatch] = useReducer(authReducer, initialState);

  const [error, setError] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const emailChangeHandler = (value) => {
    dispatch({ type: "USER_EMAIL", payload: { email: value } });
  };

  const passwordChangeHandler = (value) => {
    dispatch({ type: "USER_PASSWORD", payload: { password: value } });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (userDetail.isValidEmail && userDetail.isValidPassword) {
      const response = await fetch(
        `${props.url}${process.env.REACT_APP_FIREBASE_APIKEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: userDetail.email,
            password: userDetail.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setError(false);
        setErrorMessage("");
        if (props.login) {
          const data = await response.json();
          const token = data.idToken;
          const uid = data.localId;
          props.onLogin(token, uid);
        } else {
          props.onRegister();
        }
      } else {
        setError(true);
        const data = await response.json();
        setErrorMessage("Authentication Failed");
        if (data && data.error && data.error.message) {
          setErrorMessage(data.error.message);
        }
      }
    } else {
      setError(true);
      setErrorMessage("Add Valid Email or Password");
    }
    setIsLoading(false);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>{props.name}</h1>
        <form onSubmit={submitHandler} className={styles.form}>
          <Input
            label="Email"
            type="email"
            id="email"
            isValid={userDetail.isValidEmail}
            error={error}
            placeholder="Your email address"
            onChange={emailChangeHandler}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            isValid={userDetail.isValidPassword}
            error={error}
            placeholder="Your password"
            onChange={passwordChangeHandler}
          />
          {error && <p className={styles.error}>{errorMessage}</p>}
          {props.login && (
            <div className={styles.forgotPass}>
              <Link to="/forgotpassword">forgot Password ?</Link>
            </div>
          )}
          <Button type="submit">
            {!loading ? `${props.name}` : "Sending Request"}
          </Button>
          <div className={styles.forgotPass}>
            <Link to={props.redirectTo}>{props.redirectMessage}</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
