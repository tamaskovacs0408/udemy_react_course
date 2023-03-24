import "./ExpenseItem.css";

function ExpenseItem({ date, title, amount }) {
  return (
    <div className="expense-item">
      <div>{date.toISOString().slice(0, 10)}</div>
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${amount}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
