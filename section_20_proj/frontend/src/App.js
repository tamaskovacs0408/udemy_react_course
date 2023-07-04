// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventDetailPage, {
  loader as eventDetailLoader,
} from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import Root from "./pages/Root";
import EventsRoot from "./pages/EventsRoot";
import Error from "./pages/Error";

// Create a router using the createBrowserRouter function
const router = createBrowserRouter([
  {
    // Set the path to "/" and render the <Root /> component
    path: "/",
    element: <Root />,
    // Render the <Error /> component in case of an error
    errorElement: <Error />,
    children: [
      // Render the <HomePage /> component for the root path ("/")
      { index: true, element: <HomePage /> },
      {
        // Set the path to "events" and render the <EventsRoot /> component
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            // Set the path to an empty string and render the <EventsPage /> component
            path: "",
            element: <EventsPage />,
            // Use the eventsLoader function to load events
            loader: eventsLoader,
          },
          {
            // Set the path to ":eventId" and use the eventDetailLoader function to load event details
            path: ":eventId",
            loader: eventDetailLoader,
            children: [
              {
                // Set the path to an empty string and render the <EventDetailPage /> component
                path: "",
                element: <EventDetailPage />,
              },
              // Render the <NewEventPage /> component for the path "new" under the eventId path
              { path: "new", element: <NewEventPage /> },
            ],
          },
          // Render the <EditEventPage /> component for the path ":eventId/edit" under the events path
          { path: ":eventId/edit", element: <EditEventPage /> },
        ],
      },
    ],
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
