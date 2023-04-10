import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = ({ id, addToCart }) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredAmount = amountRef.current.value;
    const numEnteredAmount = Number(enteredAmount);

    if(numEnteredAmount.length === 0 || numEnteredAmount < 1 || numEnteredAmount > 5) {
      setAmountIsValid(false);
      return;
    }
    addToCart(numEnteredAmount)
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount_" + id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>Add</button>
      {!amountIsValid ? (<p>Please enter a valid amount! (1- 5)</p>) :  null}
    </form>
  );
};

export default MealItemForm;
