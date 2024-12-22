import Login from "../components/auth/Login";
import { SiSimpleanalytics } from "react-icons/si";
import { IoHeartCircleSharp } from "react-icons/io5";
import { FaHandshakeSimple } from "react-icons/fa6";
import { FaStar, FaGithub } from "react-icons/fa";
import profileIcon from "../assets/profileicon.png";

export default function OnboardingPage({ setIsLoggedIn }) {
  return (
    <>
      <div className="onboarding-page">
        <img
          src={profileIcon}
          alt="Website Logo"
          className="onboarding-logo "
        />
        <div className="intro">
          <div className="versiongithub">
            <h1 className="version"> VERSION 1.0 </h1>
            <a href="https://github.com/Prostecki/Sortify" target="_blank">
              <FaGithub
                size={30}
                className="drop-shadow-md mb-2"
                color="white"
              />
            </a>
          </div>
          <h1 className="intro-title">
            <span>
              <span>Your</span> tasks,
            </span>
            <span>
              <span className="faded">your</span> habits,
            </span>
            <span>
              <span className="faded">your</span> growth.
            </span>
          </h1>
          <h1 className="intro-description">
            Sortify helps you manage tasks, build habits, and organize
            events—all in one place. Set goals, track progress, and never miss a
            deadline!
          </h1>
          <hr className="mt-5 drop-shadow-md" />
          <h1 className="whychooseus">
            <span className="span-flex">
              <IoHeartCircleSharp
                size={20}
                color="lime"
                className="drop-shadow-md	"
              />
              Loved by 102 926 users
              <span className="stars">
                <FaStar size={13} color="gold" />
                <FaStar size={13} color="gold" />{" "}
                <FaStar size={13} color="gold" />{" "}
                <FaStar size={13} color="gold" />{" "}
                <FaStar size={13} color="gold" />
              </span>
            </span>
            <span className="span-flex">
              <FaHandshakeSimple
                size={20}
                color="lime"
                className="drop-shadow-md	"
              />
              Designed to make your productivity journey effortless.
            </span>
            <span className="span-flex">
              <SiSimpleanalytics
                size={20}
                color="lime"
                className="drop-shadow-md"
              />
              Grow, achieve, and thrive.
            </span>
          </h1>
        </div>
        <div className="login-bg">
          <Login setIsLoggedIn={setIsLoggedIn} />
        </div>
      </div>
    </>
  );
}
