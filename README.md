# React course

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
3. Updating object  - BETTER SOLUTION

A példában létrehozunk egy handleInputChange függvényt, amely a mező nevének (name) és értékének (value) alapján frissíti az állapotot dinamikusan. Ez lehetővé teszi, hogy csak egyetlen kezelőfüggvényt használj a komponensen belül. Az input mezők name attribútumát használjuk azonosítóként, hogy megkülönböztessük a mezőket a handleInputChange függvényben. Ez a módszer hatékonyabb, mert csökkenti a kód ismétlődését, és könnyen karbantarthatóbbá teszi a komponenst. A korábbi megközelítésnél, amikor külön handleNameChange és handleAgeChange függvényeket használtál, volt két külön blokk ugyanolyan logikával. Most csak egyetlen handleInputChange függvényt kell karbantartanod, ami egyszerűbb és könnyebb hibákat elkerülni.

Ezenkívül a dinamikus mezőnevekkel ([name]) való használat lehetővé teszi, hogy a kódban bővítsd vagy csökkentsd a mezők számát anélkül, hogy a kezelőfüggvényeken változtatnál. Így a kód skálázhatóbb lesz, és könnyen alkalmazkodik a jövőbeni változtatásokhoz.

Ezen okok miatt általában javasolt használni a dinamikus mezőneveket az állapotkezelésben, amikor objektumokat használsz React komponensekben.

```js
export default function App() {
  const [user, setUser] = useState({ name: "", age: 32 });

  const handleChange = (e) => {
    const { name, value } = e.target; // Az input-ban lévő name és value-ból olvassa ki

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="App">
      <h2>User name: {user.name}</h2>
      <h2>User age: {user.age}</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            onChange={handleChange}
            value={user.name}
            name="name"
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            onChange={handleChange}
            value={user.age}
            name="age"
          />
        </label>
      </form>
    </div>
  );
}
```

## Passing data from child to parent

The parent sends a function to child to get the data

1. Create a function in the parent to get the data

2. Send the function to child

3. Force the child to give the data into the function

4. The function gives back the data to the parent

In react we cannot pass data between two children components directly, but we can do it as passing the data to their parent component and from there we can get the data to the child component.

## Styling

Dynamically adding style (with adding classes) to component:

If the `isValid` state is not true, it adds the `invalid` class after the `form-control` class.

```js
...
<div className={`form-control ${!isValid ? "invalid" : ""}`}>
...
```

### Styled Components

Installation:

`npm install --save styled-components`

We can pass prop into the styled components. If it passed, it can be used inside the styled component's ``-s.

```js
...
background: ${props => props.invalid ? "rgba(250, 128, 114, 0.829)" : "transparent"};
...
```

Media-queries can be added to styled components too, just add it to the "main" style and pass the properties you'd like to change.

```js
const Button = styled.button`
  width: 100%;
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #8b005d;
  color: white;
  background: #8b005d;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
  cursor: pointer;

  @media (min-width: 768px) {
    width: auto;
  }
`
```

### CSS modules

React projects have to be configured to css modules. The npm's `create-react-app` project is configured to css modules by default.

The filename have to contains the `module` keyword. => `Button.module.css`

In the component, import named the `module.css` file (the name is totally up to you). => `import styles from "./Button.module.css"`

Then the css classes have to be added with the following syntax: (the class name, as it defined in the css file)

```js
import styles from "./Button.module.css"
...
<div className={styles.button} >
    ...
</div>    
```

If the class name not just a single word, but contains `-` or sg else, use the `styles["class-name"]` syntax to get the class.

We can also use dynamical rendering with css modules too.

```js
<div className={`${styles["form-control"]} ${!isValid ? styles.invalid : null}`}> ...
```

Media queries works as like as in common css files.

#### SCSS Modules

Have to install sass to the project with `npm i sass`. The file names should be `*.module.scss`. After that, everything works like as in the CSS modules, but with the SASS/SCSS syntax. We don't have to start the *Watch Sass*!

### Accept incoming css classes from another component

If we'd like to apply a class to a component, which is comes from another component (e.g. a Card component is wrapped around a div, and we'd like to add the div's css classes to the Card, but the Card has it's own classes already) we have to add the component className a template literal. First, we add the class it has already, and then the secondary class, which is given by props (object destructuring).

