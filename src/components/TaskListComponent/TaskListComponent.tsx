import styles from "./TaskListComponent.module.scss";
import TaskComponent from "./TaskComponent/TaskComponent";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectTaskList, ITask } from "../../features/taskList/taskListSlice";

import {
  setPagePoint,
  selectPagePoint,
  selectPageCount,
  setPageCount,
} from "../../features/page/pageSlice";

import {
  TFilter,
  TSort,
  selectFilter,
  selectSort,
} from "../../features/order/orderSlice";

import { useEffect, useState } from "react";

export default (): JSX.Element => {
  const taskListSelector = useAppSelector(selectTaskList);
  const filterSelector = useAppSelector(selectFilter);
  const sortSelector = useAppSelector(selectSort);
  const pagePointSelector = useAppSelector(selectPagePoint);
  const pageCountSelector = useAppSelector(selectPageCount);
  const [tasks, setTasks] = useState(taskListSelector);
  const [viewPage, setViewPage] = useState(taskListSelector);
  const dispatch = useAppDispatch();

  const pageCount = Math.ceil(tasks.length / 5);

  useEffect(() => {
    let filteredTasks = filterTasks(taskListSelector, filterSelector);
    setTasks(filteredTasks);

    let pagedTasks = pageTasks(filteredTasks, pagePointSelector);

    setViewPage(pagedTasks);
  }, [filterSelector]);

  useEffect(() => {
    let sortedTasks = sortTasks([...tasks], sortSelector);

    setTasks(sortedTasks);

    let pagedTasks = pageTasks(sortedTasks, pagePointSelector);

    setViewPage(pagedTasks);
  }, [sortSelector]);

  useEffect(() => {
    try {
      setViewPage(pageTasks(tasks, pagePointSelector));
    } catch (error) {
      console.log(error);
    }
  }, [pagePointSelector]);

  useEffect(() => {
    try {
      setViewPage(pageTasks(taskListSelector, pagePointSelector));
      setTasks(taskListSelector);
    } catch (error) {
      console.log(error);
    }
  }, [taskListSelector]);

  useEffect(() => {
    dispatch(setPageCount(pageCount));

    if (pageCount < pagePointSelector && pageCount > 0) {
      dispatch(setPagePoint(pageCount));
    }
  }, [pageCount]);

  return (
    <div className={styles.task_list}>
      {viewPage.map((element) => (
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
