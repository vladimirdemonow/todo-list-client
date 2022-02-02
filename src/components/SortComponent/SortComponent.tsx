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
      {createSortButton("up", sortSelector, AiFillCaretUp, dispatch)}
      {createSortButton("down", sortSelector, AiFillCaretDown, dispatch)}
    </div>
  );
};

function createSortButton(
  currentSort: TSort,
  activeSort: TSort,
  Element: IconType,
  dispatch: any
) {
  return (
    <Element
      size={35}
      color={activeSort === currentSort ? "green" : "black"}
      onClick={() => {
        dispatch(setSort(currentSort));
      }}
    />
  );
}
