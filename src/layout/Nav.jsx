import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <>
      <nav className="flex text-[40px] gap-[20px] justify-center">
        <Link to="/">Home</Link>
        <Link to="/login">Log in</Link>
        <Link to="/register">Register</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </>
  );
}
