import {useState} from "react";
import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpenseFilter";

const Expenses = ({ expenses }) => {
  const [filteredYear, setFilteredYear] = useState('2020');

  const filterChangeHandler = selectedYear => {
    setFilteredYear(selectedYear);
  }

  return (
    <>
      <Card className="expenses">
        <ExpensesFilter selected={filteredYear} onFilter={filterChangeHandler}/>
        <ExpenseItem
          date={expenses[0].date}
          title={expenses[0].title}
          amount={expenses[0].amount}
        />
        <ExpenseItem
          date={expenses[1].date}
          title={expenses[1].title}
          amount={expenses[1].amount}
        />
        <ExpenseItem
          date={expenses[2].date}
          title={expenses[2].title}
          amount={expenses[2].amount}
        />
        <ExpenseItem
          date={expenses[3].date}
          title={expenses[3].title}
          amount={expenses[3].amount}
        />
      </Card>
    </>
  );
};

export default Expenses;
