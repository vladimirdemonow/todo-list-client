import TaskListComponent from "./components/TaskListComponent/TaskListComponent";
import FilterComponent from "./components/FilterComponent/FilterComponent";
import SortComponent from "./components/SortComponent/SortComponent";
import PagesComponent from "./components/PagesComponent/PagesComponent";
import styles from "./styles/styles";

function createTask(text: String, date: String): Task {
  return { text, date };
}

interface Task {
  text: String;
  date: String;
}

const taskList: Array<Task> = [];
const pagesList: Array<Number> = [1, 2, 3];

taskList.push(createTask("Try harder", "31.01.22"));
taskList.push(createTask("Try harder", "31.01.22"));
taskList.push(createTask("Try harder", "31.01.22"));

function App() {
  return (
    <div className="main_container" style={styles.main_container}>
      <div className="logo" style={styles.logo}>
        ToDo
      </div>
      <input className="input_task" style={styles.input_task}></input>
      <div className="buttons" style={styles.buttons}>
        <FilterComponent></FilterComponent>
        <SortComponent></SortComponent>
      </div>
      <TaskListComponent list={taskList}></TaskListComponent>
      <PagesComponent count={taskList.length}></PagesComponent>
    </div>
  );
}

export default App;
