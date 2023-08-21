exports.getExpenses = async (req, res) => {
  try {
    const expenses = await req.user.getExpenses({
      attributes: ["id", "expense", "category", "description"],
    });
    res.status(404).json({
      msg: "Fetched All Expenses",
      success: true,
      expenses,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "Failed To Fetchs Expenses", success: false });
  }
};

exports.postExpense = async (req, res) => {
  try {
    const expense = req.body.expense;
    const description = req.body.description;
    const category = req.body.category;
    const newExpense = await req.user.createExpense({
      expense: expense,
      description: description,
      category: category,
    });
    res.json({
      success: true,
      msg: "Added New Expense",
      expenseId: newExpense.id,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "Failed To Add New Expense", success: false });
  }
};
