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
