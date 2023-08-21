import React, { useEffect, useState } from "react";
import { addExpense } from "../../api/expense-api";
import Input from "../../UI/Input/Input";
import Select from "../../UI/Select/Select";
import Button from "../../UI/Button/Button";
import styles from "./ExpenseForm.module.css";
import { useSelector } from "react-redux";

function ExpenseForm(props) {
  const token = useSelector((state) => state.auth.token);
  const [expense, setExpense] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("petrol");
  const editExpense = props.editExpense;
  useEffect(() => {
    setExpense(editExpense.expense);
    setCategory(editExpense.category);
    setDescription(editExpense.description);
  }, [editExpense]);

  const expenseChangeHandler = (value) => {
    setExpense(value);
  };
  const descriptionChangeHandler = (value) => {
    setDescription(value);
  };

  const categoryChangeHandler = (value) => {
    setCategory(value);
  };

  const addExpenseHandler = async (e) => {
    e.preventDefault();
    if (
      parseInt(expense) > 0 &&
      description.length > 0 &&
      category.length > 0
    ) {
      let newExpense = {
        expense: parseInt(expense),
        description: description,
        category: category,
      };
      const expenseId = await addExpense(newExpense, token);
      newExpense = { ...newExpense, id: expenseId };
      props.onAddExpense(newExpense);
    } else {
      alert("enter valid expense details");
    }
  };

  return (
    <form
      className={`container ${styles.expenseForm}`}
      onSubmit={addExpenseHandler}
    >
      <h3>Expense Form</h3>
      <Input
        id="expense"
        type="number"
        placeholder="Expense"
        label="Expense"
        value={expense}
        onChange={expenseChangeHandler}
      />
      <Input
        id="description"
        type="text"
        placeholder="Description"
        label="Description"
        value={description}
        onChange={descriptionChangeHandler}
      />
      <Select
        id="category"
        label="Category"
        values={["petrol", "shop", "other"]}
        value={category}
        onChange={categoryChangeHandler}
      />
      <Button type="submit">Add Expense</Button>
    </form>
  );
}

export default ExpenseForm;
