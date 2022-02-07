import styles from "./PagesComponent.module.scss";

import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillStepBackward,
  AiFillStepForward,
} from "react-icons/ai";
import { IconType } from "react-icons/lib";

import {
  decrementPagePoint,
  incrementPagePoint,
  selectPageCount,
  selectPagePoint,
  selectPageViewEnd,
  selectPageViewStart,
  setPageCount,
  setPagePoint,
  setPagePointEnd,
  setPagePointStart,
} from "../../features/slices/pageSlice";

import ArrowsPagesComponent from "../ArrowsPagesComponent/ArrowsPagesComponent";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { selectTaskList } from "../../features/slices/taskListSlice";

export default (): JSX.Element => {
  const pageCountSelector = useAppSelector(selectPageCount);
  const pagePointSelector = useAppSelector(selectPagePoint);
  const taskListSelector = useAppSelector(selectTaskList);

  const pageViewStart = useAppSelector(selectPageViewStart);
  const pageViewEnd = useAppSelector(selectPageViewEnd);

  const dispatch = useAppDispatch();

  const [pagesButtons, setPagesButtons] = useState([]);

  // in this useEffect maybe pageCountSelector and pagePointSelector control can be divided to two diffents useEffect for optimization
  useEffect(() => {
    setPagesButtons(
      createPagesButtons(
        dispatch,
        pageViewStart,
        pageViewEnd,
        pagePointSelector
      )
    );
  }, [pageCountSelector, pagePointSelector]);

  // set taskListSelector to useEffect controller is not best solution
  useEffect(() => {
    const pageCount = Math.ceil(taskListSelector.length / 5);
    dispatch(setPageCount(pageCount));

    if (pageCountSelector < pagePointSelector && pageCountSelector > 0) {
      dispatch(setPagePoint(pageCountSelector));
    }
  }, [taskListSelector]);

  if (pageCountSelector < 2) {
    return <></>;
  }

  return (
    <div className={styles.pages}>
      <ArrowsPagesComponent direction={"left"} />
      <div>{pagesButtons}</div>
      <ArrowsPagesComponent direction={"right"} />
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
