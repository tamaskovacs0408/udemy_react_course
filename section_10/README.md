## useEffect hook

`import { useEffect } from "react"`

With the useEffect hook we can handling side effects of a React app. 

It takes 2 arguments: `useEffect(()=> {}, [dependencies])`

 1. A function that should be executed after every component evaluation if the specified dependencies changed (the side effect codes go here)
 2. The dependencies of this effect -  the previous function only runs if THIS changes