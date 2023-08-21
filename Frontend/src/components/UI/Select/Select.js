import React from "react";
import styles from "./Select.module.css";

function Select(props) {
  const selectChangeHandler = (e) => {
    props.onChange(e.target.value);
  };
  return (
    <div className={`form-group ${styles.selectDiv}`}>
      <label htmlFor={props.id}>{props.label}:</label>
      <select
        className="form-control"
        id={props.id}
        name={props.name}
        onChange={selectChangeHandler}
        value={props.value}
      >
        {props.values.map((optionValue) => {
          return (
            <option key={optionValue} value={optionValue}>
              {optionValue}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
