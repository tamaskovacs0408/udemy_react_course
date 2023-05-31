import { Link } from "react-router-dom";

const DUMMY_EVENTS = [
  {
    id: "e1",
    title: "Event One",
  },
  {
    id: "e2",
    title: "Event Two",
  },
  {
    id: "e3",
    title: "Event Three",
  },
  {
    id: "e4",
    title: "Event Four",
  },
];

const EventsPage = () => {
  return (
    <>
      <h1>Events Page</h1>
      <ul>
        {DUMMY_EVENTS.map((event) => (
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default EventsPage;
