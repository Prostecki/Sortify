import EventCalendar from "../components/EventCalendar/EventCalendar";
import Nav from "../layout/Nav";

export default function Dashboard({ setIsLoggedIn }) {
  return (
    <>
      <Nav setIsLoggedIn={setIsLoggedIn} />
      <h1 className="text-center text-[3rem]"> Dashboard/Home </h1>
      <h1 className="text-center text-[2rem]">
        User sees this page upon authentication (Logged in)
      </h1>
      <h1 className="text-center text-[3rem]"> Greet user. Hi (User) </h1>
      <h1 className="text-center text-[3rem]">
        Random Quote via API everytime user enters the Dashboard
      </h1>
      <h1 className="text-center text-[3rem]">
        Overview showing user activity. Minimalistic.
      </h1>
      <EventCalendar />
    </>
  );
}
