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

### Setup #2

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

## Navigating

To navigate between pages, use the React Router's `Link`.
It has a `to=""` attribute where we can tell it where to navigate.

```js
import { Link } from "react-router-dom";
...

<>
    <p>Go back to <Link to="/">Homepage</Link></p>
</>
```

## Layout

If we'd like to have a layout which wraps around all the components, we have to make some modification for the router.

In the file, where our router was created, create another route in the `createBrowserRouter`. This route has the default, homepages ("/") path, the element is the created `Layout` element, and has a `children˛` property, which takes an array where we put all the router we'd like to wrapped around the layout. It tells the router, that the layout is the "parent" of this routes.

```js
...
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <ProductsPage /> },
    ],
  },
]);
```

In the layout's component render the `Outlet` from `"react-router-dom"`. Put this `Outlet` into the layout's return section, because this `Outlet` marks where the layout's children routes(components) should be rendered. (Which set up at the app.js).
If we have a component for navigation (and we'd like to show it on every page), put it ABOVE the `Outlet` and now it is rendered on every page wrapped around the layout.

```js
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <h1>Root Layout</h1>
        <MainNav />
        <Outlet />
    )
}
```