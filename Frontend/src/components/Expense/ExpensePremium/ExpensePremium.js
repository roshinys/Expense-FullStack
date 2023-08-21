import React from "react";
import Button from "../../UI/Button/Button";
import styles from "./ExpensePremium.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth-store";

function ExpensePremium() {
  const isPremium = useSelector((state) => state.auth.isPremium);
  const dispatch = useDispatch();
  const premiumClickHandler = () => {
    dispatch(authActions.setPremium({ isPremium: true }));
  };

  return (
    <div className={styles.premFeature}>
      {!isPremium && <Button onClick={premiumClickHandler}>Buy Premium</Button>}
    </div>
  );
}

export default ExpensePremium;
