import "./App.css";
import TaskElement from "./elements/Task-element";

interface Task {
  id: String;
  text: String;
  date: String;
}

function createTask(id: String, text: String, date: String): Task {
  return { id, text, date };
}

const taskList: Array<Task> = [];
const pagesList: Array<Number> = [];

function App() {
  return (
    <div className="main_container">
      <div className="logo">ToDo</div>
      <input className="input_task"></input>
      <div className="buttons">
        <div className="filter">
          <button className="all">All</button>
          <button className="done">Done</button>
          <button className="undone">Undone</button>
        </div>
        <div className="sort">
          <button>A</button>
          <button>V</button>
        </div>
      </div>
      <div className="tasks">
        {taskList.map((element) => (
          <div> {element} </div>
        ))}
      </div>
      <div className="pages">
        {pagesList.map((element) => (
          <button>{element}</button>
        ))}
      </div>
    </div>
  );
}

export default App;
