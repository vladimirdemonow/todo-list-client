import TaskElement from "./components/TaskElement/TaskElement";
import Filter from "./components/Filter/Filter";
import styles from "./styles/styles";

interface Task {
  id: String;
  key: React.Key;
  text: String;
  date: String;
}

function createTask(
  id: String,
  key: React.Key,
  text: String,
  date: String
): Task {
  return { id, key, text, date };
}

const taskList: Array<Task> = [];
const pagesList: Array<Number> = [1, 2, 3];

taskList.push(createTask("111", "h112", "Try harder", "31.01.22"));
taskList.push(createTask("123", "a113", "Try harder", "31.01.22"));
taskList.push(createTask("143", "s114", "Try harder", "31.01.22"));

function App() {
  return (
    <div className="main_container" style={styles.main_container}>
      <div className="logo" style={styles.logo}>
        ToDo
      </div>
      <input className="input_task" style={styles.input_task}></input>
      <div className="buttons" style={styles.buttons}>
        <Filter></Filter>
        <div className="sort" style={styles.sort}>
          <button>A</button>
          <button>V</button>
        </div>
      </div>
      <div className="tasks" style={styles.tasks}>
        {taskList.map((element) => (
          <TaskElement
            id={element.id}
            key={element.key.toString()}
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
