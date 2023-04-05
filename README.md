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

## HOOKS

Rules of hooks:

- Only call React hooks in React Functions: React Component Functions, Custom Hooks
- Only call React hooks at the top level: don't call them in nested functions, and in any block elements

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