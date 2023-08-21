import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";

  const registerHandler = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      <AuthForm
        url={url}
        name="Sign Up"
        login={false}
        onRegister={registerHandler}
        redirectTo="/login"
        redirectMessage="Already have an acc? Sign in here..."
      />
    </div>
  );
}

export default Register;
