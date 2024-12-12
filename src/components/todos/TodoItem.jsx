export default function TodoItem({ task }) {
  return (
    <div className="task-item">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
    </div>
  );
}
