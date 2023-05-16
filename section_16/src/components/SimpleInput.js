import { useRef, useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");

  const nameInputRef = useRef();

  const handleEnteredName = (event) => {
    setEnteredName(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log(nameInputRef.current.value);
    setEnteredName("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={handleEnteredName}
          ref={nameInputRef}
          value={enteredName}
        />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
