import React from "react";
import Button from "../../UI/Button/Button";
import styles from "./ExpensePremium.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth-store";
import { rzyPayment } from "../../api/expense-api";

function ExpensePremium() {
  const isPremium = useSelector((state) => state.auth.isPremium);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const premiumClickHandler = (e) => {
    e.preventDefault();
    rzyPayment(token, dispatch, authActions.setPremium);
  };

  return (
    <div className={styles.premFeature}>
      {!isPremium && <Button onClick={premiumClickHandler}>Buy Premium</Button>}
    </div>
  );
}

export default ExpensePremium;
