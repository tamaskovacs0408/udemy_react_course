import { useState } from "react";

import AddUser from "./Components/Users/AddUser";
import UsersList from "./Components/Users/UsersList";
function App() {
  const [usersList, setUsersList] = useState([]);

  const handleAddUser = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [...prevUsersList, {name: uName, age: uAge, id: Math.random().toString()}];
    })
  }

  return (
    <div>
      <AddUser onAddUser={handleAddUser}/>
      <UsersList users={usersList}/>
    </div>
  );
}

export default App;