```js
// Outer component
<Card outerClass={style.classStyle}></Card>

// Card component
const Card = ({outerClass}) => {
  ...
  <div className={`${style.card} ${outerClass}`}>{children}</div>
  ...
}

```

## React portals

For the portal we'd need a place, where we'd like to port the component and we have to let the component know where should have to be rendered.
The place is have to be in the `index.html` file (in the `Public` folder). Let's create `div`s next to the `root` id's div. The id's should contains the `root` word.

```html
...
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="backdrop-root"></div>
  <div id="modal-root"></div>
  <div id="root"></div>
</body>
```

In the component's file (separate the modal to backdrop and the actual modal) we have to import the `ReactDOM` (we can add different name) from `react-dom`.
With this `ReactDOM` we can call the `createPortal()` method.

The `createPortal()` method takes 2 arguments.

1. The react node should be rendered (the component), pass it as JSX and get access to the props, to make it work
2. Pointer to the container in the real DOM (in the `index.html`) where the component should be rendered in, use the DOM API to get this element (`querySelector`, `getElementById`)

```js
...
return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCloseModal={onCloseModal} />,
        document.querySelector("#backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={title}
          message={message}
          onCloseModal={onCloseModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
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

## HOOKS

Rules of hooks:

- Only call React hooks in React Functions: React Component Functions, Custom Hooks
- Only call React hooks at the top level: don't call them in nested functions, and in any block elements
- In the `useEffect` hook always add everything you refer to inside of `useEffect()` as a dependency

### useRef Hooks

It takes a default value and returns a value we can work with.

The `useRef` returns an object, and we can get the ref value with `refName.current.value`. This value also can be stored tina variable.

Import `useRef` from `react`, then create a ref variable, which takes the `useRef()` method.

To connect the ref with the HTML, in the JSX (where we'd like to use the ref), create a `ref` attribute and pass the created variable to it.

```js
import {useRef} from "react";
...
const nameInputRef = useRef();
...

<input type="text" ref={nameInputRef}/>

```

### useEffect hook

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

Create a `store`/`context` folder inside `src` and add a file for you context (multiple context can be added). In that file we can manage all states and functions (also the useState and useEffects) which are used in the context API and we have to declare the initial states and functions (it just can be added as an empty function, but if it takes arguments, add them to it in here too!). To manage the whole context, we van create a component, where we add the `children` as props and have to pass the states and functions to the provider in an object as `value`.
To reach this state(s), import this file in the `index.js` (because from here every component can reach the context) and wrap around the `<App />` with the `<contextName.Provider>{...}</contextName.Provider>`. 

```js
// ---------------- In the external context file: ----------------------

import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const storedUserLogin = localStorage.getItem("isLoggedIn");

    if (storedUserLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    // localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return <AuthContext.Provider value={{
    isLoggedIn: isLoggedIn,
    onLogin: loginHandler,
    onLogout: logoutHandler
  }}>
    {props.children}
    </AuthContext.Provider>;
};

export default AuthContext;

```

```js
// --------------------- In index.js ------------------------ 
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);

```

To reach and use the context, import the context object (NOT THE PROVIDER) (Where the default states and functions added) and the `useContext` hook into the components, where we'd like to use them. Create a variable and pass the `useContext()` hook to it which gets the context as a parameter. Now, we van reach and use the context with the variable name pointing to the context object.

```js
const somethingCtx = useContext(sgContext);
```

Now, we can reach the context's state through this variable (`somethingCtx.sgState`).

#### Context limitations:

- If we have a `Button` component which onClick even trigger the specific function which is passed to it (e.g. it works as a login button in one component and a logout in another) we shouldn't use the context because the button will only handle that event. So in the actual Button component use the props, but context can be used when the function added to the button in a component where it used.

- React Context is not optimized for high frequency (0.1s, 1s) changes, but for static values and propagate updates through subscriptions (e.g. authentication, authorization)

- Shouldn't replace all props communications with props to context


### Context API használata

A `Context API` arra jó, hogy egy prop-ot "mélyebben" lévő gyermekkomponensek is megkaphassák, kikerülve a *props drillinget*.

1. Hozzunk létre egy `store` mappát, amiben a context-ek lesznek.

```js
import { createContext, useState } from 'react';

// Context létrehozása default értékkel
const ButtonContext = createContext('');

