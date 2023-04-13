## React.memo() 

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