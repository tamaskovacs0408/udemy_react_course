import "./ExpensesList.css";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({filteredExpenses}) => {
  return (
    filteredExpenses.map((expense) => {
        return (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            date={expense.date}
            amount={expense.amount}
          />
        );
      })
  )
}

export default ExpensesList;

