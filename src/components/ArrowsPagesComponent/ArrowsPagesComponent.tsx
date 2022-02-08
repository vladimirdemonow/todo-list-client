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
  setPagePointEnd,
  setPagePointStart,
  selectPageCount,
} from "../../features/slices/pageSlice";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { RootState } from "../../app/store";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

const arrowSize = 42;

interface IArrowOne {
  ToOneStepArrow: IconType;
  ToEndPointArrow: IconType;
  ToOneStepAction: ActionCreatorWithoutPayload<string>;
  ToEndPointAction: ActionCreatorWithoutPayload<string>;
  style: string;
  selectPageViewPoint: (state: RootState) => number;
  isWillShown: (pageViewSelector: any, pageCountSelector?: any) => boolean;
}

interface IArrowElementConst {
  left: IArrowOne;
  right: IArrowOne;
}

const arrowElementConst: IArrowElementConst = {
  left: {
    ToOneStepArrow: AiFillCaretLeft,
    ToEndPointArrow: AiFillStepBackward,
    ToOneStepAction: decrementPagePoint,
    ToEndPointAction: setPagePointStart,
    style: styles.arrow__left,
    selectPageViewPoint: selectPageViewStart,
    isWillShown: (pageViewSelector) => pageViewSelector > 1,
  },
  right: {
    ToOneStepArrow: AiFillCaretRight,
    ToEndPointArrow: AiFillStepForward,
    ToOneStepAction: incrementPagePoint,
    ToEndPointAction: setPagePointEnd,
    style: styles.arrow__right,
    selectPageViewPoint: selectPageViewEnd,
    isWillShown: (pageViewSelector, pageCountSelector) => {
      return pageViewSelector < pageCountSelector;
    },
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
    selectPageViewPoint,
    ToOneStepAction,
    ToEndPointAction,
    isWillShown,
  } = arrowElementConst[direction];

  const pageViewPointSelector = useAppSelector(selectPageViewPoint);
  const pageCountSelector = useAppSelector(selectPageCount);

  const [pagesArrows, setPagesArrows] = useState(emptyArrowComponent);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isWillShown(pageViewPointSelector, pageCountSelector)) {
      setPagesArrows(emptyArrowComponent);
      return;
    }

    const toEndPointArrowBlock = createPagesArrow(
      ToEndPointArrow,
      dispatch,
      ToEndPointAction,
      arrowSize,
      false
    );

    const stepArrowBlock = createPagesArrow(
      ToOneStepArrow,
      dispatch,
      ToOneStepAction,
      arrowSize,
      true
    );

    const resultArrowBlock = [toEndPointArrowBlock, stepArrowBlock];

    if (direction === "right") {
      resultArrowBlock.reverse();
    }

    setPagesArrows(resultArrowBlock);
  }, [pageCountSelector, pageViewPointSelector]);

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
      className={isArrowToEndPoint ? styles.arrow__step : styles.arrow__end}
      onClick={() => {
        dispatch(action());
      }}
    >
      <IconElement size={size} opacity={0.5} />
    </div>
  );
}
