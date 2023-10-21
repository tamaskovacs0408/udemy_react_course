# Custom Hooks

## Creating

```js
import { useState, useCallback } from "react";

/**
 * A custom hook for making HTTP requests.
 *
 * @return {Object} - An object containing isLoading, error, and sendRequest properties.
 */
const useHttp = () => {
  // Initialize state variables for loading and error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define a function to send HTTP requests
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    // Set loading to true and clear any previous errors
    setIsLoading(true);
    setError(null);

    try {
      // Send the HTTP request using fetch API
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      // Throw an error if the response is not OK
      if (!response.ok) {
        throw new Error("Request failed!");
      }

      // Parse the response data as JSON
      const data = await response.json();

      // Apply the response data to the provided callback function
      applyData(data);
    } catch (err) {
      // Set the error message if an error occurs
      setError(err.message || "Something went wrong!");
    }

    // Set loading to false after the request is completed
    setIsLoading(false);
  }, []);

  // Return the state variables and sendRequest function
  return {
    isLoading,
    error,
    sendRequest,
    /*
      This is the same
      isLoading: isLoading,
      error: error,
      sendRequest: sendRequest
      */
  };
};

export default useHttp;
```

## Using

```js
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
```
