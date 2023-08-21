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

export const getLeaderBoardDetails = async (token) => {
  try {
    const response = await fetch(`http://localhost:8000/expense/leaderboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application.json",
        Authorization: token,
      },
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.msg);
    }
    return data.usersWithExpenses;
  } catch (err) {
    // alert(err);
    console.log(err);
  }
};

export const rzyPayment = async (token, dispatch, setPremium) => {
  try {
    const response = await fetch(
      "http://localhost:8000/purchase/premiummembership",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    const options = {
      key: responseData.key_id,
      name: "Express Tracker",
      order_id: responseData.order.id,
      prefill: {
        name: "Test User",
        email: "test.user@example.com",
        contact: "7003442036",
      },
      theme: {
        color: "#3399cc",
      },
      handler: function (response) {
        console.log(response);
        const paymentData = {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        };

        fetch("http://localhost:8000/purchase/updatetransactionstatus", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(paymentData),
        })
          .then((response) => response.json())
          .then(() => {
            alert("You are a Premium User Now");
            dispatch(setPremium({ isPremium: true }));
          })
          .catch(() => {
            alert("Something went wrong. Try Again!!!");
          });
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();

    rzp1.on("payment.failed", function (response) {
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
    });
  } catch (error) {
    console.error("Error:", error);
  }
};
