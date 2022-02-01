import TaskListComponent from "./components/TaskListComponent/TaskListComponent";
import FilterComponent from "./components/FilterComponent/FilterComponent";
import SortComponent from "./components/SortComponent/SortComponent";
import PagesComponent from "./components/PagesComponent/PagesComponent";
import styles from "./styles/styles";
import inputsStyle from "./styles/style-inputs.module.scss";

function createTask(text: String, date: String): Task {
  return { text, date };
}

interface Task {
  text: String;
  date: String;
}

const taskList: Array<Task> = [];

taskList.push(createTask("Try harder", "31.01.22"));
taskList.push(createTask("Try harder", "31.01.22"));
taskList.push(createTask("Try harder", "31.01.22"));

function App() {
  return (
    <div className="main_container" style={styles.main_container}>
      <h1 className="logo" style={styles.logo}>
        ToDo
      </h1>
      <div className={inputsStyle.form__group} style={styles.input_task}>
        <input
          type="input"
          className={inputsStyle.form__field}
          placeholder="Name"
          name="name"
          id="name"
        />
      </div>
      <div className="buttons" style={styles.buttons}>
        <FilterComponent></FilterComponent>
        <div>
          <SortComponent></SortComponent>
        </div>
      </div>
      <TaskListComponent list={taskList}></TaskListComponent>
      <PagesComponent count={taskList.length}></PagesComponent>
    </div>
  );
}

export default App;
