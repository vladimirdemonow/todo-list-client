import styles from "./SortComponent.module.scss";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setSort, selectSort, TSort } from "../../features/order/orderSlice";
import { IconType } from "react-icons/lib";

export default (): JSX.Element => {
  const sortSelector = useAppSelector(selectSort);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.sort}>
      {createSortButton(sortSelector, dispatch)}
    </div>
  );
};

function createSortButton(sortSelector: TSort, dispatch: any) {
  const Element: IconType =
    sortSelector === "up" ? AiFillCaretUp : AiFillCaretDown;
  return (
    <Element
      size={35}
      onClick={() => {
        dispatch(setSort(sortSelector === "up" ? "down" : "up"));
      }}
    />
  );
}