// Provider komponens létrehozása, ami lekezeli a state változást és a függvényeket a 'children'-nek
const ButtonProvider = ({ children }) => {
  const [buttonState, setButtonState] = useState('');

  const setButton = (newState) => {
    setButtonState(newState);
  }

  // A Provider becsomagolja a childrent, a value-ba pedig átadjuk a szükséges függvényt és az állapotot, amikt fel tudunk használni a különböző komponensekben
  return (
    <ButtonContext.Provider value={{ buttonState, setButton }}>
      {children}
    </ButtonContext.Provider>
  )
};

// Exportáljuk a Context-t és a Provider komponenst
export { ButtonContext, ButtonProvider };
```

2. Csomagoljuk be a szükséges komponenseket, amik szeretnénk, hogy hozzáférjenek a context-hez a Provider-el

- Ha csak egy Provider van, akkor az legyen a Wrapper a komponensek körül

```js
// app.js

function App() {
  return (
    <ButtonProvider>
      <Header />
      <Main />
    </ButtonProvider>
  )
}

```

- Ha több Provider van, akkor a *provider-hell* elkerüléséhez éremes létrehoznunk egy `ComponentProviderTree` komponenst a `store`-ban, ahova behúzzuk az összes Providert, majd ezt tesszük meg Wrapper-é a szükséges komponensek körül.

```js
// ComponentProviderTree.js

import { ButtonProvider } from './ButtonProvider';
import { CountProvider } from './CountProvider';

function ComponentProviderTree({ children }) {
  return (
    <ButtonProvider>
      <CountProvider>
        {children}
      </CountProvider>
    </ButtonProvider>
  )
}

// app.js

function App() {
  return (
    <ComponentProviderTree>
      <Header />
      <Main />
    </ComponentProviderTree>
  )
}

```

3. State beállítása a komponensben

```js
// Button.js

import { useContext } from "react";
import { ButtonContext } from "../store/selectedContext";
export default function Button(props) {
  const { children } = props;

  const {setButton} = useContext(ButtonContext);

  return (
    <button onClick={() => setButton('button-title')}>{children}</button>
  )
}
```

4. Beállított state "lekérése" a komponensben

```js
import { useContext } from "react";
import { ButtonContext } from "../store/selectedContext";

export default function Title() {
  const { buttonState } = useContext(ButtonContext);

  return (
    <>
      <h1>
          {buttonState}
      </h1>
    </>
  )
}
```

### React.memo() 

*React.memo* lets skip re-rendering a component when its props are unchanged. It tells React, to watch the component's props what it gets and compare the props values to their previous values and only if that props value changed let the component re-executed. But, if the props value not changed, it prevents the component from re-execution.

It can be a good tool if we have a huge component tree with a lot of child components and we can avoid unnecessary re-rendering at high level. If we choose a key part of a component tree, we can cut of a huge branch wit React.memo().

The `React.memo()` should takes the component as argument. We can wrap it at the `export default React.memo(someComponent)` or .. no, the other method is shit.

It has a performance cost when compares the new value to the previous value.

### useCallback()

The useCallback hook allows us to store a function across component executions. It allows as to tell react to save a function and this function not be re-created on every execution. We can use it if we know, that a function will never change.

It's first argument is the function we'd like to store and the second argument is the dependencies.

The second argument is an array which takes the dependencies as like `useEffect`, so anything we use in this function, which is coming from the surrounding component (state, props, context) should be specified here.

To use it, import it and wrap it around the function we'd like tou use for.

```js
const someFunction = useCallback(() => {...}, [dependencies])
```

Now the function is stored by the useCallback and when the component re-runs useCallback look for the stored function and re-use it.

### useMemo()

The `useMemo()` hook in React is used to memoize (cache) a calculation, and only recalculate it if the input changes. The input can be one or more values, and if any of them change, we recalculate the output.

One of the advantages of using the `useMemo()` hook is that you can reduce the amount of redundant calculations and improve the performance of your application. If a component is periodically re-rendered without the required input values having changed, using `useMemo()` can help avoid these unnecessary renders.

The downside is that if not used properly, you can keep objects in your application's memory that are no longer in use, which can cause memory leaks. However, this usually only happens if we use the hook incorrectly and memoize objects that are not needed.

`useMemo` takes a function as first argument, which returns what we'd like to store (e.g. a sorted array). The second argument is the dependencies (in an array) to tell, that only rebuild this function if the dependencies change.

For example, if a component has a very expensive computation that needs to be recomputed every render, using `useMemo()` can help reduce computation time and frequent re-renderings. The code below is an example of this:

```js
import {useMemo} from 'react';
import ExampleComponent from "./ExampleComponent";

