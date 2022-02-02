import styles from "./PagesComponent.module.scss";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import {
  setPage,
  selectCurrentElementCount,
} from "../../features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export default (): JSX.Element => {
  const pageArray: Array<JSX.Element> = [];
  const tasksCount: number = useAppSelector(selectCurrentElementCount);
  const pageCount = Math.floor(tasksCount / 5);

  const dispatch = useAppDispatch();

  for (let i = 0; i < pageCount; i++) {
    pageArray.push(
      <button
        className={styles.buttonPages}
        key={"key" + i}
        onClick={() => dispatch(setPage(i + 1))}
      >
        {i + 1}
      </button>
    );
  }

  const resultJSX = (
    <div className={styles.pages}>
      <AiFillCaretLeft size={42} />
      {pageArray}
      <AiFillCaretRight size={42} />
    </div>
  );

  return resultJSX;
};
