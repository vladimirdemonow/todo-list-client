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
import { selectModalState } from "../../features/slices/modalSlice";

export default (): JSX.Element => {
  const taskListSelector = useAppSelector(selectTaskList);

  const filterSelector = useAppSelector(selectFilter);
  const sortSelector = useAppSelector(selectSort);

  const pagePointSelector = useAppSelector(selectPagePoint);

  const modalStateSelector = useAppSelector(selectModalState);

  const [filteredTaskList, setFilteredTaskList] = useState(taskListSelector);
  const [viewPage, setViewPage] = useState(taskListSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let sortedTasks = sortTasks([...filteredTaskList], sortSelector);

    createViewPage(
      sortedTasks,
      setViewPage,
      filterSelector,
      pagePointSelector,
      setFilteredTaskList
    );
  }, [sortSelector]);

  useEffect(() => {
    createViewPage(
      taskListSelector,
      setViewPage,
      filterSelector,
      pagePointSelector,
      setFilteredTaskList
    );
  }, [pagePointSelector]);

  useEffect(() => {
    const currentViewPage = createViewPage(
      taskListSelector,
      setViewPage,
      filterSelector,
      pagePointSelector,
      setFilteredTaskList
    );
    dispatch(
      setPageCount(
        Math.ceil(currentViewPage[EFilterAndPageTasks.filtered].length / 5)
      )
    );
  }, [taskListSelector, filterSelector]);

  return (
    <div
      className={styles.task_list}
      onWheel={(e) => {
        if (modalStateSelector !== "absolute") return;

        dispatch(e.deltaY > 0 ? incrementPagePoint() : decrementPagePoint());
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

// Filter taskList
type TFilterFunction = (tasks: ITask[]) => ITask[];

interface IFilterConst {
  all: TFilterFunction;
  done: TFilterFunction;
  undone: TFilterFunction;
}

const filterConsts: IFilterConst = {
  all: (tasks) => tasks,
  done: (tasks) => tasks.filter((element) => element.isCompleted),
  undone: (tasks) => tasks.filter((element) => !element.isCompleted),
};

function filterTasks(
  tasks: Array<ITask>,
  filterSelector: TFilter
): Array<ITask> {
  return filterConsts[filterSelector](tasks);
}

// Sort taskList

type TSortFunction = (tasks: ITask[]) => ITask[];

interface ISortConst {
  default: TSortFunction;
  down: TSortFunction;
  up: TSortFunction;
}

const sortConsts: ISortConst = {
  default: (tasks) => tasks,
  down: (tasks) => tasks.sort((a, b) => a.timeStamp - b.timeStamp),
  up: (tasks) => tasks.sort((a, b) => b.timeStamp - a.timeStamp),
};

function sortTasks(tasks: Array<ITask>, sortSelector: TSort): Array<ITask> {
  return sortConsts[sortSelector](tasks);
}

function pageTasks(tasks: Array<ITask>, page: number): Array<ITask> {
  const minPointPage = page * 5 - 5;
  const maxPointPage = page * 5 - 1;

  return tasks.filter((element, index) => {
    return index >= minPointPage && index <= maxPointPage;
  });
}

// Create current page
enum EFilterAndPageTasks {
  "filtered" = 0,
  "paged" = 1,
}

function createViewPage(
  currentTaskList: ITask[],
  setViewPage: (value: React.SetStateAction<ITask[]>) => void,
  filterSelector: TFilter,
  pagePointSelector: number,
  setFilteredTaskList: React.Dispatch<React.SetStateAction<ITask[]>>
): [ITask[], ITask[]] {
  const filteredTasks = filterTasks(currentTaskList, filterSelector);
  setFilteredTaskList(filteredTasks);
  const pagedTasks = pageTasks(filteredTasks, pagePointSelector);
  setViewPage(pagedTasks);
  return [filteredTasks, pagedTasks];
}
