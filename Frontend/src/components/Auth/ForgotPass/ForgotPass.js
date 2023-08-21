import React, { useCallback, useEffect, useState } from "react";
import Button from "../../UI/Button/Button";
import { useNavigate } from "react-router-dom";
import Input from "../../UI/Input/Input";
import styles from "./ForgotPass.module.css";

function ForgotPass() {
  const [link, setLink] = useState(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (link) {
      // Automatically open the link when it's available
      window.open(link, "_blank");
    }
  }, [link]);

  const resetPassHandler = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (email.trim() === 0 || !email.includes("@")) {
          throw new Error("not a valid email address");
        }
        const response = await fetch(`http://localhost:8000/forgotpass`, {
          method: "POST",
          body: JSON.stringify({
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error checking email verification");
        }
        const data = await response.json();
        if (data?.link) {
          setLink(data.link);
        }
        // navigate("/login");
      } catch (err) {
        alert(err);
      }
    },
    [email]
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
