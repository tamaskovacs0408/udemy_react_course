## useEffect hook

`import { useEffect } from "react"`

With the useEffect hook we can handling side effects of a React app. Always add everything you refer to inside of useEffect as a dependency!

It takes 2 arguments: `useEffect(()=> {}, [dependencies])`

 1. A function that should be executed after every component evaluation if the specified dependencies changed (the side effect codes go here)
 2. The dependencies of this effect -  the previous function only runs if THIS changes

 In the dependencies we have to add all dependencies which are in the useEffect function.

 **The dependencies tell to the React app, that after every specified component (where the `useEffect` is used) execution rerun the function inside the `useEffect` hook, if one of the dependencies is changed. (Don't put the `useState`'s setState function into the dependencies) If neither of them is changed, the function won't run.**

*Debouncing:*

We can also implement a `setTimeout()` method inside the `useEffect` hook and set up that the function is delayed by a given time.

*Clean up function:*

The `useEffect` hook can return a function after its first, function argument. This *clean up* function runs **before** the useEffet's function (it won't run before the very first side effect function).

```js

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [setFormIsValid, enteredEmail, enteredPassword]);

```

## localStorage

 In the browser's localStorage we can store infos of a webpage (e.g. logged in, session etc.).

 To store items, call the `localStorage.setItem()` method. This function takes 2 arguments, the first is the key, the value is stored and the second is the actual value. **Each value have to be string.**

 ```js
 localStorage.setItem("isLoggedIn", "true"); // set the "isLoggedIn" to "true"
 ```

 We can get the stored value with the `localStorage.getItem()` method. The method takes 1 argument, which is the key of the stored value (and have to be string).
 We can also save this value to a variable for future purposes (like authorization, validation etc).

 ```js
 localStorage.getItem("isLoggedIn");

 const storedUserLogin = localStorage.getItem("isLoggedIn");
 ```

### useReducer hook

`useReducer()` hook can be used as a replacement of `useState` if a more powerful state management is needed. It's good to replace `useState`, when we have states that belong together and/or if have some state updates that depend on other state.

```js
const [state, dispatchFunction] = useReducer(reducerFunction, initialState, initialFunction);
```

- In this example the `state` is the latest state snapshot used in the component,
- and the `dispatchFunction` is a function that allows to update this state snapshot (it's like the useState's `state, setState`).
- Inside the `useReducer`, the `reducerFunction` is a function that triggered automatically once an action is dispatched (via the `dispatchFunction`). It receives the latest state snapshot and should return the new, updated state.
- The `intialState` and the `initialFunction` are ignored for now

Because the explain of useReducer is a bit (not bit) chaotic, more of this can be read [here](https://github.com/tamaskovacs0408/web_tutorials/tree/master/usereducer_tutorial).

### Context API - useContext hook

The Context API is used for to replace passing states through components with props.