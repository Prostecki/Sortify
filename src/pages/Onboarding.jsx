import Nav from "../layout/Nav";
import Login from "../components/Form/Login";

export default function Onboarding() {
  return (
    <div className="flex flex-col items-center justify-evenly h-screen">
      <section>
        <h1 className="text-[4rem] text-center"> Instruktioner: </h1>
        <h1 className="text-[2rem] text-center">
          Skapa en Login/Register container
        </h1>
        <h1 className="text-[2rem] text-center">
          När användaren trycker på Sign up ska en modul dyka upp på logga in
          containern.
        </h1>
        <h1 className="text-[2rem] text-center">
          Centrera gärna allt ( ingen fokus på design )
        </h1>
        <h1 className="text-[2rem] text-center">
          När användaren loggar in. Ska denne hänvisas till sidan "Dashboard"
        </h1>
      </section>
      <Login />
    </div>
  );
}
