import { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

import style from "./AddUser.module.css";

const AddUser = ({ onAddUser }) => {
  const [enterUsername, setEnterUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");

  const handleUsernameChange = (e) => {
    setEnterUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (enterUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      return;
    }
    if (Number(enteredAge) < 1) {
      return;
    }
    onAddUser(enterUsername, enteredAge);
    setEnterUsername("");
    setEnteredAge("");
  };

  return (
    <>
      <ErrorModal title="An error occured!" message="Something went wrong!" />
      <Card outerClass={style.input}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            onChange={handleUsernameChange}
            value={enterUsername}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            onChange={(e) => setEnteredAge(e.target.value)}
            value={enteredAge}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
