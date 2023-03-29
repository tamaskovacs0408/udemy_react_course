import { useState } from "react";
import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpenseFilter";

const Expenses = ({ expenses }) => {
  const [filteredYear, setFilteredYear] = useState("2020");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = expenses.filter(expense => {
    return expense.date.getFullYear().toString() === filteredYear;
  })

  return (
    <>
      <Card className="expenses">
        <ExpensesFilter
          selected={filteredYear}
          onFilter={filterChangeHandler}
        />
        {filteredExpenses.map((expense) => {
          return (
            <ExpenseItem
              key={expense.id}
              title={expense.title}
              date={expense.date}
              amount={expense.amount}
            />
          );
        })}
      </Card>
    </>
  );
};

export default Expenses;
