import "./ExpenseItem.css";

function ExpenseItem() {
  const expenseDate = new Date(2023, 3, 24);
  const expenseTitle = "Car Insurance";
  const expensePrice = 294.67;

  return (
    <div className="expense-item">
      <div>{expenseDate.toISOString().slice(0, 10)}</div>
      <div className="expense-item__description">
        <h2>{expenseTitle}</h2>
        <div className="expense-item__price">${expensePrice}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
