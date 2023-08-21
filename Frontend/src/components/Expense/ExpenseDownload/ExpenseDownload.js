import React from "react";
import Button from "../../UI/Button/Button";
import { useSelector } from "react-redux";
import styles from "./ExpenseDownload.module.css";

function ExpenseDownload() {
  const expenses = useSelector((state) => state.expense.expenses);
  const isPrem = useSelector((state) => state.auth.isPremium);

  const convertToCSV = (data) => {
    const csvContent = [
      "ExpenseAmount,Description,Category",
      ...data.map(
        (item) => `${item.expense},"${item.description}",${item.category}`
      ),
    ].join("\n");
    return csvContent;
  };

  const downloadExpenseHandler = () => {
    const csvData = convertToCSV(expenses);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className={styles.downloadExpense}>
      {isPrem && (
        <Button onClick={downloadExpenseHandler}>Download Expense</Button>
      )}
    </div>
  );
}

export default ExpenseDownload;
