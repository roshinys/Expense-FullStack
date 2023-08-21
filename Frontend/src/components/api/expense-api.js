export const addExpense = async (expense, token) => {
  try {
    const response = await fetch(`http://localhost:8000/expense/postExpense`, {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (!response.ok) {
      throw new Error("Error While Adding Expense");
    }
    const data = await response.json();
    if (!data || !data.success) {
      throw new Error("Something went wrong");
    }
    const expenseId = data.expenseId;
    return expenseId;
  } catch (err) {
    alert(err);
  }
};

export const getExpense = async (token) => {
  try {
    const response = await fetch(`http://localhost:8000/expense/getExpense`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.msg);
    }
    const expenses = data?.expenses ? data.expenses : [];
    return expenses;
  } catch (err) {
    alert(err);
  }
};

export const deleteExpense = async (expenseId, token) => {
  try {
    const response = await fetch(
      `http://localhost:8000/expense/deleteExpense/${expenseId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application.json",
          Authorization: token,
        },
      }
    );
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.msg);
    }
    return true;
  } catch (err) {
    alert(err);
    return false;
  }
};
