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

export const getExpense = async (userId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_FIREBASE_EXPENSEURL}/expenses/${userId}.json`
    );
    if (!response.ok) {
      throw new Error("Error While Fetching Expense");
    }
    const data = await response.json();
    const expenses = [];
    for (const key in data) {
      const expense = {
        id: key,
        expense: data[key].expense,
        description: data[key].description,
        category: data[key].category,
      };
      expenses.push(expense);
    }
    return expenses;
  } catch (err) {
    alert(err);
  }
};

export const deleteExpense = async (expenseId, userId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_FIREBASE_EXPENSEURL}/expenses/${userId}/${expenseId}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application.json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error While Deleting Expense");
    }
    return;
  } catch (err) {
    alert(err);
  }
};
