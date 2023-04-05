## useEffect hook

`import { useEffect } from "react"`

With the useEffect hook we can handling side effects of a React app. Always add everything you refer to inside of useEffect as a dependency!

It takes 2 arguments: `useEffect(()=> {}, [dependencies])`

 1. A function that should be executed after every component evaluation if the specified dependencies changed (the side effect codes go here)
 2. The dependencies of this effect -  the previous function only runs if THIS changes

 In the dependencies we have to add all dependencies which are in the useEffect function.

 **The dependencies tell to the React app, that after every specified component (where the `useEffect` is used) execution rerun the function inside the `useEffect` hook, if one of the dependencies is changed. (Don't put the `useState`'s setState function into the dependencies) If neither of them is changed, the function won't run.**


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