function App() {
  return(
    <div className="app">
      <ExampleComponent data={useMemo(() => [2, 4, 6, 1, 8, 3]), []}/>
    </div>
  )
}

...
import { useMemo } from 'react';

function ExampleComponent({ data }) {
  const sortedData = useMemo(() => {
    // Costly calculation by processing the data
    return data.sort((a, b) => a - b);
  }, [data]);

  return (
    <div>
      <ul>
        {sortedData.map(data => (
            <li key={data}>{data}</li>
        ))}
      </ul>
    </div>
  );
}
```

In this example, the `useMemo()` hook memoizes the result of the `sortedData` function, and only recalculates if the data prop changes. This helps reduce computation time and unnecessary re-renderings.

Also, because every re-render a new array created (even it's items are the same) we have to add a `useMemo()` hook where the data is passed as props to the component. As dependencies add an empty array.

### Custom Hooks

#### Creating

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

#### Using

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



## React router

First, we need to install the React Router via `npm i react-router-dom`

A React Router könyvtárban a <BrowserRouter> és a createBrowserRouter két különböző módja a BrowserRouter komponens használatának.

<BrowserRouter>: Ez a komponens JSX-ben használható és deklaratív módon definiálja a BrowserRouter-t. A <BrowserRouter> komponens egy wrapper komponens, amely beágyazza az alkalmazásodat a böngésző címsorának kezelésére. Ez az egyik leggyakrabban használt módszer a React Routerben.

createBrowserRouter: Ez a függvényalapú megközelítés, amelyet programozottan használhatsz a BrowserRouter példányának létrehozásához. Ez lehetővé teszi a több példányosítást vagy testelést. A createBrowserRouter függvény visszaadja a BrowserRouter példányát, amelyet majd a komponenseidben használhatsz.

A lényegi különbség tehát abban rejlik, hogy <BrowserRouter> JSX-ben használatos és deklaratív módon definiálja a BrowserRouter-t, míg a createBrowserRouter függvényalapú megközelítés, amelyet programozottan használhatsz.

### Setup #1

Import `createBrowserRouter` from `react-router-dom`, and call it with the router settings:

- path: The url path of the page
- element: Which component to be rendered when the route (in the path) is active

Also import `RouterProvider` and return it with the component(we can add or wrap it with more JSX code). This provider has a `router` prop, which takes the router's settings.

```js
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routerSettings = createBrowserRouter([
  {path: "/", element: <Homepage />},
  {}
])

function App() {
    return <RouterProvider router={routerSettings}>
}

```

#### Setup #2

Alternative way to routes:

In the `index.js` file import `BrowserRouter`, and wrap it around the `App` component.

```js
import { BrowserRouter } from "react-router-dom";
....

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

In the `app.js` file we can set up the routes. Import `Routes` and `Route` from "react-router-dom". Wrap `Routes` around the `Route`(s). We can nest `Route` into each oder (to make subroutes), but `Routes` have to be around the `Route`s.

```js
import {Routes, Route} from "react-router-dom";
...

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}>
            <Route path="/products" element={<ProductPage />}>
        </Routes>
    )
}
```

### Navigating

#### Link

To navigate between pages, use the React Router's `Link`.
It has a `to=""` attribute where we can tell it where to navigate.

```js
import { Link } from "react-router-dom";
...

<>
    <p>Go back to <Link to="/">Homepage</Link></p>
</>
```

#### NavLink

The other way to navigate between pages is the `NavLink` component.
It's a better way, when we using a navigation bar, because we can set active style for the active links. It's `className` works like a normal className, but you can also pass it a function to customize the classNames applied based on the active and pending state of the link. The `isActive` and the `isPending` are coming from the `React Router Dom`.

```js
<NavLink
  to="/messages"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
>
  Messages
</NavLink>
```

##### end

The `end` prop changes the matching logic for the active and pending states to only match to the "end" of the NavLink's to path. If the URL is longer than to, it will no longer be considered active.

