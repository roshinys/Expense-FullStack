import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { verifyEmail, emailVerified } from "../../api/auth-api";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth-store";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

  const loginHandler = async (token, uid) => {
    await verifyEmail(token);
    const isEmailVerified = await emailVerified(token);
    if (!isEmailVerified) {
      alert("Verify Your Email Please Only then You can Login");
      return;
    }
    dispatch(authActions.login({ token: token, userId: uid }));
    navigate("/expense");
  };

  return (
    <div className="container">
      <AuthForm
        url={url}
        name="Sign In"
        login={true}
        onLogin={loginHandler}
        redirectTo="/register"
        redirectMessage="Don't have an acc sign up here."
      />
    </div>
  );
}

export default Login;
