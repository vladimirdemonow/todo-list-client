import styles from "./TaskListComponent.module.scss";
import TaskComponent from "./TaskComponent/TaskComponent";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectTaskList,
  selectFilter,
  selectSort,
  ITask,
  TFilter,
  TSort,
  setCurrentElementCount,
} from "../../features/counter/counterSlice";
import { useEffect } from "react";

export default (): JSX.Element => {
  let tasks = useAppSelector(selectTaskList);
  const dispatch = useAppDispatch();

  tasks = filterTasks(tasks, useAppSelector(selectFilter));
  tasks = sortTasks([...tasks], useAppSelector(selectSort));

  useEffect(() => {
    dispatch(setCurrentElementCount(tasks.length));
  }, [tasks.length]);

  return (
    <div className={styles.task_list}>
      {tasks?.map((element, index) => (
        <TaskComponent
          key={element.id}
          text={element.text}
          date={element.date}
          id={element.id}
          isCompleted={element.isCompleted}
        ></TaskComponent>
      ))}
    </div>
  );
};

// Filter tasks
function filterTasks(tasks: Array<ITask>, filterSelector: TFilter) {
  if (filterSelector === "all") {
    return tasks;
  }

  if (filterSelector === "done") {
    return tasks.filter((element) => element.isCompleted);
  }

  if (filterSelector === "undone") {
    return tasks.filter((element) => !element.isCompleted);
  }

  return tasks;
}

// Sort tasks
function sortTasks(tasks: Array<ITask>, sortSelector: TSort) {
  if (sortSelector === "down") {
    return tasks.sort((a, b) => a.timeStamp - b.timeStamp);
  }

  if (sortSelector === "up") {
    return tasks.sort((a, b) => b.timeStamp - a.timeStamp);
  }

  if (sortSelector === "default") {
    return tasks;
  }

  return tasks;
}
