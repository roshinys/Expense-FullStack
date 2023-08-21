const Expense = require("../models/Expense");
const User = require("../models/User");
const sequelize = require("../util/database");

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await req.user.getExpenses({
      attributes: ["id", "expense", "category", "description"],
    });
    res.status(200).json({
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

exports.deleteExpense = async (req, res) => {
  try {
    const id = req.params.expenseId;
    await Expense.destroy({
      where: {
        id: id,
        userId: req.user.id,
      },
    });
    return res
      .status(200)
      .json({ msg: "Successfully Deleted Expense", success: true });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "Failed To Delete Expense", success: false });
  }
};

exports.getLeaderBoardExpenses = async (req, res) => {
  try {
    if (!req.user.isPremium) {
      return res
        .status(400)
        .json({ message: "Not a Premium User", success: false });
    }
    const usersWithExpenses = await User.findAll({
      attributes: ["id", "email"], // Select the columns you need from the User table
      include: [
        {
          model: Expense,
          attributes: [
            [sequelize.fn("SUM", sequelize.col("expense")), "totalExpense"], // Calculate total expenses for each user
          ],
          as: "expenses", // Alias for the Expense association
        },
      ],
      group: ["User.id"], // Group by User.id to get total expenses for each user
      order: sequelize.literal('"totalExpense" DESC'), // Order by totalExpense in descending order
      raw: true, // Use raw queries for the alias in the ORDER BY clause
    });

    res.status(200).json({
      success: true,
      usersWithExpenses,
      message: "Successfully fetched all users",
    });
  } catch (error) {
    console.error("Error retrieving users with expenses:", error);
    res.status(500).json({ message: "Error retrieving users with expenses." });
  }
};
