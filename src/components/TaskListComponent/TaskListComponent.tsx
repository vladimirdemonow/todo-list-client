import styles from "./TaskListComponent.module.scss";
import TaskComponent from "./TaskComponent/TaskComponent";
import { AiFillBulb, AiFillFire, AiOutlineCoffee } from "react-icons/ai";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectTaskList, ITask } from "../../features/slices/taskListSlice";

import {
  decrementPagePoint,
  incrementPagePoint,
  selectPagePoint,
  setPageCount,
  setPagePoint,
} from "../../features/slices/pageSlice";

import {
  TFilter,
  TSort,
  selectFilter,
  selectSort,
} from "../../features/slices/orderSlice";

import { useEffect, useState } from "react";
import { IconType } from "react-icons/lib";

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

  return (
    <div
      className={styles.task_list}
      onWheel={(e) => {
        if (e.deltaY > 0) {
          dispatch(incrementPagePoint());
        } else {
          dispatch(decrementPagePoint());
        }
      }}
    >
      {viewPage.length !== 0
        ? viewPage.map((element) => (
            <TaskComponent
              key={element.id}
              text={element.text}
              date={element.date}
              id={element.id}
              isCompleted={element.isCompleted}
            />
          ))
        : createDefaultImage(filterSelector)}
    </div>
  );
};

// Images on Empty pages
const defaultImages = {
  all: AiOutlineCoffee,
  done: AiFillFire,
  undone: AiFillBulb,
};

function createDefaultImage(filterSelector: TFilter): JSX.Element {
  const Element = defaultImages[filterSelector];
  return <Element className={styles.default} size={100} opacity={0.2} />;
}

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
