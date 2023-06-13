import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const events = useLoaderData();

  return (
    <>
      {<EventsList events={events} />}
    </>
  );
}

export default EventsPage;

export async function loader() {
    const eventsURL = "http://localhost:8080/events";
    const response = await fetch(eventsURL);

    if (response.ok) {
        const eventData = await response.json();
        return eventData.events;
    }
}
