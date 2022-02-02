import styles from "./PagesComponent.module.scss";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { setPageCount, setPagePoint } from "../../features/page/pageSlice";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTaskList } from "../../features/taskList/taskListSlice";
import { useEffect } from "react";
// import { useEffect } from "react";

export default (): JSX.Element => {
  const pageArray: Array<JSX.Element> = [];
  const tasksCount: number = useAppSelector(selectTaskList).length;
  const pageCount = Math.ceil(tasksCount / 5);

  const dispatch = useAppDispatch();

  if (tasksCount < 6) {
    return <></>;
  }

  // CANT USE EFFECT: uncaught Error: Rendered more hooks than during the previous render.
  // This cicle is not cause of this problem
  for (let i = 1; i <= pageCount; i++) {
    pageArray.push(
      <button
        className={styles.buttonPages}
        key={"key" + i}
        onClick={() => dispatch(setPagePoint(i))}
      >
        {i}
      </button>
    );
  }

  // useEffect(() => {
  //   dispatch(setPageCount(pageCount));
  // }, [pageCount]);

  return (
    <div className={styles.pages}>
      <AiFillCaretLeft size={42} />
      {pageArray}
      <AiFillCaretRight size={42} />
    </div>
  );
};
