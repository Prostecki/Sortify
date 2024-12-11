import Nav from "../layout/Nav";
import EventCalendar from "../components/EventCalendar/EventCalendar";
import { EventCalendarProvider } from "../context/eventCalendarContext";

export default function Planner() {
  return (
    <>
      <Nav />
      <EventCalendarProvider>
        <EventCalendar />
      </EventCalendarProvider>
    </>
  );
}
