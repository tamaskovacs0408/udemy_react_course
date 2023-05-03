# React Custom Hooks

Custom hooks HAVE TO start with *use*!

In the custom hook we can build the full logic we'd like to use in a component (useState, useEffect). To use states(or anything we'd like to use), we have to return them with the custom hook (in array, object or a single value). To use this return value, we have to declare it to a variable in the component. We can add more logics into a custom hook with conditional statements.

## Custom hook (useCounter)

```js
// Custom hook
import { useState, useEffect } from "react";

const useCounter = (forwards = true) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if(forwards) {
        setCounter((prevCounter) => prevCounter + 1);
      } else {
        setCounter((prevCounter) => prevCounter - 1);
      }
      
    }, 1000);

    return () => clearInterval(interval);
  }, [forwards]);

  return counter;
}

export default useCounter;
```
## Components

```js
// Forward counter
import Card from './Card';
import useCounter from '../hooks/use_counter';

const ForwardCounter = () => {
  const counter = useCounter()

  return <Card>{counter}</Card>;
};

export default ForwardCounter;

```

```js
// Backward counter
import Card from './Card';
import useCounter from '../hooks/use_counter';

const BackwardCounter = () => {
  const counter = useCounter(false);

  return <Card>{counter}</Card>;
};

export default BackwardCounter;

```