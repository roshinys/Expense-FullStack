import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Button from "../../UI/Button/Button";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth-store";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { themeActions } from "../../../store/theme-store";

function Header() {
  const userId = useSelector((state) => state.auth.userId);
  const defaultTheme = useSelector((state) => state.theme.isDefault);
  const isPremium = useSelector((state) => state.auth.isPremium);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const themeChangeHandler = () => {
    if (defaultTheme) {
      dispatch(themeActions.setDarkTheme());
    } else {
      dispatch(themeActions.setDefaultTheme());
    }
  };

  let aStyle = {
    color: "white",
    borderBottom: "2px solid #ff1e56",
  };

  if (!defaultTheme && isPremium) {
    aStyle = {
      color: "#001c30",
      borderBottom: "2px solid #ff1e56",
    };
  }

  return (
    <header className={styles.header}>
      <div>
        <h3>Expense Tracker</h3>
      </div>
      <div className={styles.headerLinks}>
        <Link to={`/user/edit/${userId}`} style={aStyle}>
          Update Profile
        </Link>
        <Button onClick={logoutHandler}>Logout</Button>
        {isPremium && (
          <FontAwesomeIcon
            icon={faCircleHalfStroke}
            onClick={themeChangeHandler}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
