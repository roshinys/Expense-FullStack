import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-store";
import expenseReducer from "./expense-store";
import themeReducer from "./theme-store";

const store = configureStore({
  reducer: {
    auth: authReducer,
    expense: expenseReducer,
    theme: themeReducer,
  },
});

export default store;
