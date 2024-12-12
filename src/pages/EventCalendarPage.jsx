import Nav from "../layout/Nav";
import EventCalendar from "../components/planner/EventCalendar";
import { EventCalendarProvider } from "../context/EventCalendarContext";

export default function EventCalendarPage() {
  return (
    <>
      <Nav />
      <EventCalendarProvider>
        <EventCalendar />
      </EventCalendarProvider>
    </>
  );
}
