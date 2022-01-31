import "./App.css";
import TaskElement from "./elements/Task-element";
import styles from "./styles/styles";

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
  taskList.push(createTask("111", "Try harder", "31.01.22"));
  taskList.push(createTask("123", "Try harder", "31.01.22"));
  taskList.push(createTask("143", "Try harder", "31.01.22"));
  return (
    <div className="main_container" style={styles.main_container}>
      <div className="logo" style={styles.logo}>
        ToDo
      </div>
      <input className="input_task" style={styles.input_task}></input>
      <div className="buttons" style={styles.buttons}>
        <div className="filter" style={styles.filter}>
          <button className="all">All</button>
          <button className="done">Done</button>
          <button className="undone">Undone</button>
        </div>
        <div className="sort" style={styles.sort}>
          <button>A</button>
          <button>V</button>
        </div>
      </div>
      <div className="tasks" style={styles.tasks}>
        {taskList.map((element) => (
          <TaskElement
            id={element.id}
            text={element.text}
            date={element.date}
          ></TaskElement>
        ))}
      </div>
      <div className="pages" style={styles.pages}>
        {pagesList.map((element) => (
          <button>{element}</button>
        ))}
      </div>
    </div>
  );
}

export default App;
