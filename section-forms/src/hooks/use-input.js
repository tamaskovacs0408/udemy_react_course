import { useState } from "react";

/**
 * Creates a custom hook that manages an input state and provides validation.
 *
 * @param {function} validateValue - A function that validates the entered value.
 * @return {object} - An object containing the entered value, validation status, error status, and event handlers.
 */
// Define a custom hook called useInput that takes a validateValue function as a parameter
const useInput = (validateValue) => {
  // Declare state variables enteredValue and isTouched using the useState hook
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  // Calculate the validity of the enteredValue by calling the validateValue function
  const valueIsValid = validateValue(enteredValue);

  // Determine if there is an error by checking if the value is not valid and has been touched
  const hasError = !valueIsValid && isTouched;

  // Define a function valueChangeHandler that updates the enteredValue state when the input value changes
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  // Define a function inputBlurHandler that sets the isTouched state to true when the input loses focus
  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  // Define a reset function that resets the enteredValue and isTouched states to their initial values
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  }

  // Return an object containing the enteredValue, validity, error status, and event handlers
  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
};


export default useInput;
