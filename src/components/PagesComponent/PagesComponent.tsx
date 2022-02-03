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
  selectPageViewEnd,
  selectPageViewStart,
  setPagePoint,
  setPagePointEnd,
  setPagePointStart,
} from "../../features/page/pageSlice";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";

export default (): JSX.Element => {
  const pageCount = useAppSelector(selectPageCount);
  const pagePointSelector = useAppSelector(selectPagePoint);

  const pageViewStart = useAppSelector(selectPageViewStart);
  const pageViewEnd = useAppSelector(selectPageViewEnd);

  const dispatch = useAppDispatch();

  const [pagesButtons, setPagesButtons] = useState([]);

  useEffect(() => {
    setPagesButtons(
      createPagesButtons(
        dispatch,
        pageViewStart,
        pageViewEnd,
        pagePointSelector
      )
    );
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
  pageViewStart: number,
  pageViewEnd: number,
  pagePointSelector: number
): any {
  const pageArray = [];
  for (let index = pageViewStart; index <= pageViewEnd; index++) {
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
