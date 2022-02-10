import styles from "./TaskListComponent.module.scss";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  getTaskListAsync,
  selectViewTaskPage,
} from "../../features/slices/taskListSlice";

import { useEffect, useState } from "react";
import { createDefaultImage } from "./TaskListFunctions";

export default (): JSX.Element => {
  const viewTaskPage = useAppSelector(selectViewTaskPage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(viewTaskPage);
  }, [viewTaskPage]);

  return (
    <div className={styles.task_list}>
      {0 // length of taskList
        ? viewTaskPage
        : createDefaultImage()}
    </div>
  );
};
