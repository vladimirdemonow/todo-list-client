import styles from "./TaskListComponent.module.scss";
import TaskComponent from "./TaskComponent/TaskComponent";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectTaskList, ITask } from "../../features/slices/taskListSlice";

import {
  decrementPagePoint,
  incrementPagePoint,
  selectPagePoint,
  setPageCount,
} from "../../features/slices/pageSlice";

import { selectFilter, selectSort } from "../../features/slices/orderSlice";

import { useEffect, useState } from "react";
import { selectModalState } from "../../features/slices/modalSlice";
import {
  createDefaultImage,
  createViewPage,
  sortTasks,
} from "./TaskListFunctions";

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
              key={element.uuid}
              text={element.name}
              date={element.date}
              id={element.uuid}
              isCompleted={element.done}
            />
          ))
        : createDefaultImage(filterSelector)}
    </div>
  );
};

enum EFilterAndPageTasks {
  "filtered" = 0,
  "paged" = 1,
}
