import React, { useEffect, useState } from "react";
import Header from "../Layout/Header/Header";
import ExpenseForm from "./ExpenseForm/ExpenseForm";
import ExpenseList from "./ExpenseList/ExpenseList";
import { getExpense, deleteExpense } from "../api/expense-api";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expense-store";
import ExpensePremium from "./ExpensePremium/ExpensePremium";

function Expense() {
  const userId = useSelector((state) => state.auth.userId);
  const { expenses, totalExpense } = useSelector((state) => state.expense);
  const dispatch = useDispatch();
  const [editExpense, setEditExpense] = useState({
    expense: "",
    description: "",
    category: "petrol",
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const fetchedExpenses = await getExpense(userId);
        dispatch(expenseActions.setExpense({ expenses: fetchedExpenses }));
      } catch (err) {
        alert(err);
      }
    };
    fetchExpenses();
  }, [dispatch, userId]);

  const addExpenseHandler = (newExpense) => {
    dispatch(expenseActions.addExpense({ newExpense: newExpense }));
  };

  const editExpenseHandler = (expenseId) => {
    const expenseToEdit = expenses.find((exp) => exp.id === expenseId);
    setEditExpense(expenseToEdit);
    deleteExpenseHandler(expenseId);
  };

  const deleteExpenseHandler = async (expenseId) => {
    deleteExpense(expenseId, userId);
    dispatch(expenseActions.deleteExpense({ expenseId }));
  };

  return (
    <>
      <Header />
      {totalExpense >= 1000 && <ExpensePremium />}
      <div className="row">
        <div className="col">
          <ExpenseForm
            onAddExpense={addExpenseHandler}
            editExpense={editExpense}
          />
        </div>
        <div className="col">
          <ExpenseList
            expenses={expenses}
            onDelete={deleteExpenseHandler}
            onEdit={editExpenseHandler}
          />
        </div>
      </div>
    </>
  );
}

export default Expense;
