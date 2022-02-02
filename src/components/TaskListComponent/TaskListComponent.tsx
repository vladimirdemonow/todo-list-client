import styles from "./TaskListComponent.module.scss";
import TaskComponent from "./TaskComponent/TaskComponent";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectTaskList,
  selectPage,
  ITask,
  setCurrentElementCount,
  setPagePoint,
} from "../../features/counter/counterSlice";

import {
  TFilter,
  TSort,
  selectFilter,
  selectSort,
} from "../../features/order/orderSlice";

import { useEffect } from "react";

export default (): JSX.Element => {
  let tasks = useAppSelector(selectTaskList);
  const dispatch = useAppDispatch();

  tasks = filterTasks(tasks, useAppSelector(selectFilter));
  tasks = sortTasks([...tasks], useAppSelector(selectSort));
  const currentLength = tasks.length;

  let pageSelector = useAppSelector(selectPage);
  const pageCount = Math.ceil(currentLength / 5);
  tasks = pageTasks(tasks, pageSelector);
  console.log({ pageCount, pageSelector });

  useEffect(() => {
    dispatch(setCurrentElementCount(currentLength));
  }, [currentLength]);

  useEffect(() => {
    if (pageCount < pageSelector && pageCount > 1) {
      dispatch(setPagePoint(pageCount));
    }
  }, [pageCount]);

  return (
    <div className={styles.task_list}>
      {tasks.map((element) => (
        <TaskComponent
          key={element.id}
          text={element.text}
          date={element.date}
          id={element.id}
          isCompleted={element.isCompleted}
        />
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

// Set tasks on current page
function pageTasks(tasks: Array<ITask>, page: number): Array<ITask> {
  const minPointPage = page * 5 - 5;
  const maxPointPage = page * 5 - 1;

  return tasks.filter((element, index) => {
    return index >= minPointPage && index <= maxPointPage;
  });
}
