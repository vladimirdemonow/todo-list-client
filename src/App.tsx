import InputTaskComponent from "./components/InputTaskComponent/InputTaskComponent";
import TaskListComponent from "./components/TaskListComponent/TaskListComponent";
import FilterComponent from "./components/FilterComponent/FilterComponent";
import SortComponent from "./components/SortComponent/SortComponent";
import PagesComponent from "./components/PagesComponent/PagesComponent";
import styles from "./styles/App.module.scss";

function App() {
  console.log(styles);

  return (
    <div className={styles.main_container}>
      <h1>ToDo</h1>
      <InputTaskComponent />
      <div className={styles.buttons}>
        <FilterComponent />
        <>
          <SortComponent />
        </>
      </div>
      <TaskListComponent />
      <PagesComponent />
    </div>
  );
}

export default App;
