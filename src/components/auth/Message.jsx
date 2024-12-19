export default function Message({ message, type, shake }) {
  if (!message) return null;

  const messageClass = type === "error" ? "text-red-500" : "text-green-500";

  return (
    <h1
      className={`${messageClass} mt-5 absolute bottom-12 ${
        shake ? "shake" : ""
      }`}
    >
      {message}
    </h1>
  );
}
