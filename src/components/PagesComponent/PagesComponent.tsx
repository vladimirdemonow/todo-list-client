import styles from "./PagesComponent.module.scss";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import {
  setPagePoint,
  selectCurrentElementCount,
} from "../../features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { useEffect } from "react";

export default (): JSX.Element => {
  const pageArray: Array<JSX.Element> = [];
  const tasksCount: number = useAppSelector(selectCurrentElementCount);
  const pageCount = Math.floor(tasksCount / 5);

  const dispatch = useAppDispatch();

  if (tasksCount < 6) {
    return <></>;
  }

  // CANT USE EFFECT: uncaught Error: Rendered more hooks than during the previous render.
  // This cicle is not cause of this problem
  for (let i = 1; i <= pageCount + 1; i++) {
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
  //   dispatch(setPage(pageCount));
  // }, [pageCount]);

  const resultJSX = (
    <div className={styles.pages}>
      <AiFillCaretLeft size={42} />
      {pageArray}
      <AiFillCaretRight size={42} />
    </div>
  );

  return resultJSX;
};
