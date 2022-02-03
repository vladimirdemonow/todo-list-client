import styles from "./PagesComponent.module.scss";

import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillStepBackward,
  AiFillStepForward,
} from "react-icons/ai";
import {
  decrementPagePoint,
  incrementPagePoint,
  selectPageCount,
  selectPagePoint,
  setPagePoint,
  setPagePointEnd,
  setPagePointStart,
} from "../../features/page/pageSlice";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";

export default (): JSX.Element => {
  const pageCount = useAppSelector(selectPageCount);
  const pagePointSelector = useAppSelector(selectPagePoint);

  const dispatch = useAppDispatch();

  const [pagesButtons, setPagesButtons] = useState([]);

  useEffect(() => {
    setPagesButtons(createPagesButtons(dispatch, pageCount, pagePointSelector));
  }, [pageCount, pagePointSelector]);

  if (pageCount < 2) {
    return <></>;
  }

  return (
    <div className={styles.pages}>
      <AiFillStepBackward
        size={42}
        onClick={() => {
          dispatch(setPagePointStart());
        }}
      />
      <AiFillCaretLeft
        size={42}
        onClick={() => {
          dispatch(decrementPagePoint());
        }}
      />
      {pagesButtons}
      <AiFillCaretRight
        size={42}
        onClick={() => {
          dispatch(incrementPagePoint());
        }}
      />
      <AiFillStepForward
        size={42}
        onClick={() => {
          dispatch(setPagePointEnd());
        }}
      />
    </div>
  );
};

function createPagesButtons(
  dispatch: any,
  pageCount: number,
  pagePointSelector: number
): any {
  const pageArray = [];
  for (let index = 1; index <= pageCount; index++) {
    pageArray.push(
      <button
        className={
          styles.buttonPages +
          (pagePointSelector === index ? " " + styles.button__active : "")
        }
        key={"key" + index}
        onClick={() => dispatch(setPagePoint(index))}
      >
        {index}
      </button>
    );
  }
  return pageArray;
}