Without the end prop, this link is always active because every URL matches /.

```js
<NavLink to="/" end>
  Home
</NavLink>
```

Now this link will only be active at "/".

#### useNavigate

**It's usually better to use `redirect` in loaders and `actions` than this hook!**

The useNavigate hook returns a function that lets you navigate programmatically, for example in an effect:

```js
import { useNavigate } from "react-router-dom";

function useLogoutTimer() {
  const userIsInactive = useFakeInactiveUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userIsInactive) {
      fake.logout();
      navigate("/session-timed-out");
    }
  }, [userIsInactive]);
}
```

The navigate function has two signatures:

Either pass a `To` value (same type as `<Link to>`) with an optional second `{ replace, state }` arg or
Pass the delta you want to go in the history stack. For example, `navigate(-1)` is equivalent to hitting the back button.
If using `replace: true`, the navigation will replace the current entry in the history stack instead of adding a new one.

### Layout

If we'd like to have a layout which wraps around all the components, we have to make some modification for the router.

In the file, where our router was created, create another route in the `createBrowserRouter`. This route has the default, homepages ("/") path, the element is the created `Layout` element, and has a `children˛` property, which takes an array where we put all the router we'd like to wrapped around the layout. It tells the router, that the layout is the "parent" of this routes.

```js
...
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <ProductsPage /> },
    ],
  },
]);
```

In the layout's component render the `Outlet` from `"react-router-dom"`. Put this `Outlet` into the layout's return section, because this `Outlet` marks where the layout's children routes(components) should be rendered. (Which set up at the app.js).
If we have a component for navigation (and we'd like to show it on every page), put it ABOVE the `Outlet` and now it is rendered on every page wrapped around the layout.

```js
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <h1>Root Layout</h1>
        <MainNav />
        <Outlet />
    )
}
```

### load property

[More on the documentation](https://reactrouter.com/en/main/route/loader)

Each route can define a "loader" function to provide data to the route element before it renders. **Important!** This feature only works if using a data router! As the user navigates around the app, the loaders for the next matching branch of routes will be called in parallel and their data made available to components through `useLoaderData`.

The `loader`for a page will be called when we start navigating to that page, not after the page component has been rendered, but before actually go there.

#### useLoaderData

[Documentation](https://reactrouter.com/en/main/hooks/use-loader-data)

The `useLoaderData` is cannot be used in a higher level where we fetching the data. This means, that we can only use `useLoaderData` in the element that's assigned to a route and in all components that might be used inside that element.

This hook provides the value returned from your route loader.
After route actions are called, the data will be revalidated automatically and return the latest result from your loader.

Note that `useLoaderData` does not initiate a fetch. It simply reads the result of a fetch React Router manages internally, so you don't need to worry about it refetching when it re-renders for reasons outside of routing.

This also means data returned is stable between renders, so you can safely pass it to dependency arrays in React hooks like useEffect. It only changes when the loader is called again after actions or certain navigations. In these cases the identity will change (even if the values don't).

You can use this hook in any component or any custom hook, not just the Route element. It will return the data from the nearest route on context.

To get data from any active route on the page, see `useRouteLoaderData`.

A ReactRouter `Loader` és `useLoaderData` komponensei segítségével adatokat tölthetünk be a komponenseinkbe a React Router használata során. A `Loader` komponens segítségével aszinkron adatokat tölthetünk be a komponensünkbe, és amíg a `Loader` komponens betölti az adatokat, addig egy másik komponenst jeleníthetünk meg. A `useLoaderData` hook segítségével pedig a betöltött adatokat adhatjuk át a komponensünknek, és ezzel dinamikusabbá tehetjük a komponenseinket.

Az adatbetöltés aszinkron jellege miatt a `Loader` és `useLoaderData` komponensek használata lehetővé teszi, hogy a felhasználói felület ne fagyjon le az adatok betöltése közben. Emellett a `Loader` komponens segítségével egy átmeneti állapotot is megjeleníthetünk, amíg az adatok betöltődnek, ami jobb felhasználói élményt nyújt.

Összességében a ReactRouter `Loader` és `useLoaderData` komponensei nagyon hasznosak lehetnek, ha dinamikusabbá szeretnénk tenni a React Router alkalmazásunkat, és ha az adatbetöltési folyamatot jobb felhasználói élménnyel szeretnénk kiegészíteni.