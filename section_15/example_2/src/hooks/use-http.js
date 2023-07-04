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

export default useHttp;
