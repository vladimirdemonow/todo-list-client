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
import { IconType } from "react-icons/lib";

const arrowSize = 42;

export default (): JSX.Element => {
  const pageCountSelector = useAppSelector(selectPageCount);
  const pagePointSelector = useAppSelector(selectPagePoint);

  const pageViewStart = useAppSelector(selectPageViewStart);
  const pageViewEnd = useAppSelector(selectPageViewEnd);

  const dispatch = useAppDispatch();

  const [pagesButtons, setPagesButtons] = useState([]);

  let stepBackward: JSX.Element = <></>;
  let caretLeft: JSX.Element = <></>;
  let caretRight: JSX.Element = <></>;
  let stepForward: JSX.Element = <></>;
  const [pagesLeftArrows, setPagesLeftArrows] = useState([
    stepBackward,
    caretLeft,
  ]);
  const [pagesRightArrows, setPagesRightArrows] = useState([
    caretRight,
    stepForward,
  ]);

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
          arrowSize
        );
        caretLeft = createPagesArrow(
          AiFillCaretLeft,
          dispatch,
          decrementPagePoint,
          arrowSize
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
          arrowSize
        );

        stepForward = createPagesArrow(
          AiFillStepForward,
          dispatch,
          setPagePointEnd,
          arrowSize
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

  if (pageCountSelector < 2) {
    return <></>;
  }

  return (
    <div className={styles.pages}>
      <div className={styles.arrows__block}>{pagesLeftArrows}</div>
      <div>{pagesButtons}</div>
      <div className={styles.arrows__block}>{pagesRightArrows}</div>
    </div>
  );
};

function createPagesArrow(
  IconElement: IconType,
  dispatch: any,
  action: any,
  size: number
): JSX.Element {
  return (
    <IconElement
      size={size}
      onClick={() => {
        dispatch(action());
      }}
    />
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
