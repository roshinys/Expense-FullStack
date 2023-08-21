import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLeaderBoardDetails } from "../../api/expense-api";
import styles from "./ExpenseLeaderBoard.module.css";

function ExpenseLeaderBoard() {
  const token = useSelector((state) => state.auth.token);
  const [leaderboard, setLeaderBoard] = useState([]);
  useEffect(() => {
    async function f() {
      const data = await getLeaderBoardDetails(token);
      setLeaderBoard(data);
    }
    f();
  }, [token]);
  return (
    <div className={styles.leaderboard}>
      <div className={styles.leaderboardContainer}>
        <h1>leaderboard</h1>
        <div>
          {leaderboard &&
            leaderboard.map((userExpense) => {
              return (
                <div className={styles.userexpense} key={userExpense.id}>
                  <h2>{userExpense.email}</h2>
                  <span> - {userExpense["expenses.totalExpense"]}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ExpenseLeaderBoard;
