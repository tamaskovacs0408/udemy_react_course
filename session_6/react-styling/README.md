# React styling

Dynamically adding style (with adding classes) to component:

If the `isValid` state is not true, it adds the `invalid` class after the `form-control` class.

```js
...
<div className={`form-control ${!isValid ? "invalid" : ""}`}>
...
```

## Styled Components

Intallation:

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
