import React from "react";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import styles from "./ExpenseList.module.css";
import ExpenseDownload from "../ExpenseDownload/ExpenseDownload";

function ExpenseList(props) {
  return (
    <>
      <div className="container">
        <h3>Expense List</h3>
        <table className={`table ${styles.tableBorderless}`}>
          <thead>
            <tr>
              <th>Expense</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {props.expenses.map((expense) => {
              return (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                  onDelete={props.onDelete}
                  onEdit={props.onEdit}
                ></ExpenseItem>
              );
            })}
          </tbody>
        </table>
      </div>
      <ExpenseDownload />
    </>
  );
}

export default ExpenseList;
