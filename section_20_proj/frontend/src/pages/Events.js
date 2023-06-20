import { useLoaderData } from 'react-router-dom';
import React, { memo, lazy } from 'react';

const EventsList = lazy(() => import('../components/EventsList'));

const MemoizedEventsList = memo(EventsList);

/**
 * Renders an EventsPage component that displays a list of events from the data.
 *
 * @return {JSX.Element} A React functional component that displays a list of events.
 */
function EventsPage() {
  const data = useLoaderData();
  const events = data.events;

  return (
    <>
      <MemoizedEventsList events={events} />
    </>
  );
}


export default EventsPage;

/**
 * Asynchronously loads events from a URL and returns the response if it is OK.
 *
 * @return {Promise<Response>} The response if it is OK.
 */
export async function loader() {
    const eventsURL = "http://localhost:8080/events";
    const response = await fetch(eventsURL);

    if (!response.ok) {
        // ...
    } else {
      return response;
    }
}
