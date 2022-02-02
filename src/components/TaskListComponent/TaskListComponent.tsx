import styles from "./TaskListComponent.module.scss";
import TaskComponent from "./TaskComponent/TaskComponent";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectTaskList,
  selectFilter,
  selectSort,
  selectPage,
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
  const currentLength = tasks.length;

  tasks = pageTasks(tasks, useAppSelector(selectPage));

  useEffect(() => {
    dispatch(setCurrentElementCount(currentLength));
  }, [currentLength]);

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
function filterTasks(
  tasks: Array<ITask>,
  filterSelector: TFilter
): Array<ITask> {
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
function sortTasks(tasks: Array<ITask>, sortSelector: TSort): Array<ITask> {
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

function pageTasks(tasks: Array<ITask>, page: number): Array<ITask> {
  const minPointPage = page * 5 - 5;
  const maxPointPage = page * 5 - 1;

  return tasks.filter((element, index) => {
    return index >= minPointPage && index <= maxPointPage;
  });
}
