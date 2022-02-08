import styles from "./PagesComponent.module.scss";

import {
  selectPageCount,
  selectPagePoint,
  selectPageViewEnd,
  selectPageViewStart,
  setPageCount,
  setPagePoint,
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

  useEffect(() => {
    setPagesButtons(
      createPagesButtons(
        dispatch,
        pageViewStart,
        pageViewEnd,
        pagePointSelector
      )
    );

    if (pageCountSelector < pagePointSelector && pageCountSelector > 0) {
      dispatch(setPagePoint(1));
    }
  }, [pageCountSelector, pagePointSelector]);

  if (pageCountSelector < 2) {
    return <></>;
  }

  return (
    <div className={styles.pages}>
      {pageCountSelector > 1 ? (
        <ArrowsPagesComponent direction={"left"} />
      ) : (
        <></>
      )}
      <div>{pagesButtons}</div>
      {pageCountSelector > 1 ? (
        <ArrowsPagesComponent direction={"right"} />
      ) : (
        <></>
      )}
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
