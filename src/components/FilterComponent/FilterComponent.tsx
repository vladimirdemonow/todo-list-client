import styles from "./FilterComponent.module.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  setFilter,
  selectFilter,
  TFilter,
} from "../../features/slices/orderSlice";

export default (): JSX.Element => {
  const filterSelector = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.filter}>
      {createFilterButton("all", dispatch, filterSelector)}
      {createFilterButton("done", dispatch, filterSelector)}
      {createFilterButton("undone", dispatch, filterSelector)}
    </div>
  );
};

const { button_all: all, button_done: done, button_undone: undone } = styles;

const stylesFilter = {
  all,
  done,
  undone,
};

function createFilterButton(
  currentFilter: TFilter,
  dispatch: any,
  activeFilter: TFilter
): JSX.Element {
  return (
    <button
      className={
        styles.button +
        (currentFilter === activeFilter ? " " + stylesFilter[activeFilter] : "")
      }
      onClick={() => dispatch(setFilter(currentFilter))}
    >
      {currentFilter}
    </button>
  );
}
