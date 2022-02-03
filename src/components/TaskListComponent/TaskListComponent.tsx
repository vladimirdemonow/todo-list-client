import styles from "./TaskListComponent.module.scss";
import TaskComponent from "./TaskComponent/TaskComponent";
import { AiFillBulb, AiFillFire, AiOutlineCoffee } from "react-icons/ai";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectTaskList, ITask } from "../../features/taskList/taskListSlice";

import {
  selectPagePoint,
  setPageCount,
  setPagePoint,
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

  const [tasks, setTasks] = useState(taskListSelector);
  const [viewPage, setViewPage] = useState(taskListSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let filteredTasks = filterTasks(taskListSelector, filterSelector);
    setTasks(filteredTasks);

    dispatch(setPageCount(Math.ceil(filteredTasks.length / 5)));
    dispatch(setPagePoint(1));

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
    setViewPage(pageTasks(tasks, pagePointSelector));
  }, [pagePointSelector]);

  useEffect(() => {
    setViewPage(pageTasks(taskListSelector, pagePointSelector));
    setTasks(taskListSelector);
  }, [taskListSelector]);

  if (taskListSelector.length === 0) {
    return (
      <AiOutlineCoffee className={styles.default} size={100} opacity={0.2} />
    );
  }

  if (viewPage.length === 0 && filterSelector === "done") {
    return <AiFillFire className={styles.default} size={100} opacity={0.2} />;
  }

  if (viewPage.length === 0 && filterSelector === "undone") {
    return <AiFillBulb className={styles.default} size={100} opacity={0.2} />;
  }

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
