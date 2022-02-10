import styles from "./TaskListComponent.module.scss";
import { AiFillBulb, AiFillFire, AiOutlineCoffee } from "react-icons/ai";

import { ITask } from "../../features/slices/taskListSlice";

import { TFilter, TSort } from "../../features/slices/orderSlice";

// Images on Empty pages
const defaultImages = {
  all: AiOutlineCoffee,
  done: AiFillFire,
  undone: AiFillBulb,
};

export function createDefaultImage(filterSelector: TFilter): JSX.Element {
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
  done: (tasks) => tasks.filter((element) => element.done),
  undone: (tasks) => tasks.filter((element) => !element.done),
};

export function filterTasks(
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

export function sortTasks(
  tasks: Array<ITask>,
  sortSelector: TSort
): Array<ITask> {
  return sortConsts[sortSelector](tasks);
}

function pageTasks(tasks: Array<ITask>, page: number): Array<ITask> {
  const minPointPage = page * 5 - 5;
  const maxPointPage = page * 5 - 1;

  return tasks.filter((element, index) => {
    return index >= minPointPage && index <= maxPointPage;
  });
}

export function createViewPage(
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
