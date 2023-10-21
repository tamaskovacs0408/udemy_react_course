import React, { useEffect, useState, useCallback } from "react";
import useHttp from "./hooks/use-http";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

/**
 * Renders the main application component.
 *
 * @return {React.Fragment} The rendered component.
 */
function App() {
  // Declare state variable 'tasks' and a function to update it 'setTasks'
  const [tasks, setTasks] = useState([]);

  // Destructure 'isLoading', 'error', and 'sendRequest' from the custom hook 'useHttp'
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  // Fetch tasks from API when component mounts or 'fetchTasks' dependency changes
  useEffect(() => {
    // Transform the fetched tasks to match the required format
    const transformedTasks = (taskObj) => {
      const loadedTasks = [];

      // Loop through the fetched task object and convert it into an array of tasks
      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }

      // Update the 'tasks' state with the loaded tasks
      setTasks(loadedTasks);
    };

    // Fetch tasks from API using the 'fetchTasks' function from 'useHttp'
    fetchTasks(
      {
        url: "https://react-http-f2e3a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
      },
      transformedTasks
    );
  }, [fetchTasks]);

  // Function to handle adding a new task
  const taskAddHandler = (task) => {
    // Append the new task to the 'tasks' state using the 'setTasks' function
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  // Render the main application component
  return (
    <React.Fragment>
      {/* Render the 'NewTask' component and pass the 'taskAddHandler' function as a prop */}
      <NewTask onAddTask={taskAddHandler} />
      {/* Render the 'Tasks' component and pass the 'tasks', 'isLoading', 'error', and 'fetchTasks' as props */}
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
