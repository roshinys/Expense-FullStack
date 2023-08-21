import React from "react";
import Button from "../../UI/Button/Button";

function ExpenseItem(props) {
  const editExpenseHandler = () => {
    props.onEdit(props.expense.id);
  };

  const deleteExpenseHandler = () => {
    props.onDelete(props.expense.id);
  };

  return (
    <tr>
      <td>{props.expense.expense}</td>
      <td>{props.expense.description}</td>
      <td>{props.expense.category}</td>
      <td>
        <Button onClick={deleteExpenseHandler}>Delete</Button>
      </td>
      <td>
        <Button onClick={editExpenseHandler}>Edit</Button>
      </td>
    </tr>
  );
}

export default ExpenseItem;
