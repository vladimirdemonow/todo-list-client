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

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { selectTaskList } from "../../features/slices/taskListSlice";
import { setFilter } from "../../features/slices/orderSlice";

const arrowSize = 42;

export default (): JSX.Element => {
  const pageCountSelector = useAppSelector(selectPageCount);
  const pagePointSelector = useAppSelector(selectPagePoint);
  const taskListSelector = useAppSelector(selectTaskList);

  const pageViewStart = useAppSelector(selectPageViewStart);
  const pageViewEnd = useAppSelector(selectPageViewEnd);

  const dispatch = useAppDispatch();

  const [pagesButtons, setPagesButtons] = useState([]);

  // For 'explain to useState' this elements is JSX.Element :)
  let stepBackward: JSX.Element = <></>;
  let caretLeft: JSX.Element = <></>;
  const [pagesLeftArrows, setPagesLeftArrows] = useState([
    stepBackward,
    caretLeft,
  ]);

  let caretRight: JSX.Element = <></>;
  let stepForward: JSX.Element = <></>;
  const [pagesRightArrows, setPagesRightArrows] = useState([
    caretRight,
    stepForward,
  ]);

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

    if (pageViewEnd > 4) {
      if (pageViewStart > 1) {
        stepBackward = createPagesArrow(
          AiFillStepBackward,
          dispatch,
          setPagePointStart,
          arrowSize,
          true
        );
        caretLeft = createPagesArrow(
          AiFillCaretLeft,
          dispatch,
          decrementPagePoint,
          arrowSize,
          false
        );

        setPagesLeftArrows([stepBackward, caretLeft]);
      } else {
        setPagesLeftArrows([<></>, <></>]);
      }

      if (pageViewEnd < pageCountSelector) {
        caretRight = createPagesArrow(
          AiFillCaretRight,
          dispatch,
          incrementPagePoint,
          arrowSize,
          false
        );

        stepForward = createPagesArrow(
          AiFillStepForward,
          dispatch,
          setPagePointEnd,
          arrowSize,
          true
        );

        setPagesRightArrows([caretRight, stepForward]);
      } else {
        setPagesRightArrows([<></>, <></>]);
      }
    } else {
      setPagesLeftArrows([<></>, <></>]);
      setPagesRightArrows([<></>, <></>]);
    }
  }, [pageCountSelector, pagePointSelector]);

  // set taskListSelector to useEffect controller is not best solution
  useEffect(() => {
    const pageCount = Math.ceil(taskListSelector.length / 5);
    dispatch(setPageCount(pageCount));
    // dispatch(setFilter("all"));

    if (pageCountSelector < pagePointSelector && pageCountSelector > 0) {
      dispatch(setPagePoint(pageCountSelector));
    }
  }, [taskListSelector]);

  if (pageCountSelector < 2) {
    return <></>;
  }

  return (
    <div className={styles.pages}>
      <div className={styles.arrows__block + " " + styles.arrow__left}>
        {pagesLeftArrows}
      </div>
      <div>{pagesButtons}</div>
      <div className={styles.arrows__block + " " + styles.arrow__right}>
        {pagesRightArrows}
      </div>
    </div>
  );
};

function createPagesArrow(
  IconElement: IconType,
  dispatch: any,
  action: any,
  size: number,
  isArrowToEnd: boolean
): JSX.Element {
  return (
    <div
      className={!isArrowToEnd ? styles.arrow__step : styles.arrow__end}
      onClick={() => {
        dispatch(action());
      }}
    >
      <IconElement size={size} opacity={0.5} />
    </div>
  );
}

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
