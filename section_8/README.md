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