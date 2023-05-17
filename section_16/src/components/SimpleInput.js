import { useRef, useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const nameInputRef = useRef();

  const handleEnteredName = (event) => {
    setEnteredName(event.target.value);
    if (event.target.value.trim() !== "") {
      setEnteredNameIsValid(true)
    }
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);

    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false)
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);
    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false)
      return;
    }

    setEnteredNameIsValid(true);

    console.log(nameInputRef.current.value);
    setEnteredName("");
  };

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  const nameInputClasses = nameInputIsInvalid ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={handleFormSubmit}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={handleEnteredName}
          onBlur={nameInputBlurHandler}
          ref={nameInputRef}
          value={enteredName}
        />
        {nameInputIsInvalid &&(<p className="error-text">Name must not be empty!</p>)}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
