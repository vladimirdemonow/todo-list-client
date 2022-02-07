import styles from "./ArrowsPagesComponent.module.scss";

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
  selectPageViewEnd,
  selectPageViewStart,
} from "../../features/slices/pageSlice";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { RootState } from "../../app/store";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

const arrowSize = 42;

interface IArrowOne {
  ToOneStepArrow: IconType;
  ToEndPointArrow: IconType;
  style: string;
  pageViewSelector: (state: RootState) => number;
  isWillShowed: Function;
  actionPagePoint: ActionCreatorWithoutPayload<string>;
  leftOrder: boolean;
}

interface IArrowElementConst {
  left: IArrowOne;
  right: IArrowOne;
}

const arrowElementConst: IArrowElementConst = {
  left: {
    ToOneStepArrow: AiFillStepBackward,
    ToEndPointArrow: AiFillCaretLeft,
    style: styles.arrow__left,
    pageViewSelector: selectPageViewStart,
    isWillShowed: (pageViewStart: number) => pageViewStart > 5,
    actionPagePoint: decrementPagePoint,
    leftOrder: true,
  },
  right: {
    ToOneStepArrow: AiFillStepForward,
    ToEndPointArrow: AiFillCaretRight,
    style: styles.arrow__right,
    pageViewSelector: selectPageViewEnd,
    isWillShowed: (pageViewEnd: number) => pageViewEnd < pageViewEnd - 5,
    actionPagePoint: incrementPagePoint,
    leftOrder: false,
  },
};

interface IArrowsPagesProps {
  direction: "left" | "right";
}

const emptyArrowComponent = [<></>, <></>];

export default ({ direction }: IArrowsPagesProps): JSX.Element => {
  const {
    ToOneStepArrow,
    ToEndPointArrow,
    style,
    pageViewSelector,
    isWillShowed,
    actionPagePoint,
    leftOrder,
  } = arrowElementConst[direction];

  const pageViewPoint = useAppSelector(pageViewSelector);

  const dispatch = useAppDispatch();

  const [pagesArrows, setPagesArrows] = useState(emptyArrowComponent);

  useEffect(() => {
    if (isWillShowed(pageViewPoint)) {
      setPagesArrows(emptyArrowComponent);
      return;
    }

    setPagesArrows([
      createPagesArrow(
        ToOneStepArrow,
        dispatch,
        actionPagePoint,
        arrowSize,
        leftOrder
      ),
      createPagesArrow(
        ToEndPointArrow,
        dispatch,
        actionPagePoint,
        arrowSize,
        !leftOrder
      ),
    ]);
  }, [pageViewPoint]);

  return (
    <div
      className={
        styles.arrows__block + " " + arrowElementConst[direction].style
      }
    >
      {pagesArrows}
    </div>
  );
};

function createPagesArrow(
  IconElement: IconType,
  dispatch: any,
  action: any,
  size: number,
  isArrowToEndPoint: boolean
): JSX.Element {
  return (
    <div
      className={!isArrowToEndPoint ? styles.arrow__step : styles.arrow__end}
      onClick={() => {
        dispatch(action());
      }}
    >
      <IconElement size={size} opacity={0.5} />
    </div>
  );
}
