import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
// import { verifyEmail, emailVerified } from "../../api/auth-api";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth-store";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = "http://localhost:8000/auth/getUser";

  const loginHandler = async (token, userId, isPremium) => {
    // await verifyEmail(token);
    // const isEmailVerified = await emailVerified(token);
    // if (!isEmailVerified) {
    //   alert("Verify Your Email Please Only then You can Login");
    //   return;
    // }
    console.log(token, userId, isPremium);

    dispatch(
      authActions.login({ token: token, userId: userId, isPremium: isPremium })
    );
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
