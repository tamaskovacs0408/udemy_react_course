import "./ExpensesList.css";

const ExpensesList = () => {
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