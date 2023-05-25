# Routing

First, we need to install the React Router via `npm i react-router-dom`

## Setup #1

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

## Setup #2

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