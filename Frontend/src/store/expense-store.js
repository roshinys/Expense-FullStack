import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  expenses: [],
  totalExpense: 0,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    setExpense(state, action) {
      state.expenses = action.payload.expenses;
      state.totalExpense = 0;
      state.expenses.forEach((expense) => {
        state.totalExpense += expense.expense;
      });
    },
    addExpense(state, action) {
      state.expenses = [...state.expenses, action.payload.newExpense];
      state.totalExpense += action.payload.newExpense.expense;
    },
    deleteExpense(state, action) {
      state.expenses = state.expenses.filter((expense) => {
        if (expense.id === action.payload.expenseId) {
          state.totalExpense -= expense.expense;
        }
        return expense.id !== action.payload.expenseId;
      });
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
