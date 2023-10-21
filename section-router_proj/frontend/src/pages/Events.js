import { useLoaderData, json } from "react-router-dom";
import React, { memo, lazy } from "react";

const EventsList = lazy(() => import("../components/EventsList"));

const MemoizedEventsList = memo(EventsList);

/**
 * Renders an EventsPage component that displays a list of events from the data.
 *
 * @return {JSX.Element} A React functional component that displays a list of events.
 */
function EventsPage() {
  const data = useLoaderData();

  // if (data.isError) {
  //   return <div>Error: {data.message}</div>;}

  const events = data.events;

  return (
    <>
      <MemoizedEventsList events={events} />
    </>
  );
}

export default EventsPage;

/**
 * Fetches events from a given URL.
 * @returns {Promise<Response>} A promise that resolves to the response object.
 * @throws {Response} If the fetch was unsuccessful.
 */
export async function loader() {
  const eventsURL = "http://localhost:8080/events";
  const response = await fetch(eventsURL);

  if (!response.ok) {
    // return {isError: true, message: 'Couldn\'t fetch events.'};
    // throw new Response(JSON.stringify({ message: "Couldn't fetch events." }), {status: 500});
    // With the json() method, we can parse the response body as JSON and don't have to use the JSON.stringify() method (and the JSON.parse() method in the Error.js)
    return json({ message: "Couldn't fetch events." }, { status: 500 });
  } else {
    return response;
  }
}
