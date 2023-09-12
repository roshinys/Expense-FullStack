import React from "react";
import Button from "../../UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./ExpenseItem.module.css";

function ExpenseItem(props) {
  const editExpenseHandler = () => {
    props.onEdit(props.expense.id);
  };

  const deleteExpenseHandler = () => {
    props.onDelete(props.expense.id);
  };

  return (
    <tr className={styles.expenseRow}>
      <td>{props.expense.expense}</td>
      <td>{props.expense.description}</td>
      <td>{props.expense.category}</td>
      <td>
        <Button onClick={deleteExpenseHandler}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </td>
      <td>
        <Button onClick={editExpenseHandler}>
          <FontAwesomeIcon icon={faPencil} />
        </Button>
      </td>
    </tr>
  );
}

export default ExpenseItem;
