import { useRef } from "react";
import classes from "./Checkout.module.css";

const Checkout = ({ closeCart }) => {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

  const handleConfirm = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
  };

  return (
    <form onSubmit={handleConfirm}>
      <div className={classes.control}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" ref={nameInputRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}/>
      </div>
      <button type="button" onClick={closeCart}>
        Cancel
      </button>
      <button>Confirm</button>
    </form>
  );
};

export default Checkout;
