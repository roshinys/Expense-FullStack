import React, { useCallback, useState } from "react";
import Button from "../../UI/Button/Button";
import { useNavigate } from "react-router-dom";
import Input from "../../UI/Input/Input";
import styles from "./ForgotPass.module.css";

function ForgotPass() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const resetPassHandler = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (email.trim() === 0 || !email.includes("@")) {
          throw new Error("not a valid email address");
        }
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_APIKEY}`,
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
              requestType: "PASSWORD_RESET",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error checking email verification");
        }
        alert("Successfully sent a reset Link");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } catch (err) {
        alert(err);
      }
    },
    [email, navigate]
  );

  const emailChangeHanddler = useCallback((value) => {
    setEmail(value);
  }, []);

  return (
    <form className={styles.resetForm} onSubmit={resetPassHandler}>
      <Input
        id="email"
        type="email"
        placeholder="Email"
        label="Email"
        onChange={emailChangeHanddler}
      />
      <Button type="submit">Send Reset Link</Button>
    </form>
  );
}

export default ForgotPass;
