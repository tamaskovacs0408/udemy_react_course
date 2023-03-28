# React

## The best practice to get the most updated states:

1. 

```js
...
const [state, setState] = useState(0);

const handleState = () => {
  setState(previousState => previousState + 1)
}
```

2. 
```js
...
 const [userInput, setUserInput] = useState({
     enteredTitle: "",
     enteredAmount: "",
     enteredDate: "",
   });

  const handleTitleInput = (e) => {
     setUserInput((previousState) => {
       return { ...previousState, enteredTitle: e.target.value };
     });
  };

  const amountChangeHandler = (e) => {
     setUserInput((previousState) => {
       return { ...previousState, enteredAmount: e.target.value };
     });
  };

  const dateChangeHandler = (e) => {
     setUserInput((previousState) => {
       return { ...previousState, enteredDate: e.target.value };
     });
  };
  ...
```

## Passing data from child to parent

The parent sends a function to child to get the data

1. Create a function in the parent to get the data

2. Send the function to child

3. Force the child to give the data into the function

4. The function gives back the data to the parent