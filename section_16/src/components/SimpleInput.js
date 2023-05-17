import { useRef, useState } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const handleEnteredName = (event) => {
    setEnteredName(event.target.value);  
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
    
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);
    if (!enteredNameIsValid) {
      return;
    }

    console.log(nameInputRef.current.value);
    setEnteredName("");
    setEnteredNameTouched(false);
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

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
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty!</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
