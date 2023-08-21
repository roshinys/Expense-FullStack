import React from "react";
import styles from "./Input.module.css";

function Input(props) {
  const activeError = !props.isValid && props.error ? ` ${styles.active}` : "";

  const inputChangeHandler = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <div className={`form-group ${styles.divInput}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        className={`form-control ${activeError}`}
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={inputChangeHandler}
      />
    </div>
  );
}
export default Input;
