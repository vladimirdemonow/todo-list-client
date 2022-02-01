import InputTaskComponent from "./components/InputTaskComponent/InputTaskComponent";
import TaskListComponent from "./components/TaskListComponent/TaskListComponent";
import FilterComponent from "./components/FilterComponent/FilterComponent";
import SortComponent from "./components/SortComponent/SortComponent";
import PagesComponent from "./components/PagesComponent/PagesComponent";
import styles from "./styles/styles";

function App() {
  return (
    <div className="main_container" style={styles.main_container}>
      <h1 className="logo" style={styles.logo}>
        ToDo
      </h1>
      <InputTaskComponent></InputTaskComponent>
      <div className="buttons" style={styles.buttons}>
        <FilterComponent></FilterComponent>
        <>
          <SortComponent></SortComponent>
        </>
      </div>
      <TaskListComponent></TaskListComponent>
      <PagesComponent></PagesComponent>
    </div>
  );
}

export default App;
