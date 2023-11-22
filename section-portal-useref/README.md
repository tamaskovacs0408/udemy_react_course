# Practice project

## Accept incoming classes from another component

If we'd like to apply a class to a component, which is comes from another component (e.g. a Card component is wrapped around a div, and we'd like to add the div's css classes to the Card, but the Card has it's own classes already) we have to add the component className a template literal. First, we add the class it has already, and then the secondary class, which is given by props (object destructuring).

```js
// Outer component
<Card outerClass={style.clasStyle}></Card>

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


## useRef Hooks

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