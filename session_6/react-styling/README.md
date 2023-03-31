# React styling

Dynamically adding style (with adding classes) to component:

If the `isValid` state is not true, it adds the `invalid` class after the `form-control` class.

```js
...
<div className={`form-control ${!isValid ? "invalid" : ""}`}>
...
```

## Styled Components

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

## CSS modules

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