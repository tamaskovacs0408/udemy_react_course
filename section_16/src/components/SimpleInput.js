import { useRef, useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);

  const nameInputRef = useRef();

  const handleEnteredName = (event) => {
    setEnteredName(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (enteredName.trim().length === 0 || enteredName === null) {
      setEnteredNameIsValid(false)
      return;
    }

    setEnteredNameIsValid(true);

    console.log(nameInputRef.current.value);
    setEnteredName("");
  };

  const nameInputClasses = enteredNameIsValid ? "form-control" : "form-control invalid";

  return (
    <form onSubmit={handleFormSubmit}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={handleEnteredName}
          ref={nameInputRef}
          value={enteredName}
        />
        {!enteredNameIsValid &&(<p className="error-text">Name must not be empty!</p>)}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
