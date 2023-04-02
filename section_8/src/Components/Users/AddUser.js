import Card from "../UI/Card";
import Button from "../UI/Button";

import style from "./AddUser.module.css";

const AddUser = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Card outerClass={style.input}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" />
        <label htmlFor="age">Age (Years)</label>
        <input id="age" type="number" />
        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};

export default AddUser;
