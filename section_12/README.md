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

### useMemo()

The `useMemo()` hook in React is used to memoize (cache) a calculation, and only recalculate it if the input changes. The input can be one or more values, and if any of them change, we recalculate the output.

One of the advantages of using the `useMemo()` hook is that you can reduce the amount of redundant calculations and improve the performance of your application. If a component is periodically re-rendered without the required input values having changed, using `useMemo()` can help avoid these unnecessary renders.

The downside is that if not used properly, you can keep objects in your application's memory that are no longer in use, which can cause memory leaks. However, this usually only happens if we use the hook incorrectly and memoize objects that are not needed.

`useMemo` takes a function as first argument, which returns what we'd like to store (e.g. a sorted array). The second argument is the dependencies (in an array) to tell, that only rebuild this function if the dependencies change.

For example, if a component has a very expensive computation that needs to be recomputed every render, using `useMemo()` can help reduce computation time and frequent re-renderings. The code below is an example of this:

```js
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