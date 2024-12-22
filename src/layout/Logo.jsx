import websiteLogo from "../assets/logotransparent.png";

export default function Logo() {
  return (
    <div className="logo-container">
      <img src={websiteLogo} alt="Website Logo" className="logo" />
      <h1 className="sortify"> Sortify </h1>
    </div>
  );
}
