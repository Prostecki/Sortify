export default function TodoList({ tasks }) {
  return (
    <div className="all-tasks-container">
      {tasks.map((task) => (
        <div className="each-task-container">
          <h1>{task.title}</h1>
          <h1>{task.description}</h1>
          <h1>{task.deadline}</h1>
          <h1>{task.estimation} min </h1>
          <h1>{task.category}</h1>
        </div>
      ))}
    </div>
  );
}
